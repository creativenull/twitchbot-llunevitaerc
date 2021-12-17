import tmi from "https://esm.sh/tmi.js@1.8.5";
import { config } from "https://deno.land/x/dotenv@v3.1.0/mod.ts";

// Read from .env
const env = config({ safe: true });

const opts: tmi.Options = {
  identity: {
    username: env.BOT_USERNAME,
    password: env.OAUTH_TOKEN,
  },
  channels: [env.CHANNEL_NAME],
};

function onMessageHandler(
  target: string,
  _: tmi.ChatUserstate,
  msg: string,
  self: boolean,
) {
  if (self) return; // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === "!dice") {
    const num = rollDice();
    client.say(target, `You rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName}`);
  }
}

function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

function onConnectedHandler(addr: string, port: number) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();
