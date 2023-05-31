import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import MusicQueueButton from "../../buttons/Musique/ListeLecture.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";

export default {
  data: new SlashCommandBuilder()
    .setName("remove")
    .setDescription("Retire une chanson de la playlist.")
    .addNumberOption((option) => option
      .setName("song")
      .setDescription("Entrez le numéro de la playlist.")
      .setRequired(true))
    .setDMPermission(false),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const trackIndex = interaction.options.getNumber("song", true) - 1;
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return ERROR.MUSIC_QUEUE_IS_EMPTY(interaction);
    }
    if (interaction.guild.members.me?.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
      return ERROR.PLEASE_JOIN_SAME_VOICE_CHANNEL(interaction);
    }
    if (!queue.tracks[trackIndex]) {
      return ERROR.CAN_NOT_FIND_MUSIC(interaction);
    }

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setThumbnail(queue.tracks[trackIndex].thumbnail)
      .setTitle("🗑️ Retiré de la playlist.")
      .setDescription(`${queue.tracks[trackIndex].title}`)
      .setURL(`${queue.tracks[trackIndex].url}`)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(MusicQueueButton.data)
    interaction.followUp({ embeds: [embed], components: [button] });

    queue.remove(trackIndex);
  },
};
