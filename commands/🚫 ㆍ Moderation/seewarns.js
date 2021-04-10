const { MessageEmbed } = require("discord.js");
const { bleuClair } = require("../../couleurs");

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  var member = await message.member;
  if (args[0]) {
    if (message.guild.member(message.mentions.users.first())) {
      member = await message.guild.member(message.mentions.users.first());
    } else {
      if (message.guild.members.fetch(args[0])) {
        member = await message.guild.members.fetch(args[0]);
      } else return message.reply("Membre introuvable");
    }
  }
  const user = member.user;
  const memberDB = await client.getUser(member);
  if (!memberDB) {
    return message.reply(
      `L'utilisateur n'éxiste pas dans la base de donnée contacte un administrateur immédiatement !`
    );
  }
  const embed = new MessageEmbed()

    .setAuthor(`${user.username} (${user.id})`, user.displayAvatarURL())
    .setColor(bleuClair);
  memberDB.warns.length > 0
    ? memberDB.warns.map((v, i) => {
        embed.addField(
          `Avertissement N°${i + 1}`,
          `\`\`\`ID : ${i}
Raison : ${v}\`\`\``
        );
      })
    : embed.setDescription(
        `Ce membre est parfait il n'a commis aucune infraction **Prend exemple !**`
      );
  embed.setFooter(`Nombre d'avertissement total : ${memberDB.warns.length}`);
  message.channel.send(embed);
};

module.exports.help = {
  name: "seewarn",
  categorie: "🚫 ㆍ Moderation",
};
