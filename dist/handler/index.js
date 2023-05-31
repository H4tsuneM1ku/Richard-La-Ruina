var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
export default (client) => __awaiter(void 0, void 0, void 0, function* () {
    const commandsArray = [];
    const commandFolders = readdirSync(`${__dirname}/../commands`);
    for (const category of commandFolders) {
        const commandFiles = readdirSync(`${__dirname}/../commands/${category}`).filter((file) => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = (yield import(`../commands/${category}/${file}`)).default;
            client.commands.set(command.data.name, command);
            commandsArray.push(command.data);
        }
    }
    const buttonFolders = readdirSync(`${__dirname}/../buttons`);
    for (const category of buttonFolders) {
        const buttonFiles = readdirSync(`${__dirname}/../buttons/${category}`).filter((file) => file.endsWith(".js"));
        for (const file of buttonFiles) {
            const button = (yield import(`../buttons/${category}/${file}`)).default;
            client.buttons.set(button.data.data.custom_id, button);
        }
    }
    const eventFolders = readdirSync(`${__dirname}/../events`);
    for (const category of eventFolders) {
        const eventFiles = readdirSync(`${__dirname}/../events/${category}`).filter((file) => file.endsWith(".js"));
        for (const file of eventFiles) {
            const event = (yield import(`../events/${category}/${file}`)).default;
        }
    }
    client.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
        yield client.guilds.cache.get("440826811639922688").commands.set(commandsArray);
        yield client.application.commands.set(commandsArray);
    }));
});
