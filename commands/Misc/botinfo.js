const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = (client, message, args) => {
  const clientt = client.fetchApplication();
  clientt.then((v) => {
    console.log(v);
    const embed = new MessageEmbed()
      .setTitle("Info")
      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${client.user.id}/${client.user.avatar}.png`
      )
      .addField("Nom du projet:", v.name)
      .addField(
        "Crée le :",
        moment(client.user.createdAt).locale("fr").format("dddd Do MMMM YYYY")
      )
      .addField(
        "Pub:",
        v.description || "Aucune Description n'est encore proposer"
      )
      .addField(
        `${client.user.username} est-il publique ?`,
        v.botPublic ? "Oui" : "Non"
      )
      .addField(`Développeur:`, v.owner.username + "#" + v.owner.discriminator);
    message.channel.send(embed);
  });
};
module.exports.help = {
  name: "botinfo",
  categorie: "Misc",
};
