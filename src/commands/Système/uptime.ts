import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Vérifier le temps de fonctionnement du bot."),

  run: async (client: Client<true>, interaction: ChatInputCommandInteraction) => {
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("🕘 Temps de fonctionnement")
      .setDescription(`${days} jours ${hours} heures  ${minutes} minutes ${seconds} secondes`)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  }
}