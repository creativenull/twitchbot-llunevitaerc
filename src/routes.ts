import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { allQuestions } from "./repositories/question.ts";
import { allUsers, readUser } from "./repositories/user.ts";

const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { data: "hello world" };
});

router.get("/questions", (ctx) => {
  const questions = allQuestions();
  ctx.response.body = questions;
});

router.get("/users", (ctx) => {
  const users = allUsers();
  ctx.response.body = users;
});

router.get("/users/:id", (ctx) => {
  try {
    const user = readUser(parseInt(ctx?.params?.id));
    ctx.response.body = user;
  } catch (_) {
    ctx.response.status = 404;
    ctx.response.body = null;
  }
});

export default router;
