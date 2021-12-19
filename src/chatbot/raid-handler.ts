import { client } from "./client.ts";

export function onRaidHandler(
  channel: string,
  username: string,
  viewers: number,
) {
  client.say(channel, `PogChamp ${username} just RAIDED with ${viewers} viewers!`);
}
