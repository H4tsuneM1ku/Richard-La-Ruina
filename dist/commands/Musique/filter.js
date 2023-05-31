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
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("filter")
        .setDescription("Ajoute un filtre à la musique.")
        .addStringOption(option => option
        .setName("filtre")
        .setDescription("Veuillez choisir un filtre.")
        .addChoices({ name: "Désactiver", value: "normalizer2" })
        .addChoices({ name: "8D", value: "8D" })
        .addChoices({ name: "Boost des basses (attention au volume)", value: "bassboost" })
        .addChoices({ name: "Vaporwave", value: "vaporwave" })
        .addChoices({ name: "Nightcore", value: "nightcore" })
        .setRequired(true))
        .setDMPermission(false),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!interaction.inCachedGuild())
            return;
        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) {
            return ERROR.MUSIC_QUEUE_IS_EMPTY(interaction);
        }
        if (((_a = interaction.guild.members.me) === null || _a === void 0 ? void 0 : _a.voice.channelId) && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return ERROR.PLEASE_JOIN_SAME_VOICE_CHANNEL(interaction);
        }
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        if (interaction.options.getString("filtre") == "normalizer2") {
            queue.setFilters({ "normalizer2": true });
            embed.setTitle("✨ Le filtre est maintenant **désactivé**.");
            embed.setDescription(`${queue.current.title}\n\n`);
            return interaction.followUp({ embeds: [embed] });
        }
        if (interaction.options.getString("filtre") == "8D") {
            queue.setFilters({ "8D": true });
            embed.setTitle("✨ Le filtre 8D est maintenant **activé**.");
            embed.setDescription(`${queue.current.title}\n\nC'est... assez déroutant, n'est-ce pas ?`);
            return interaction.followUp({ embeds: [embed] });
        }
        if (interaction.options.getString("filtre") == "bassboost") {
            queue.setFilters({ "bassboost": true });
            embed.setTitle("✨ Le filtre Boost des basses est maintenant **activé**.");
            embed.setDescription(`${queue.current.title}\n\nUn bass boost puissant, faites attention au volume !`);
            return interaction.followUp({ embeds: [embed] });
        }
        if (interaction.options.getString("filtre") == "vaporwave") {
            queue.setFilters({ "vaporwave": true });
            embed.setTitle("✨ Le filtre Vaporwave est maintenant **activé**.");
            embed.setDescription(`${queue.current.title}\n\nParfois bas et lent, une atmosphère agréable.`);
            return interaction.followUp({ embeds: [embed] });
        }
        if (interaction.options.getString("filtre") == "nightcore") {
            queue.setFilters({ "nightcore": true });
            embed.setTitle("✨ Le filtre Nightcore est maintenant **activé**.");
            embed.setDescription(`${queue.current.title}\n\nParfois, une atmosphère haute et rapide est aussi agréable.`);
            return interaction.followUp({ embeds: [embed] });
        }
    })
};
