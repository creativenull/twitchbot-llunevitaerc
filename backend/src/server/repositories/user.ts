import { db } from "../db.ts";

interface UserModel {
  id: number;
  username: string;
}

// cache the queries globally so they're kept between calls
const readAllQuery = db.prepareQuery(`SELECT * FROM users;`);
const readUserQuery = db.prepareQuery(`SELECT * FROM users WHERE id = :id;`);

export function queryAllUsers() {
  const usernames = readAllQuery.all();
  const users: UserModel[] = [];
  for (const u of usernames) {
    users.push({
      id: u[0],
      username: u[1],
    } as UserModel);
  }

  return users;
}

export function createSingleUser(username: string) {
  db.query(`INSERT INTO users (username) VALUES (?);`, [username]);
}

export function readSingleUser(id: number) {
  const row = readUserQuery.one({ id });

  return {
    id: row[0],
    username: row[1],
  } as UserModel;
}

export function updateSingleUser(id: number, username: string) {
  db.query(`UPDATE users SET username = ? WHERE id = ?;`, [username, id]);
}

export function deleteSingleUser(id: number) {
  db.query(`DELETE FROM users WHERE id = ?;`, [id]);
}
