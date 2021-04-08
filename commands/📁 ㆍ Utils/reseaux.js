const { MessageEmbed } = require("discord.js");
const { turquoise } = require("../../couleurs");

module.exports.run = (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle("Les réseaux de imShadow 💻")
    .setColor(turquoise)
    .setDescription(
      "[Clique ici pour son Twitch ! 🎮](https://twitch.tv/imshadowytb)\n[Clique ici pour son Twitter ! 🐦](https://twitter.com/imshadowytb)\n[Clique ici pour son Youtube ! 🎥](https://youtube.com/imshadowonyt)\n[Clique ici pour son Instagram ! 📸](https://instagram.com/imshadowytb)"
    )
    .setFooter(
      "Shadow's BotㆍCreate by Alban & imShadow",
      "https://i.imgur.com/fa2Iapn.png"
    );

  message.channel.send(embed);
};

module.exports.help = {
  name: "reseaux",
  categorie: "📁 ㆍ Utils",
};
