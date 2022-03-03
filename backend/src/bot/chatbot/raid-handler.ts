import { IrcMessage } from "https://deno.land/x/tmi@v1.0.5/lib/twitch_data.ts";
import { Channel } from "https://deno.land/x/tmi@v1.0.5/mod.ts";

export function onRaidHandler(channel: Channel, ctx: IrcMessage) {
  channel.send(`PogChamp ${ctx.username} just RAIDED with 1000 viewers!`);
}
