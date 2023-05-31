import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import InviteButton from "../../buttons/Lien/Invite.js";

export default {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Génère un lien d'invitation pour inviter le bot."),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(InviteButton.data)
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("💌 Invitez le bot !")
      .setDescription(`Actuellement utilisé sur ${client.guilds.cache.size} serveurs, par ${client.users.cache.size} utilisateurs.\n(Clic droit sur le bouton pour copier le lien d'invitation.)`)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed], components: [button] });
  }
};
