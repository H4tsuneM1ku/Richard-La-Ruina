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
        .setName("ping")
        .setDescription("Vérifier la vitesse de réaction des messages."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const embed = new EmbedBuilder()
            .setColor("#FF0000")
            .setTitle("🏓 Pong!")
            .setDescription(`Vitesse de réaction : ${client.ws.ping}ms`)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    }),
};
