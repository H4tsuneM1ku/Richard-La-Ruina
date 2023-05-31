import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";

export default {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Affiche les informations sur la chanson en cours de lecture."),

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    if (!interaction.inCachedGuild()) return;

    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing) {
      return ERROR.MUSIC_QUEUE_IS_EMPTY(interaction);
    }
    if (interaction.guild.members.me?.voice.channelId && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
      return ERROR.PLEASE_JOIN_SAME_VOICE_CHANNEL(interaction);
    }

    const progress = queue.createProgressBar();
    const perc = queue.getPlayerTimestamp();

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("🎵 En lecture")
      .setDescription(`**${queue.current.title}**! (\`${perc.progress}%\`)`)
      .addFields({ name: "\u200b", value: progress })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
  },
};

