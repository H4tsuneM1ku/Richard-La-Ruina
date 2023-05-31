import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("vote")
    .setDescription("Lance un vote.")
    .addStringOption(option => option
      .setName("description")
      .setDescription("Entrez une description pour le vote.")
      .setRequired(true)
    ),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const description = interaction.options.getString("description");

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("📊 Vote")
      .setDescription(description)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    const message = await interaction.followUp({ embeds: [embed] });
    await message.react("✅");
    await message.react("❌");
  }
};
