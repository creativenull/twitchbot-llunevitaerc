import { db } from "../db.ts"

// cache the queries globally so they're kept between calls
const readAllQuery = db.prepareQuery<[string]>(`SELECT username FROM users;`);
const readUserQuery = db.prepareQuery<[string]>(`SELECT * FROM users WHERE id = ?;`);

export function allUsers(): string[] {
  return readAllQuery.all();
}

export function createUser(username: string) {
  db.query(`INSERT INTO users (username) VALUES (?);`, [username]);
}

export function readUser(id: number) {
  return readUserQuery(id);
}

export function updateUser(id: number, username: string) {
  db.query(`UPDATE users SET username = ? WHERE id = ?;`, [username, id]);
}

export function deleteUser(id: number) {
  db.query(`DELETE FROM users WHERE id = ?;`, [id]);
}
