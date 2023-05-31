var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder } from "discord.js";
import { QueryType } from "discord-player";
import MusicQueueButton from "../../buttons/Musique/ListeLecture.js";
import MusicRemove from "../../buttons/Musique/Supprime.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Joue une chanson.")
        .addStringOption((option) => option
        .setName("chanson")
        .setDescription("Veuillez entrer le titre de la chanson.")
        .setRequired(true))
        .setDMPermission(false),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (!interaction.inCachedGuild())
            return;
        const songTitle = interaction.options.getString("chanson", true);
        if (!interaction.member.voice.channel) {
            return ERROR.PLEASE_JOIN_VOICE_CHANNEL(interaction);
        }
        if (((_a = interaction.guild.members.me) === null || _a === void 0 ? void 0 : _a.voice.channelId) && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
            return ERROR.PLEASE_JOIN_SAME_VOICE_CHANNEL(interaction);
        }
        const queue = player.createQueue(interaction.guild, {
            metadata: interaction.channel,
        });
        try {
            if (!queue.connection)
                yield queue.connect(interaction.member.voice.channel);
        }
        catch (error) {
            queue.destroy();
            return ERROR.CAN_NOT_JOIN_VOICE_CHANNEL(interaction);
        }
        const track = yield player.search(songTitle, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO,
        });
        if (!track || !track.tracks.length) {
            return ERROR.CAN_NOT_FIND_MUSIC(interaction);
        }
        if (track.tracks[0].durationMS >= 10800000) {
            return ERROR.MUSIC_IS_TOO_LONG(interaction);
        }
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setThumbnail(track.tracks[0].thumbnail)
            .setTitle(`🎵 ${track.playlist ? "playlist" : "Ajouté à la liste de lecture."}`)
            .setDescription(`${track.tracks[0].title}`)
            .setURL(`${track.tracks[0].url}`)
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        const button = new ActionRowBuilder().addComponents(MusicQueueButton.data, MusicRemove.data);
        if (!queue.playing) {
            track.playlist ? queue.addTracks(track.playlist) : queue.play(track.tracks[0]);
            return yield interaction.followUp({ embeds: [embed], components: [button] });
        }
        else if (queue.playing) {
            track.playlist ? queue.addTracks(track.playlist) : queue.addTrack(track.tracks[0]);
            return yield interaction.followUp({ embeds: [embed], components: [button] });
        }
    }),
};
