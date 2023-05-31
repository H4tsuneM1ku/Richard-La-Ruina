import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("fox")
    .setDescription("Récupère une photo aléatoire de renard."),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const response = await axios.get("https://randomfox.ca/floof/");

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setImage(response.data.image)
      .setTitle("🦊")
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
