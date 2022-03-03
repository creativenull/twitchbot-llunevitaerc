import { db } from "../db.ts";

interface UserQuestionResult {
  username: string;
  question: string;
}

// cache the query globally so it's kept between calls
const query = db.prepareQuery(
"SELECT users.username, questions.question FROM questions \
JOIN users ON questions.user_id = users.id;",
);

export function queryAllQuestions() {
  const userQuestionRows = query.all();
  const userQuestions: UserQuestionResult[] = [];

  for (const uq of userQuestionRows) {
    userQuestions.push({
      username: uq[0],
      question: uq[1],
    } as UserQuestionResult);
  }

  return userQuestions;
}
