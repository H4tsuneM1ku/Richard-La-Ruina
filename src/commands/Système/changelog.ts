import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js" ;
import axios from "axios" ;
import * as cheerio from "cheerio" ;

export default {
  data : new SlashCommandBuilder()
    .setName("changelog")
    .setDescription("Récupère les dernières modifications apportées à Richard La Ruina."),

  run : async (client : Client, interaction : ChatInputCommandInteraction) => {
    let githubReleasesData : any = await axios.get("https://github.com/H4tsuneM1ku/Richard-La-Ruina/releases") ;
    githubReleasesData = cheerio.load(githubReleasesData.data) ;
    const latestRelease = githubReleasesData("#repo-content-pjax-container > div > div:nth-child(3) > section:nth-child(1) > div > div.col-md-9 > div > div.Box-body > div.markdown-body.my-3").text().trim(); ;

    let githubCommitData : any = await axios.get("https://github.com/H4tsuneM1ku/Richard-La-Ruina/commit/main") ;
    githubCommitData = cheerio.load(githubCommitData.data) ;
    const latestCommit = githubCommitData("#repo-content-pjax-container > div > div.commit.full-commit.mt-0.px-2.pt-2 > div.commit-title.markdown-title").text().trim(); ;

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Aller sur GitHub")
      .setURL("https://github.com/H4tsuneM1ku/Richard-La-Ruina")
      .addFields(
        { name : "Recent Commits", value : latestCommit, inline : false },
        { name : "Recent releases", value : latestRelease, inline : false }
      )
      .setTimestamp()
      .setFooter({ text : `Demandé par ${interaction.user.tag}`, iconURL : `${interaction.user.displayAvatarURL()}` }) ;

    interaction.followUp({ embeds : [embed] }) ;
  },
}
