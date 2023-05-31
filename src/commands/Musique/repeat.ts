import { Client, ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { QueueRepeatMode } from "discord-player";
import player from "../../events/player/player.js";
import ERROR from "../../handler/ERROR.js";

export default {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Répète la chanson en cours de lecture.")
    .addStringOption(option => option
      .setName("option")
      .setDescription("Veuillez spécifier une option.")
      .addChoices({ name: "Chanson", value: "QUEUE" })
      .addChoices({ name: "Liste de lecture", value: "TRACK" })
      .addChoices({ name: "Désactiver", value: "OFF" })
      .setRequired(true)
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

    const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`${queue.current.title}`)
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

    if (interaction.options.getString("option") == "QUEUE") {
      queue.setRepeatMode(QueueRepeatMode.QUEUE);
      embed.setTitle("🔁 La répétition de la chanson est activée.");
      return interaction.followUp({ embeds: [embed] });
    }

    if (interaction.options.getString("option") == "TRACK") {
      queue.setRepeatMode(QueueRepeatMode.TRACK);
      embed.setTitle("🔁 La répétition de la liste de lecture est activée.");
      return interaction.followUp({ embeds: [embed] });
    }

    if (interaction.options.getString("option") == "OFF") {
      queue.setRepeatMode(QueueRepeatMode.OFF);
      embed.setTitle("🔁 La répétition est désactivée.");
      return interaction.followUp({ embeds: [embed] });
    }
  },
};
