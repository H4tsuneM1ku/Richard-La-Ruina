import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Vérifier la vitesse de réaction des messages."),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("🏓 Pong!")
      .setDescription(`Vitesse de réaction : ${client.ws.ping}ms`)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
