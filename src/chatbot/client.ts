import tmi from "https://esm.sh/tmi.js@1.8.5";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

const env = config({ safe: true });

const opts: tmi.Options = {
  identity: {
    username: env.BOT_USERNAME,
    password: env.OAUTH_TOKEN,
  },
  channels: [env.CHANNEL_NAME],
};

export const client = new tmi.client(opts);
