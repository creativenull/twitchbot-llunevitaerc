import { Context } from "https://deno.land/x/oak@v10.1.0/mod.ts";
import {
  respondWithError,
  respondWithNotFound,
} from "../utils/handlers/error_handler.ts";
import { queryAllUsers, readSingleUser } from "../repositories/user.ts";

export function getUsers(ctx: Context) {
  try {
    const users = queryAllUsers();
    ctx.response.body = users;
  } catch (_) {
    respondWithNotFound(ctx);
  }
}

export function getSingleUser(ctx: Context) {
  try {
    const id = ctx.request.url.searchParams.get("id") ?? "";
    const user = readSingleUser(parseInt(id));
    ctx.response.body = user;
  } catch (e) {
    respondWithError(ctx, e);
  }
}
