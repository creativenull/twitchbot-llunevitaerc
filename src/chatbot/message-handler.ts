import tmi from "https://esm.sh/tmi.js@1.8.5";
import { client } from "./client.ts";

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

export function onMessageHandler(
  channel: string,
  _: tmi.ChatUserstate,
  msg: string,
  self: boolean,
) {
  if (self) return; // Ignore messages from the bot

  const commandName = msg.trim();

  if (commandName === "!dice") {
    const num = rollDice();
    client.say(channel, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

