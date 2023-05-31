import { Client, ChatInputCommandInteraction, ButtonBuilder, ButtonStyle } from "discord.js";
import MusicQueue from "../../commands/Musique/playlist.js";

export default {
  data: new ButtonBuilder()
    .setCustomId("MusicQueueButton")
   .setLabel("Liste de lecture")
   .setEmoji("📄")
    .setStyle(ButtonStyle.Secondary),

run: async (client: Client, interaction: ChatInputCommandInteraction) => {
MusicQueue.run(client, interaction);
}
};
