import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.2.0/mod.ts";

const env = config({ safe: true });
const db = new DB(env.DATABASE_NAME);

db.query(`
  CREATE TABLE IF NOT EXISTS commands (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT,
    type        TEXT,
    response    TEXT
  );
`);

db.close();
