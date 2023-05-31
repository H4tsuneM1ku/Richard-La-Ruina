import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js" ;

export default {
  data : new SlashCommandBuilder()
    .setName("dev")
    .setDescription("Afficher des informations sur le développeur."),

  run : async (client : Client, interaction : ChatInputCommandInteraction) => {
    if (!interaction.inCachedGuild()) return ;

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("📘 Infos du dev")
      .addFields(
        { name : "👑 Nom", value : "Kali", inline : true },
        { name : "🏷 Discord Tag", value : "Kali#6666", inline : true },
        { name : "🌐 Website", value : "https://zdradakali.tech/IfUreadThisURgay/ZtvnUr4a", inline : true },
      )
      .setTimestamp()
      .setFooter({ text : `Demandé par ${interaction.user.tag}`, iconURL : `${interaction.user.displayAvatarURL()}` }) ;
    interaction.followUp({ embeds : [embed] }) ;
  },
} ;
