const { MessageEmbed } = require("discord.js");
const { Client } = require("twitchrequest");
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

    // Your client ID
    client_id: "7a85c1rx52uynt3z2btlrdzjejxudb",

    // Your client secret
    client_secret: "9qen0jnxbrppnundhteq04g28ba5gz",

    // The interval it will check (in seconds)
    interval: 3,
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
