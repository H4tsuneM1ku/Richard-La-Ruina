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
export default {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Lance un vote.")
        .addStringOption(option => option
        .setName("description")
        .setDescription("Entrez une description pour le vote.")
        .setRequired(true)),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const description = interaction.options.getString("description");
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("📊 Vote")
            .setDescription(description)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        const message = yield interaction.followUp({ embeds: [embed] });
        yield message.react("✅");
        yield message.react("❌");
    })
};
