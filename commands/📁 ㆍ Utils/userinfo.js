const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const { vert } = require("../../couleurs");

module.exports.run = (client, message, args) => {
  function doia(of) {
    if (of === "online") return "En ligne";
    if (of === "idle") return "Absent";
    if (of === "dnd") return "Ne pas déranger";
    if (of === "offline") return "Déconnecter";
  }
  const user = message.mentions.members.first();
  const bot = user ? user.user.bot : message.author.bot;
  const tamere = user
    ? user.presence.activities
    : message.author.presence.activities;
  const embed = new MessageEmbed()
    .setTitle(
      `Information de ${user ? user.user.username : message.author.username}`
    )
    .setThumbnail(
      user
        ? user.user.displayAvatarURL({ dynamic: true })
        : message.author.avatarURL({ dynamic: true })
    )
    .setColor(vert)
    .addField(
      `Pseudo:`,
      user ? user.user.username : message.author.username,
      true
    )
    .addField(
      `Pseudo sur ce serveur:`,
      user ? user.displayName : message.member.displayName,
      true
    )
    .addField(`ID`, user ? user.id : message.member.id, true)
    .addField(
      `Status de ${user ? user.user.username : message.author.username}`,
      user ? doia(user.presence.status) : doia(message.member.presence.status),
      true
    )
    .addField(
      `A créé son compte le:`,
      user
        ? moment(user.user.createdAt)
            .locale("fr")
            .format("dddd Do MMMM  YYYY, HH:mm:ss")
        : moment(message.author.createdAt)
            .locale("fr")
            .format("dddd Do MMMM  YYYY, HH:mm:ss"),
      true
    )
    .addField(
      `A rejoint le serveur le:`,
      user
        ? moment(user.joinedAt)
            .locale("fr")
            .format("dddd Do MMMM  YYYY, HH:mm:ss")
        : moment(message.member.joinedAt)
            .locale("fr")
            .format("dddd Do MMMM  YYYY, HH:mm:ss"),
      true
    )
    .addField(`Bot:`, bot ? "Oui" : "Non", true)
    .addField(
      `Roles de ${user ? user.user.username : message.author.username}:`,
      user
        ? user.roles.cache.map((r) => r).join(", ")
        : message.member.roles.cache.map((r) => r).join(", ")
    );

  message.channel.send(embed);
};

module.exports.help = {
  name: "userinfo",
  categorie: "📁 ㆍ Utils",
};
