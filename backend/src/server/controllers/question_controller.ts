import { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { respondWithNotFound } from "../utils/handlers/error_handler.ts";
import { queryAllQuestions } from "../repositories/question.ts";

export function getQuestions(ctx: Context) {
  try {
    const questions = queryAllQuestions();
    ctx.response.body = questions;
  } catch (_) {
    respondWithNotFound(ctx);
  }
}
