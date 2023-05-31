import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";

export default {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Récupère une photo aléatoire de chien."),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const response = await axios.get("https://api.thedogapi.com/v1/images/search", {
      headers: {
        "x-api-key": process.env.THE_DOG_API_KEY,
      },
    });

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setImage(response.data[0].url)
      .setTitle("🐶")
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};
