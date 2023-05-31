/*import { ChatInputCommandInteraction, EmbedBuilder, Client, SlashCommandBuilder } from 'discord.js';
import * as os from 'os';

export default {
    data: new SlashCommandBuilder()
      .setName("botinfo")
      .setDescription("Affiche les informations sur le bot.")
      .setDMPermission(false),

    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        // Récupérer les informations système
        const platform = os.platform();
        const arch = os.arch();
        const cpuModel = os.cpus()[0].model;
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const uptime = process.uptime();

        // Vérifier si la plateforme est win32 et modifier la valeur en conséquence
        const platformName = platform === 'win32' ? 'Windows' : platform;

        // Convertir la valeur de la RAM en GB ou MB en fonction de sa taille
        const totalRamValue = totalMemory > 1024 * 1024 * 1024 ? `${Math.floor(totalMemory / (1024 * 1024 * 1024))} GB` : `${Math.floor(totalMemory / (1024 * 1024))} MB`;
        // Convertir la valeur de la mémoire libre en GB ou MB en fonction de sa taille
        const freeRamValue = freeMemory > 1024 * 1024 * 1024 ? `${Math.floor(freeMemory / (1024 * 1024 * 1024))} GB` : `${Math.floor(freeMemory / (1024 * 1024))} MB`;

        // Créer l'embed
        const infoEmbed = new EmbedBuilder()
            .setTitle('Informations Système du Bot')
            .addFields(
                { name: 'Plateforme', value: platformName },
                { name: 'Architecture', value: arch },
                { name: 'CPU', value: cpuModel },
                { name: 'RAM', value: `Total: ${totalRamValue}\nLibre: ${freeRamValue}` },
                { name: 'Uptime', value: `${Math.floor(uptime / 3600)} heures ${Math.floor((uptime % 3600) / 60)} minutes ${Math.floor(uptime % 60)} secondes` }
            )
            .setColor('#00FDCC') // Modifier la couleur de l'embed
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        // Répondre avec l'embed
        interaction.followUp({ embeds: [infoEmbed] });
    }
};*/

import { ChatInputCommandInteraction, EmbedBuilder, Client, SlashCommandBuilder, version } from 'discord.js';
import * as os from 'os';

export default {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("Affiche les informations sur le bot.")
        .setDMPermission(false),

    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        // Récupérer les informations système
        const platform = os.platform();
        const arch = os.arch();
        const cpuModel = os.cpus()[0].model;
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const uptime = process.uptime();

                // Vérifier si la plateforme est win32 et modifier la valeur en conséquence
                const platformName = platform === 'win32' ? 'Windows' : platform;

        // Convertir la taille de RAM en GB si supérieure à 1024MB, sinon en MB
        const ramSize = totalMemory > 1024 * 1024 * 1024 ? `${Math.floor(totalMemory / (1024 * 1024 * 1024))} GB` : `${Math.floor(totalMemory / (1024 * 1024))} MB`;
        const freeRamSize = freeMemory > 1024 * 1024 * 1024 ? `${Math.floor(freeMemory / (1024 * 1024 * 1024))} GB` : `${Math.floor(freeMemory / (1024 * 1024))} MB`;

        // Récupérer le nombre d'utilisateurs en ligne sur les serveurs où le bot a rejoint
        const servers = client.guilds.cache;
        let totalOnlineUsers = 0;
        servers.forEach(server => {
            server.members.cache.forEach(member => {
                if (member.presence && member.presence.status !== 'offline') {
                    totalOnlineUsers++;
                }
            });
        });

        // Créer l'embed
        const infoEmbed = new EmbedBuilder()
            .setTitle('Informations Système du Bot')
            .addFields(
                { name: "🖥️ Système d'exploitation", value: `${os.type()} ${os.version()} ${os.release()} ${arch} bits`, inline: true },
                //{ name: '🖥️ Architecture', value: arch, inline: true },
                { name: '⚡ CPU', value: cpuModel, inline: true },
                { name: '💾 Mémoire', value: `Total: ${ramSize}\nLibre: ${freeRamSize}`, inline: true },
                { name: '⏲️ Uptime', value: `${Math.floor(uptime / 3600)} heures ${Math.floor((uptime % 3600) / 60)} minutes ${Math.floor(uptime % 60)} secondes`, inline: true },
                { name: "📂 Version de node.js", value: `${process.version}`, inline: true },
                { name: "📂 Version de discord.js", value: `${version}`, inline: true },
                { name: '🍆 Taille du sexe', value: `${totalOnlineUsers} centimètres`, inline: true }
            )
            .setColor('#00FDCC')
            .setTimestamp()
            .setFooter({ text: `Demandé par ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });

        // Répondre avec l'embed
        interaction.followUp({ embeds: [infoEmbed] });
    }
};