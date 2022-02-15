import { db } from "../db.ts"

// cache the query globally so it's kept between calls
const query = db.prepareQuery<[string, string]>(
    "SELECT questions.question, users.username FROM questions \
JOIN users ON questions.user_id = users.id;",
);

export function allQuestions(): [string, string][] {
  return query.all();
}
