import { db } from "../db.ts";

interface UserModel {
  id: number;
  username: string;
}

// cache the queries globally so they're kept between calls
const readAllQuery = db.prepareQuery(`SELECT * FROM users;`);
const readUserQuery = db.prepareQuery(`SELECT * FROM users WHERE id = :id;`);

export function allUsers() {
  const usernames = readAllQuery.all();
  let users: UserModel[] = [];
  for (const u of usernames) {
    users.push({
      id: u[0],
      username: u[1],
    } as UserModel);
  }

  return users;
}

export function createUser(username: string) {
  db.query(`INSERT INTO users (username) VALUES (?);`, [username]);
}

export function readUser(id: number) {
  const row = readUserQuery.one({ id });

  return {
    id: row[0],
    username: row[1],
  } as UserModel;
}

export function updateUser(id: number, username: string) {
  db.query(`UPDATE users SET username = ? WHERE id = ?;`, [username, id]);
}

export function deleteUser(id: number) {
  db.query(`DELETE FROM users WHERE id = ?;`, [id]);
}
