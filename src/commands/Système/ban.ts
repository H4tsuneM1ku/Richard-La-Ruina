import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: `${process.env.MYSQL_HOST}`,
  user: "root",
  password: `${process.env.MYSQL_PASSWORD}`,
  database: "dhalmel-database",
});

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("[Administrateur] Bloque les autorisations d'utilisation du bot d'un utilisateur.")
    .addUserOption((option) => option
      .setName("utilisateur")
      .setDescription("Veuillez sélectionner un utilisateur.")
      .setRequired(true))
    .addBooleanOption((option) => option
      .setName("réglage")
      .setDescription("Veuillez sélectionner une option.")
      .setRequired(true)
    ),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (interaction.user.id != "258394351628058636") return;

    const utilisateur = interaction.options.getUser("utilisateur", true);
    const boolean = interaction.options.getBoolean("réglage");

    if (boolean == true) {
      connection.query(`INSERT INTO ban(ID, ban) VALUES (${utilisateur.id}, ${boolean})`)

      const embed = new EmbedBuilder()
        .setColor("#000000")
        .setTitle("🔨 BANNI !")
        .setDescription(`<@${utilisateur.id}> a été banni.`)
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
      interaction.followUp({ embeds: [embed] });
    }

    else {
      connection.query(`UPDATE ban SET ban=0 WHERE id=${utilisateur.id}`)

      const embed = new EmbedBuilder()
        .setColor("#000000")
        .setTitle("🔨 DEBANNI !")
        .setDescription(`<@${utilisateur.id}> a été débanni.`)
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
      interaction.followUp({ embeds: [embed] });
    }
  }
}
