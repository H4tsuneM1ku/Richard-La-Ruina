var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mysql from "mysql";
import chalk from "chalk";
import client from "../../index.js";
import ERROR from "../../handler/ERROR.js";
const connection = mysql.createConnection({
    host: `${process.env.MYSQL_HOST}`,
    user: "root",
    password: `${process.env.MYSQL_PASSWORD}`,
    database: "dhalmel-database",
});
client.on("interactionCreate", (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (!interaction.isChatInputCommand() || !interaction.inCachedGuild())
        return;
    const command = client.commands.get(interaction.commandName);
    yield interaction.deferReply();
    if (!command)
        return ERROR.INVALID_INTERACTION(interaction);
    /*
    if (command.permission && command.permission.length > 0) {
      if (!interaction.guild.members.me?.permissions.has(command.permission)) {
        const permissionList = new PermissionsBitField(command.permission).toArray()
        return ERROR.BOT_HAVE_NO_PERMISSION(interaction, permissionList);
      }
    }
    */
    connection.query(`SELECT * FROM ban WHERE ID=${interaction.user.id}`, function (error, result) {
        try {
            if (result[0].ban == 1) {
                return ERROR.YOU_HAVE_BEEN_BANNED(interaction);
            }
        }
        catch (error) {
            command.run(client, interaction);
            console.log(chalk.white(`[COMMAND] ${interaction.guild.name}(${interaction.guild.id}) - ${interaction.user.tag}(${interaction.user.id}) a exécuté ${interaction.commandName}`));
        }
    });
}));
