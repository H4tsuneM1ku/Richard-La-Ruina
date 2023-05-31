import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import MusicQueueButton from "../../buttons/Musique/ListeLecture.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";

export default {
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Mélange aléatoirement la liste de lecture des chansons.")
    .setDMPermission(false),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return ERROR.MUSIC_QUEUE_IS_EMPTY(interaction);
    }
    if (interaction.guild.members.me?.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
      return ERROR.PLEASE_JOIN_SAME_VOICE_CHANNEL(interaction);
    }

    queue.shuffle();

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("🔀 Mélange terminé !")
      .setDescription("La liste de lecture a été mélangée aléatoirement. Jetez-y un coup d'œil !")
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(MusicQueueButton.data)

    interaction.followUp({ embeds: [embed], components: [button] });
  },
};
