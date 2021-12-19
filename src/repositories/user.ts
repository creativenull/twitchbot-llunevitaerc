import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.2.0/mod.ts";

const env = config({ safe: true });

export function allUsers(): string[] {
  const db = new DB(env.DATABASE_NAME);
  const usernames: string[] = [];

  try {
    const results = db.query(`SELECT * FROM users;`);

    for (const [unames] of results) {
      usernames.push(unames as string);
    }

    return usernames;
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}

export function createUser(username: string) {
  const db = new DB(env.DATABASE_NAME);

  try {
    db.query(`INSERT INTO users (username) VALUES (?);`, [username]);
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}

export function readUser(id: number) {
  const db = new DB(env.DATABASE_NAME);

  try {
    const results = db.query(`SELECT * FROM users WHERE id = ?;`, [id]);
    return results;
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}

export function updateUser(id: number, username: string) {
  const db = new DB(env.DATABASE_NAME);

  try {
    db.query(`UPDATE users SET username = ? WHERE id = ?;`, [username, id]);
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}

export function deleteUser(id: number) {
  const db = new DB(env.DATABASE_NAME);

  try {
    db.query(`DELETE FROM users WHERE id = ?;`, [id]);
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}
