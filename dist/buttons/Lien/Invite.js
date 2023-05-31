import { ButtonBuilder, ButtonStyle } from "discord.js";
export default {
    data: new ButtonBuilder()
        .setLabel("Inviter")
        .setEmoji("✉️")
        .setStyle(ButtonStyle.Link)
        .setURL("https://discord.com/api/oauth2/authorize?client_id=650784920473698305&permissions=1085824953584&scope=bot%20applications.commands")
};
