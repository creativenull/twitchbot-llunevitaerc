import { client } from "./chatbot/client.ts";
import { onMessageHandler } from "./chatbot/message-handler.ts";
import { onRaidHandler } from "./chatbot/raid-handler.ts";
import { onPingHandler } from "./chatbot/ping-handler.ts";

client.on("message", onMessageHandler);
client.on("raided", onRaidHandler);
client.on("ping", onPingHandler);

client.on("connected", (addr: string, port: number) => {
  console.log(`* Connected to ${addr}:${port}`);
});

client.connect();
