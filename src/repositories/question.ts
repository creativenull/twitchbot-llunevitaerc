import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";
import { DB } from "https://deno.land/x/sqlite@v3.2.0/mod.ts";

const env = config({ safe: true });

export function allQuestions(): [string, string][] {
  const db = new DB(env.DATABASE_NAME);
  const questions: [string, string][] = [];

  try {
    const query = db.prepareQuery<[string, string]>(
      "SELECT questions.question, users.username FROM questions JOIN users ON questions.user_id = users.id;",
    );

    for (const [question, username] of query.iter()) {
      questions.push([question, username]);
    }

    return questions;
  } catch (e) {
    throw e;
  } finally {
    db.close();
  }
}
