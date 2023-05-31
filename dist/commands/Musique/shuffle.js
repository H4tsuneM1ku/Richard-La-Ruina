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
import MusicQueueButton from "../../buttons/Musique/ListeLecture.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("shuffle")
        .setDescription("Mélange aléatoirement la liste de lecture des chansons.")
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
        queue.shuffle();
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("🔀 Mélange terminé !")
            .setDescription("La liste de lecture a été mélangée aléatoirement. Jetez-y un coup d'œil !")
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        const button = new ActionRowBuilder().addComponents(MusicQueueButton.data);
        interaction.followUp({ embeds: [embed], components: [button] });
    }),
};
