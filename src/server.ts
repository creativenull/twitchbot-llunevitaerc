import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";
import router from "./routes.ts";

const port = 8000;
const app = new Application();
app.use(router.routes());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      switch (err.status) {
        case Status.NotFound:
          return { data: "not found" };
        default:
          return { data: "not found by default" };
      }
    } else {
      // rethrow if you can't handle the error
      throw err;
    }
  }
});

app.use((ctx) => {
  ctx.throw(404);
});

app.addEventListener("listen", () => {
  console.log(`[SERVER] Listening on port: ${port}`);
});

await app.listen({ port });
