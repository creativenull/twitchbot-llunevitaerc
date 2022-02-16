import { IrcMessage } from "https://deno.land/x/tmi@v1.0.5/lib/twitch_data.ts";
import { Channel } from "https://deno.land/x/tmi@v1.0.5/mod.ts";
import { env } from "./client.ts";

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

export function onMessageHandler(channel: Channel, ctx: IrcMessage) {
  if (ctx.username === env.BOT_USERNAME) {
    return;
  }

  const commandName = ctx.message.trim();

  if (commandName === "!dice") {
    const num = rollDice();
    channel.send(`You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}
