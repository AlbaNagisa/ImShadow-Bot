const { MessageEmbed } = require("discord.js");
const { rouge } = require("../../couleurs");

module.exports.run = (client, message, args, settings) => {
  let user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "Muted");
  if (!muteRole) {
    return message.reply(`Il n'y a pas de role mute sur ce serveur`);
  }

  if (!user.roles.cache.has(muteRole.id))
    return message.reply("l'utilisateur mentionné n'est pas muté!");
  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> n'est plus mute!`);
};

module.exports.help = {
  name: "unmute",
  categorie: "🚫 ㆍ Moderation",
};
