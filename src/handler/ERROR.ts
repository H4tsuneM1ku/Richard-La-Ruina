import { ChatInputCommandInteraction, ButtonInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";

export default {
  YOU_HAVE_BEEN_BANNED: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("❌ Erreur!")
      .setDescription("Vous avez été banni par l'administrateur.")
      .setFields({ name: "Code d'erreur", value: "YOU_HAVE_BEEN_BANNED" })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
    interaction.followUp({ embeds: [embed] });
  },

/*
  BOT_HAVE_NO_PERMISSION: function (interaction: ChatInputCommandInteraction | ButtonInteraction, permissions: string[]) {
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("❌ Erreur!")
      .setDescription(`Le bot n'a pas les permissions nécessaires pour effectuer cette action.\n\`${permissions}\``)
      .setFields({ name: "Code d'erreur", value: "BOT_HAVE_NO_PERMISSION" })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
    interaction.followUp({ embeds: [embed] });
  },
*/
  
UNKNOWN_ERROR: function (interaction: ChatInputCommandInteraction | ButtonInteraction, error: Error) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription(`Une erreur inconnue s'est produite.\n\`\`\`ts${error.stack}\`\`\``)
    .addFields({ name: "Code d'erreur", value: "UNKNOWN_ERROR" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

INVALID_INTERACTION: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("❌ Erreur!")
        .setDescription("Commande invalide.")
        .addFields({ name: "Code d'erreur", value: "INVALID_INTERACTION" })
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
},

PLEASE_TYPE_ARGUMENTS: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("❌ Erreur!")
        .setDescription("Aucun argument fourni.")
        .addFields({ name: "Code d'erreur", value: "PLEASE_TYPE_ARGUMENTS" })
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
},

INVALID_ARGUMENT: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("❌ Erreur!")
        .setDescription("Argument invalide.")
        .addFields({ name: "Code d'erreur", value: "INVALID_ARGUMENT" })
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
    interaction.followUp({ embeds: [embed] });
},

COOLDOWN_ACTIVATED: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setTitle("❌ Erreur!")
        .setDescription("Veuillez réessayer dans un moment.")
        .addFields({ name: "Code d'erreur", value: "COOLDOWN_ACTIVATED" })
        .setTimestamp()
        .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    interaction.followUp({ embeds: [embed] });
},

PLEASE_JOIN_VOICE_CHANNEL: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Veuillez d'abord rejoindre un salon vocal.")
    .addFields({ name: "Code d'erreur", value: "PLEASE_JOIN_VOICE_CHANNEL" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

PLEASE_JOIN_SAME_VOICE_CHANNEL: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Veuillez rejoindre le même salon vocal.")
    .addFields({ name: "Code d'erreur", value: "PLEASE_JOIN_SAME_VOICE_CHANNEL" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

CAN_NOT_JOIN_VOICE_CHANNEL: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Impossible de rejoindre le salon vocal.")
    .addFields({ name: "Code d'erreur", value: "CAN_NOT_JOIN_VOICE_CHANNEL" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

MUSIC_QUEUE_IS_EMPTY: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("La liste de lecture est vide.")
    .addFields({ name: "Code d'erreur", value: "MUSIC_QUEUE_IS_EMPTY" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

MUSIC_IS_PLAYING: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Il y a déjà une musique en cours de lecture.")
    .addFields({ name: "Code d'erreur", value: "MUSIC_IS_PLAYING" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
  interaction.followUp({ embeds: [embed] });
},

CAN_NOT_FIND_MUSIC: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Impossible de trouver la musique.")
    .addFields({ name: "Code d'erreur", value: "CAN_NOT_FIND_MUSIC" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
  interaction.followUp({ embeds: [embed] });
},

CAN_NOT_FIND_PREVIOUS_MUSIC: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Impossible de trouver la musique précédente.")
    .addFields({ name: "Code d'erreur", value: "CAN_NOT_FIND_PREVIOUS_MUSIC" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
  interaction.followUp({ embeds: [embed] });
},

MUSIC_IS_TOO_LONG: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setTitle("❌ Erreur!")
    .setDescription("Seules les musiques de moins de 3 heures peuvent être lues.")
    .addFields({ name: "Code d'erreur", value: "MUSIC_IS_TOO_LONG" })
    .setTimestamp()
    .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
  interaction.followUp({ embeds: [embed] });
},

CAN_NOT_USE_IN_DM: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("❌ Erreur!")
      .setDescription("Cette commande ne peut pas être utilisée en messages privés (DM).")
      .addFields({ name: "Code d'erreur", value: "CAN_NOT_USE_IN_DM" })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

GAME_IS_NOT_STARTED: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("❌ Erreur!")
      .setDescription("Le jeu n'a pas encore commencé.")
      .addFields({ name: "Code d'erreur", value: "GAME_IS_NOT_STARTED" })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},

GAME_IS_ALREADY_STARTED: function (interaction: ChatInputCommandInteraction | ButtonInteraction) {
  const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setTitle("❌ Erreur!")
      .setDescription("Le jeu a déjà commencé.")
      .addFields({ name: "Code d'erreur", value: "GAME_IS_ALREADY_STARTED" })
      .setTimestamp()
      .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
  interaction.followUp({ embeds: [embed] });
},
};

