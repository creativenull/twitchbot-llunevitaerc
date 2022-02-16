import { TwitchChat } from "https://deno.land/x/tmi@v1.0.5/mod.ts";
import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

export const env = config({ safe: true });
export const client = new TwitchChat(env.OAUTH_TOKEN, env.BOT_USERNAME);
