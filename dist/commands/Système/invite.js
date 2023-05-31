var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } from "discord.js";
import InviteButton from "../../buttons/Lien/Invite.js";
export default {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Génère un lien d'invitation pour inviter le bot."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const button = new ActionRowBuilder().addComponents(InviteButton.data);
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("💌 Invitez le bot !")
            .setDescription(`Actuellement utilisé sur ${client.guilds.cache.size} serveurs, par ${client.users.cache.size} utilisateurs.\n(Clic droit sur le bouton pour copier le lien d'invitation.)`)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed], components: [button] });
    })
};
