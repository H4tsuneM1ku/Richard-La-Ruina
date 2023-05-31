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
import * as cheerio from "cheerio";
export default {
    data: new SlashCommandBuilder()
        .setName("changelog")
        .setDescription("Récupère les dernières modifications apportées à Richard La Ruina."),
    run: (client, interaction) => __awaiter(void 0, void 0, void 0, function* () {
        let githubReleasesData = yield axios.get("https://github.com/H4tsuneM1ku/Richard-La-Ruina/releases");
        githubReleasesData = cheerio.load(githubReleasesData.data);
        const latestRelease = githubReleasesData("#repo-content-pjax-container > div > div:nth-child(3) > section:nth-child(1) > div > div.col-md-9 > div > div.Box-body > div.markdown-body.my-3").text().trim();
        ;
        let githubCommitData = yield axios.get("https://github.com/H4tsuneM1ku/Richard-La-Ruina/commit/main");
        githubCommitData = cheerio.load(githubCommitData.data);
        const latestCommit = githubCommitData("#repo-content-pjax-container > div > div.commit.full-commit.mt-0.px-2.pt-2 > div.commit-title.markdown-title").text().trim();
        ;
        const embed = new EmbedBuilder()
            .setColor("Random")
            .setTitle("Aller sur GitHub")
            .setURL("https://github.com/H4tsuneM1ku/Richard-La-Ruina")
            .addFields({ name: "Recent Commits", value: latestCommit, inline: false }, { name: "Recent releases", value: latestRelease, inline: false })
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
        interaction.followUp({ embeds: [embed] });
    }),
};
