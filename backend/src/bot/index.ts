import { client } from "./chatbot/client.ts";
import { onMessageRecieved } from "./chatbot/message-handler.ts";

try {
  client.addEventListener("message", onMessageRecieved);
} catch (_) {
  client.close();
}
