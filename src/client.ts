import { Client, GatewayIntentBits } from "discord.js";
import Keys from "./keys";
import { registerEvents } from "./utils/index";
import Events from "./events/index";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

registerEvents(client, Events);

client.login(Keys.clientToken).catch((error) => {
  console.error("[Login Error]", error);
  process.exit(1);
});
