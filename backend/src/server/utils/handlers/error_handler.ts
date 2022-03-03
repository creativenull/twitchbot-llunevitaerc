import { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";

export function respondWithNotFound(ctx: Context) {
  ctx.response.status = 404;
  ctx.response.body = {
    success: "failed",
    data: "Not Found",
  };
}

export function respondWithError(ctx: Context, err: Error) {
  ctx.response.status = 400;
  ctx.response.body = {
    success: "failed",
    data: err.message,
  };
}
