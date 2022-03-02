import { Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { allQuestions } from "./repositories/question.ts";
import { allUsers, readUser } from "./repositories/user.ts";
import { addCommand, getCommands } from "./repositories/command.ts";
import type { Command } from "./repositories/command.ts";

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

router.get("/commands", (ctx) => {
  try {
    ctx.response.body = getCommands();
  } catch (e) {
    ctx.response.status = 404;
    ctx.response.body = null;
  }
});

router.post("/commands/add", async (ctx) => {
  try {
    const req = ctx.request.body();
    if (req.type === "json") {
      const data = await req.value as Command;
      addCommand(data);
      ctx.response.body = { status: "success" };
    }
  } catch (e) {
    ctx.response.status = 400;
    ctx.response.body = { status: "failed", data: e.message };
  }
});

export default router;
