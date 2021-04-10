const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  const fban = message.guild.fetchBan(args[0]);
  console.log(fban);
  const embed = new MessageEmbed();
  fban
    .then((m) => {
      message.guild.members.unban(m.user.id);
      console.log(m);
      embed.setTitle(`Débannissement de ${m.user.username}`);
      embed.setThumbnail(
        `https://cdn.discordapp.com/avatars/${m.user.id}/${m.user.avatar}.png`
      );
      embed.addField(`Moderateur :`, message.author.tag);
      embed.setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
      if (m.reason) {
        embed.setDescription(`Il avait été banni pour : \`${m.reason}\``);
      } else {
        embed.setDescription(`Aucune raison n'avait été spécifié`);
      }
      message.channel.send(embed);
    })
    .catch((err) =>
      message.channel.send(
        `Une erreur c'est produite : \`${err.code} : ${err.message} \``
      )
    );
};

module.exports.help = {
  name: "unban",
  categorie: "🚫 ㆍ Moderation",
};
