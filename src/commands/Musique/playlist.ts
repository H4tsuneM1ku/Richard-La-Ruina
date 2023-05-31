import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";

export default {
  data: new SlashCommandBuilder()
    .setName("playlist")
    .setDescription("Vérifiez la liste de lecture des chansons.")
    .addStringOption(option => option
      .setName("option")
      .setDescription("Veuillez spécifier une option.")
      .addChoices({ name: "Réinitialiser", value: "clear" })
    )
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

    try {
      if (interaction.options.getString("option") == "clear") {
        queue.clear();

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("💥 Boum!")
          .setDescription("La liste de lecture a été réinitialisée!")
          .setTimestamp()
          .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        return interaction.followUp({ embeds: [embed] });

      } else {
        const currentTrack = queue.current;
        const tracks = queue.tracks.slice(0, 10).map((m, i) => {
          return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
        });

        if (queue.tracks.length == 0) {
          const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("📄 Liste de lecture")
            .addFields({
              name: "Chanson en cours de lecture",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
            })
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
          return interaction.followUp({ embeds: [embed] });

        } else {
          const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("📄 Liste de lecture de chansons")
            .setDescription(`${tracks.join("\n")}${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""}`)
            .addFields({
              name: "Chanson en cours de lecture",
              value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
            })
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

          return interaction.followUp({ embeds: [embed] });
        }
      }
    } catch {
      const currentTrack = queue.current;
      const tracks = queue.tracks.slice(0, 10).map((m, i) => {
        return `${i + 1}. [**${m.title}**](${m.url}) - ${m.requestedBy.tag}`;
      });

      if (queue.tracks.length == 0) {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("📄 Liste de lecture de chansons")
          .addFields({
            name: "Chanson en cours de lecture",
            value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
          })
          .setTimestamp()
          .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        return interaction.followUp({ embeds: [embed] });

      } else {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("📄 Liste de lecture de chansons")
          .setDescription(`${tracks.join("\n")}${queue.tracks.length > tracks.length ? `\n...${queue.tracks.length - tracks.length === 1 ? `${queue.tracks.length - tracks.length} more track` : `${queue.tracks.length - tracks.length} more tracks`}` : ""}`)
          .addFields({
            name: "Chanson en cours de lecture",
            value: `🎶 | [**${currentTrack.title}**](${currentTrack.url}) - ${currentTrack.requestedBy.tag}`,
          })
          .setTimestamp()
          .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        return interaction.followUp({ embeds: [embed] });
      }
    }
  },
};
