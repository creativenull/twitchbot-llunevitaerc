import { config } from "https://deno.land/x/dotenv@v3.2.0/mod.ts";

export const env = config({ safe: true });
export const client = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

client.addEventListener("open", () => {
  // Successful connection to twitch IRC endpoint
  // Connecting to user channel
  client.send(`PASS oauth:${env.OAUTH_TOKEN}`);
  client.send(`NICK ${env.BOT_USERNAME}`);
  client.send(`JOIN #${env.CHANNEL_NAME}`);
  console.log(`[tmi.twitch.tv] Successful connection to: ${env.CHANNEL_NAME}`);
});

client.addEventListener("error", (e) => {
  console.log("[tmi.twitch.tv] Connect error:", JSON.stringify(e));
  client.close();
});

client.addEventListener("close", () => {
  console.log("[tmi.twitch.tv] Connection Terminated");
});
