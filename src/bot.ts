import { client, env } from "./chatbot/client.ts";
import { onMessageHandler } from "./chatbot/message-handler.ts";

try {
  await client.connect();

  const channel = client.joinChannel(env.CHANNEL_NAME);
  channel.addEventListener("privmsg", (ctx) => {
    onMessageHandler(channel, ctx);
  });

  channel.addEventListener("join", () => {
    console.log(`* Connected to ${env.CHANNEL_NAME}`);
  });
} catch (e) {
  client.disconnect();
}
