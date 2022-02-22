import { env } from "./src/chatbot/client.ts";

const twitchWssUrl = "wss://irc-ws.chat.twitch.tv:443";
const twitchchat = new WebSocket(twitchWssUrl);

function getUsername(rawMsg: string): string {
  let username = "";
  const usernameMatch = rawMsg.match(/@(\w*).tmi.twitch.tv/);
  if (usernameMatch) {
    username = usernameMatch[1];
  }
  return username;
}

function getMessage(rawMsg: string) {
  const splitMsg = rawMsg.split(":");
  return splitMsg[splitMsg.length - 1];
}

function messageHandler(e: MessageEvent<string>) {
  const rawMsg: string = e.data;
  if (rawMsg.includes("PRIVMSG")) {
    const username = getUsername(rawMsg);
    const msg = getMessage(rawMsg);
    console.log(`${username}: ${msg}`);
  } else if (rawMsg.includes("PING")) {
    console.log("PONG");
    twitchchat.send("PONG :tmi.twitch.tv");
  }
}

twitchchat.addEventListener("open", () => {
  // Successful connection to twitch IRC endpoint
  // Connecting to user channel
  twitchchat.send(`PASS oauth:${env.OAUTH_TOKEN}`);
  twitchchat.send(`NICK ${env.BOT_USERNAME}`);
  twitchchat.send(`JOIN #${env.CHANNEL_NAME}`);
  console.log(`Successful connection to: ${env.CHANNEL_NAME}`);
});

twitchchat.addEventListener("message", messageHandler);

twitchchat.addEventListener("error", (e) => {
  console.log("Connect error:", JSON.stringify(e));
  twitchchat.close();
});

twitchchat.addEventListener("close", () => {
  console.log("Connection Terminated");
});
