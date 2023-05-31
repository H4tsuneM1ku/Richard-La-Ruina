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
        .setName("dev")
        .setDescription("Afficher des informations sur le développeur."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.inCachedGuild())
            return;
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("📘 Infos du dev")
            .addFields({ name: "👑 Nom", value: "Kali", inline: true }, { name: "🏷 Discord Tag", value: "Kali#6666", inline: true }, { name: "🌐 Website", value: "https://zdradakali.tech/IfUreadThisURgay/ZtvnUr4a", inline: true })
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    }),
};
