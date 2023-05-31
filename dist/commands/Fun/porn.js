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
export default {
    data: new SlashCommandBuilder()
        .setName("porn")
        .setDescription("Récupère une photo bien porn sur Reddit."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        if (!interaction.isCommand())
            return;
        if (interaction.commandName === 'porn') { // Nom de la commande slash
            // Appel à l'API Reddit pour récupérer une image aléatoire du subreddit FoodPorn
            try {
                const response = yield axios.get('https://www.reddit.com/r/FoodPorn/random.json');
                const post = (_c = (_b = (_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.children[0]) === null || _c === void 0 ? void 0 : _c.data;
                if (!post) {
                    yield interaction.reply(`Aucune image trouvée dans le subreddit "FoodPorn".`);
                    return;
                }
                // Création de l'embed avec l'image et les informations du post
                const embed = new EmbedBuilder()
                    .setTitle(post.title)
                    .setImage(post.url)
                    .setURL(`https://www.reddit.com${post.permalink}`)
                    .setFooter({ text: `Posté par u/${post.author}` })
                    .setColor('#FF4500');
                interaction.followUp({ embeds: [embed] });
            }
            catch (error) {
                console.error('Erreur lors de la récupération de l\'image du subreddit :', error);
                interaction.followUp('Une erreur est survenue lors de la récupération de l\'image du subreddit.');
            }
        }
    })
};
