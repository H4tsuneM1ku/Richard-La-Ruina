import chalk from "chalk";
import client from "../../index.js";

client.on("ready", (client) => {
  console.log(chalk.green.bold(`[PRÊT] ${client.user.tag} est en ligne et prêt à l'emploi !`));
  console.log(chalk.green.bold(`[PRÊT] ${client.guilds.cache.size} serveurs, ${client.users.cache.size} membres`));

  const activities = [
    `Actif sur ${client.guilds.cache.size} serveurs`,
    `Utilisé par ${client.users.cache.size} utilisateurs`,
    "❓ /help",
    "🧾 Traite diverses commandes",
    "🎧 Écoute de la musique",
    "⚠️ Vérification des erreurs",
    "🤔 Réflexion sur les fonctionnalités à ajouter",
    "👀 Vérification de l'historique des commandes",
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * activities.length);
    client.user.setActivity(activities[index]);
  }, 3000)
});
