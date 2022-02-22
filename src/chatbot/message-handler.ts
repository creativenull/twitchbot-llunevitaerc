import { client, env } from "./client.ts";

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

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

export function onMessageRecieved(e: MessageEvent<string>) {
  const rawMsg: string = e.data;
  if (rawMsg.includes("PRIVMSG")) {
    const username = getUsername(rawMsg);
    const msg = getMessage(rawMsg);
    console.log(`${username}: ${msg}`);

    if (msg.startsWith("!")) {
      if (msg.includes("dice")) {
        const res = rollDice();
        client.send(`PRIVMSG #${env.CHANNEL_NAME} :${res}`);
      }
    }
  } else if (rawMsg.includes("PING")) {
    console.log("[tmi.twitch.tv] PONG");
    client.send("PONG :tmi.twitch.tv");
  }
}
