import { client, env } from "./client.ts";
import { getSingleCommand } from "../../server/repositories/command.ts";

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

function sendMessage(msg: string) {
  client.send(`PRIVMSG #${env.CHANNEL_NAME} :${msg}`);
}

function isCommandFromChat(msg: string) {
  const isOnlyCommand = /^!(\w*)(\r\n|\n)$/.test(msg);
  const isCommand = /^!(\w*) .*(\r\n|\n)$/.test(msg);
  return isOnlyCommand || isCommand;
}

function parseCommandFromChat(msg: string) {
  const commandName = msg.match(/^!(\w*)/);
  if (commandName) {
    return commandName[1];
  }
  return "";
}

function handleCommands(msg: string) {
  try {
    if (msg.startsWith("!")) {
      if (isCommandFromChat(msg)) {
        const commandName = parseCommandFromChat(msg);
        const [res] = getSingleCommand(commandName);
        sendMessage(res as string);
      }
    }
  } catch (_) {}
}

export function onMessageRecieved(e: MessageEvent<string>) {
  const rawMsg: string = e.data;

  if (rawMsg.includes("PRIVMSG")) {
    const msg = getMessage(rawMsg);
    // console.log(`${username}: ${msg}`);
    handleCommands(msg);
  } else if (rawMsg.includes("PING")) {
    console.log("[tmi.twitch.tv] PONG");

    client.send("PONG :tmi.twitch.tv");
  }
}
