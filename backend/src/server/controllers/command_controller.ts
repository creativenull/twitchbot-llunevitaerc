import { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import { respondWithError, respondWithNotFound } from "../utils/handlers/error_handler.ts";
import { createSingleCommand, queryAllCommands } from "../repositories/command.ts";

export function getCommands(ctx: Context) {
  try {
    ctx.response.body = queryAllCommands();
  } catch (_) {
    respondWithNotFound(ctx);
  }
}

export async function addCommand(ctx: Context) {
  try {
    const req = ctx.request.body();
    if (req.type === "json") {
      createSingleCommand(await req.value);
      ctx.response.body = { status: "success" };
    }
  } catch (e) {
    respondWithError(ctx, e);
  }
}
