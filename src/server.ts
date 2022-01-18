import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { allQuestions } from "./repositories/question.ts";

const port = 8000;
const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { data: "hello world" };
});

router.get("/questions", (ctx) => {
  const questions = allQuestions();
  ctx.response.body = { data: questions }
});

app.use(router.routes());

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

app.addEventListener("listen", () => {
  console.log(`[SERVER] Listening on port: ${port}`);
});

await app.listen({ port });
