var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EmbedBuilder, SlashCommandBuilder, parseEmoji } from "discord.js";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("stoleemoji")
        .setDescription("[Nitro] Ajoute un emoji d'un autre serveur. Les emojis par défaut ne peuvent pas être ajoutés.")
        .addStringOption((option) => option
        .setName("emoji")
        .setDescription("Veuillez entrer un emoji.")
        .setRequired(true))
        .setDMPermission(false),
    // permission: [PermissionsBitField.Flags.ManageEmojisAndStickers],
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.inCachedGuild())
            return;
        const rawEmoji = interaction.options.getString("emoji", true);
        try {
            const emoji = parseEmoji(rawEmoji);
            if (!emoji)
                return ERROR.INVALID_ARGUMENT(interaction);
            const extension = emoji.animated ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/emojis/${emoji.id + extension}`;
            interaction.guild.emojis.create({ attachment: url, name: emoji.name });
            const embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle("😛 Emoji ajouté.")
                .addFields({ name: "😀 Emoji", value: `${rawEmoji}`, inline: true }, { name: "📛 Nom d'origine", value: `${emoji.name}`, inline: true }, { name: "🆔 ID d'origine", value: `${emoji.id}`, inline: true })
                .setTimestamp()
                .setFooter({ text: `Requêté par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            interaction.followUp({ embeds: [embed] });
        }
        catch (error) {
            return ERROR.INVALID_ARGUMENT(interaction);
        }
    }),
};
