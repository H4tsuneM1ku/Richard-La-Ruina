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
import moment from "moment";
export default {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("Affiche les informations actuelles du serveur.")
        .setDMPermission(false),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.inCachedGuild())
            return;
        const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map((role) => role.toString());
        const channels = interaction.guild.channels.cache.map((channel) => channel.toString());
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setTitle(`Informations sur le serveur '${interaction.guild.name}'`)
            .addFields({ name: "📛 Nom", value: `${interaction.guild.name}`, inline: true }, { name: "🆔 ID", value: `${interaction.guild.id}`, inline: true }, { name: "👑 Propriétaire du serveur", value: `<@${interaction.guild.ownerId}>`, inline: true }, { name: "📅 Date de création du serveur", value: `${moment(interaction.guild.createdAt).locale("ko").format("LLLL")}`, inline: true }, { name: "👤 Nombre d'utilisateurs", value: `${interaction.guild.memberCount} membres`, inline: true }, { name: "🏳️ Nombre de rôles (y compris everyone)", value: `${roles.length} rôles`, inline: true }, { name: "🏴 Nombre de canaux (y compris les catégories)", value: `${channels.length} canaux`, inline: true })
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    }),
};
