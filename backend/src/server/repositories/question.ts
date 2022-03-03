import { db } from "../db.ts";
import { QuestionResponse } from "../shared/question.ts"

// cache the query globally so it's kept between calls
// const query = db.prepareQuery(
// "SELECT users.username, questions.question FROM questions \
// JOIN users ON questions.user_id = users.id;",
// );

export function queryAllQuestions() {
  const query = db.prepareQuery("SELECT question from questions;")
  const userQuestionRows = query.all();
  const userQuestions: QuestionResponse[] = [];

  for (const uq of userQuestionRows) {
    userQuestions.push({
      question: uq[0],
    } as QuestionResponse);
  }

  return userQuestions;
}
