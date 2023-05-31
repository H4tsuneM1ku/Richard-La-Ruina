import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import axios from "axios";

export default {
    data: new SlashCommandBuilder()
      .setName("porn")
      .setDescription("Récupère une photo bien porn sur Reddit."),
  
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'porn') { // Nom de la commande slash
    // Appel à l'API Reddit pour récupérer une image aléatoire du subreddit FoodPorn
    try {
      const response = await axios.get('https://www.reddit.com/r/FoodPorn/random.json');
      const post = response.data[0]?.data?.children[0]?.data;
      
      if (!post) {
        await interaction.reply(`Aucune image trouvée dans le subreddit "FoodPorn".`);
        return;
      }

      // Création de l'embed avec l'image et les informations du post
      const embed = new EmbedBuilder()
        .setTitle(post.title)
        .setImage(post.url)
        .setURL(`https://www.reddit.com${post.permalink}`)
        .setFooter({ text: `Posté par u/${post.author}`})
        .setColor('#FF4500');
      
      interaction.followUp({ embeds: [embed] });
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'image du subreddit :', error);
      interaction.followUp('Une erreur est survenue lors de la récupération de l\'image du subreddit.');
    }
  }
}
};