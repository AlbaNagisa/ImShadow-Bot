const { MessageEmbed } = require("discord.js");
const parseDuration = require("parse-duration"),
  humanizeDuration = require("humanize-duration");
const { rouge } = require("../../couleurs");

module.exports.run = (client, message, args) => {
  let dure = null;
  if (message.member.hasPermission(["ADMINISTRATOR"])) {
    const memb = message.mentions.members.first();
    if (memb) {
      args.shift();
      if (memb.bannable) {
        if (!args[0])
          return message.reply(
            `Il faut donner une durée au bannissement de ce membre`
          );
        if (!args[1])
          return message.reply(
            `Il faut donner une raison au bannissement de ce membre`
          );
        console.log(args);
        dure = args[0];
        args.shift();
        const duration = parseDuration(dure);
        if (!duration) return message.reply(`Veuillez saisir une durée valide`);
        memb.ban({ reason: args.join(" ") });
        message.reply(
          `${
            memb.user.username
          } a bien été banni du serveur avec pour raison : \`${args.join(
            " "
          )} \`Durant : \`${humanizeDuration(duration, {
            language: "fr",
          })}\``
        );
        setTimeout(() => {
          message.guild.members.unban(memb);
          const embed = new MessageEmbed()
            .setTitle(`Débannissement de ${memb.user.username}`)
            .setThumbnail(
              `https://cdn.discordapp.com/avatars/${memb.user.id}/${memb.user.avatar}.png`
            )
            .setColor(rouge)
            .setDescription(
              `La raison du débannissement est dù à la fin de la sanction`
            )
            .addField(`Cause de la sanction : `, args.join(" "))
            .addField(
              `Durée de la sanction : `,
              humanizeDuration(duration, { language: "fr" })
            );
          message.channel.send(embed);
        }, duration);
      } else {
        message.reply(`Ce membre ne peut être banni du serveur`);
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
  name: "tempban",
  categorie: "Moderation",
};
