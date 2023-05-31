var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
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
        .setRequired(true)),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (interaction.user.id != "258394351628058636")
            return;
        const utilisateur = interaction.options.getUser("utilisateur", true);
        const boolean = interaction.options.getBoolean("réglage");
        if (boolean == true) {
            connection.query(`INSERT INTO ban(ID, ban) VALUES (${utilisateur.id}, ${boolean})`);
            const embed = new EmbedBuilder()
                .setColor("#000000")
                .setTitle("🔨 BANNI !")
                .setDescription(`<@${utilisateur.id}> a été banni.`)
                .setTimestamp()
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            interaction.followUp({ embeds: [embed] });
        }
        else {
            connection.query(`UPDATE ban SET ban=0 WHERE id=${utilisateur.id}`);
            const embed = new EmbedBuilder()
                .setColor("#000000")
                .setTitle("🔨 DEBANNI !")
                .setDescription(`<@${utilisateur.id}> a été débanni.`)
                .setTimestamp()
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            interaction.followUp({ embeds: [embed] });
        }
    })
};
