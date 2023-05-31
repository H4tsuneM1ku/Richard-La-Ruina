import { Client, ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, version } from "discord.js";
import moment from "moment";
import os from "os";

export default {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Affiche les informations de l'utilisateur spécifié.")
    .addUserOption((option) => option
      .setName("utilisateur")
      .setDescription("Veuillez sélectionner un utilisateur.")
      .setRequired(true))
    .setDMPermission(false),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const userInfoUser = interaction.options.getUser("utilisateur", true);
    const userInfoMember = interaction.options.getMember("utilisateur");

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`Informations de ${userInfoUser.tag}`)
      .setThumbnail(userInfoUser.displayAvatarURL())
      .addFields(
        { name: "📛 Nom", value: `${userInfoUser.username}`, inline: true },
        { name: "🆔 ID", value: `${userInfoUser.id}`, inline: true },
        { name: "📅 Date de création du compte", value: `${moment(userInfoUser.createdAt).locale("fr").format("D MMMM YYYY à H:mm:ss")}`, inline: true },
        { name: "📅 Date d'adhésion au serveur", value: `${moment(userInfoMember?.joinedTimestamp).locale("fr").format("D MMMM YYYY à H:mm:ss")}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    if (userInfoUser.id == "650784920473698305") {
      embed.addFields(
        { name: "🖥️ Système d'exploitation", value: `${os.type()} ${os.version()} ${os.release()}`, inline: true },
        { name: "💾 État de la mémoire", value: `${Math.round(os.freemem() / 1000000)} Mo/${Math.round(os.totalmem() / 1000000)} Mo`, inline: true },
        { name: "📂 Version de node.js", value: `${process.version}`, inline: true },
        { name: "📂 Version de discord.js", value: `${version}`, inline: true },
      )
      interaction.followUp({ embeds: [embed] });

    } else {
      interaction.followUp({ embeds: [embed] });
    }
  },
};
