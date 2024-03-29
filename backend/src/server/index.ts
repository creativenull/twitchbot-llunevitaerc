import {
  Application,
  isHttpError,
  Status,
} from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import router from "./routes.ts";

const port = 8000;
const app = new Application();

// CORS
app.use(oakCors({ origin: /^.+localhost:3000$/ }));

// Routes
app.use(router.routes());
app.use(router.allowedMethods());

// Fallback
app.use(async (_, next) => {
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
