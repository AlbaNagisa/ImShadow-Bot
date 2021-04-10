module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  const memb = message.mentions.members.first();
  if (memb) {
    args.shift();
    if (memb.bannable) {
      if (!args[0])
        return message.reply(
          `Il faut donner une raison au bannissement de ce membre`
        );

      memb.ban({ reason: args.join(" ") });
      message.reply(
        `${
          memb.user.username
        } a bien été banni du serveur avec pour raison : \`${args.join(" ")}\``
      );
    } else {
      message.reply(`Ce membre ne peut être banni du serveur`);
    }
  } else
    return message.reply(
      `La personne que tu essaie de mentionner n'est pas valide`
    );
};

module.exports.help = {
  name: "ban",
  categorie: "🚫 ㆍ Moderation",
};
