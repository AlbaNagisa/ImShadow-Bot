const { MessageEmbed } = require("discord.js");
const { Client } = require("twitchrequest");
const { config } = require("../../config");
const { violet } = require("../../couleurs");
module.exports.run = (client, message, args) => {
  message.delete;
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  if (!args[0])
    return message.reply(`Il me faut le salon ou je devrai envoyer l'alerte`);
  const channel = message.mentions.channels.first();
  const twitch = new Client({
    channels: ["imshadowytb"],

    client_id: config.twitch_id,

    client_secret: config.twitch_secret,

    interval: 60,
  });

  twitch.on("live", (data) => {
    const embed = new MessageEmbed()
      .setTitle(`${data.name} est en live !`)
      .setURL(`https://twitch.tv/imshadowytb`)
      .setColor(violet)
      .addField("Titre :", data.title)
      .addField("Viwers :", data.viewers)
      .setThumbnail(data.profile);
    channel.send(embed);
    console.log(data);
  });
};

module.exports.help = {
  name: "twitch",
  categorie: "Dev",
};
