var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ButtonBuilder, ButtonStyle } from "discord.js";
import MusicQueue from "../../commands/Musique/playlist.js";
export default {
    data: new ButtonBuilder()
        .setCustomId("MusicQueueButton")
        .setLabel("Liste de lecture")
        .setEmoji("📄")
        .setStyle(ButtonStyle.Secondary),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        MusicQueue.run(client, interaction);
    })
};
