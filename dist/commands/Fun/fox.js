var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";
export default {
    data: new SlashCommandBuilder()
        .setName("fox")
        .setDescription("Récupère une photo aléatoire de renard."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get("https://randomfox.ca/floof/");
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setImage(response.data.image)
            .setTitle("🦊")
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    }),
};
