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
import { QueueRepeatMode } from "discord-player";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("autoplay")
        .setDescription("Recherche et lit automatiquement des chansons liées à la chanson en cours de lecture.")
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
            .setDescription(`${queue.current.title}`)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        if (queue.repeatMode == QueueRepeatMode.AUTOPLAY) {
            queue.setRepeatMode(QueueRepeatMode.OFF);
            embed.setTitle("🔍 Lecture des chansons dans la file d'attente activée.");
            return interaction.followUp({ embeds: [embed] });
        }
        if (queue.repeatMode == QueueRepeatMode.OFF) {
            queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
            embed.setTitle("🔍 Lecture automatique des chansons liées activée.");
            return interaction.followUp({ embeds: [embed] });
        }
    }),
};
