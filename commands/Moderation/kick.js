module.exports.run = (client, message, args) => {
  if (message.member.hasPermission(["ADMINISTRATOR"])) {
    const memb = message.mentions.members.first();
    if (memb) {
      args.shift();
      if (memb.kickable) {
        if (!args[0])
          return message.reply(
            `Il faut donner une raison à l'exclusion de ce membre`
          );
        memb.kick(args.join(" "));
        message.reply(
          `${
            memb.user.username
          } a bien été exclu du serveur avec pour raison : \`${args.join(
            " "
          )}\``
        );
      } else {
        message.reply(`Ce membre ne peut être exclu du serveur`);
      }
    } else
      return message.reply(
        `La personne que tu essaie de mentionner n'est pas valide`
      );
  } else {
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  }
};

module.exports.help = {
  name: "kick",
  categorie: "Moderation",
};
