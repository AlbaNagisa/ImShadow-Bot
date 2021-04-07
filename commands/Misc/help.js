const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { bleuClair } = require("../../couleurs");

const categoryList = readdirSync("./commands");

module.exports.run = (client, message, args) => {
  if (!args.length) {
    const embed = new MessageEmbed().setColor(bleuClair).setThumbnail(
      message.author.displayAvatarURL({
        format: "png" || "gif",
        dynamic: true,
      })
    );
    for (const cate of categoryList) {
      if (cate != "Dev")
        embed.addField(
          `${cate} (${
            client.commands.filter(
              (cat) => cat.help.categorie.toLowerCase() === cate.toLowerCase()
            ).size
          })`,
          `\`${client.commands
            .filter(
              (cat) => cat.help.categorie.toLowerCase() === cate.toLowerCase()
            )
            .map((v) => v.help.name)
            .join("`, `")}\``
        );
    }

    message.channel.send(embed);
  } else {
    return;
  }
};

module.exports.help = {
  name: "help",
  categorie: "Misc",
};
