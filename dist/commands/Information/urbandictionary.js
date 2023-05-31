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
import axios from "axios";
import ERROR from "../../handler/ERROR.js";
export default {
    data: new SlashCommandBuilder()
        .setName("urbandictionary")
        .setDescription("Recherche un mot dans le dictionnaire urbain, un dictionnaire en ligne d'anglais.")
        .addStringOption((option) => option
        .setName("mot")
        .setDescription("Veuillez entrer le mot que vous souhaitez rechercher.")
        .setRequired(true)),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        const word = interaction.options.getString("mot", true);
        try {
            let urbanDictionaryData = yield axios.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`);
            urbanDictionaryData = JSON.parse(JSON.stringify(urbanDictionaryData.data));
            const embed = new EmbedBuilder()
                .setColor("Random")
                .setTitle(`${urbanDictionaryData.list[0].word}`)
                .setURL(`${urbanDictionaryData.list[0].permalink}`)
                .setDescription(`${urbanDictionaryData.list[0].definition}`)
                .addFields({ name: "Exemple", value: `${urbanDictionaryData.list[0].example}`, inline: true })
                .setTimestamp()
                .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
            interaction.followUp({ embeds: [embed] });
        }
        catch (erreur) {
            return ERROR.INVALID_ARGUMENT(interaction);
        }
    }),
};
