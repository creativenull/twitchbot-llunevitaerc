import { Application, Router } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { allQuestions } from "./repositories/question.ts";

const app = new Application();
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { data: allQuestions() };
});

app.use(router.routes());

// app.use((ctx) => {
//   ctx.response.body = "Hello World!";
// });

await app.listen({ port: 8000 });
