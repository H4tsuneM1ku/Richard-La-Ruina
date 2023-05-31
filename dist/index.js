import "dotenv/config";
import Handler from "./handler/index.js";
import { Client, Collection } from "discord.js";
const client = new Client({ intents: 32767 });
export default client;
client.commands = new Collection();
client.buttons = new Collection();
Handler(client);
client.login(process.env.BETA_TOKEN);
