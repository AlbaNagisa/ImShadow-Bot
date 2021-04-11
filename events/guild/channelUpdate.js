const { MessageEmbed } = require("discord.js");
const { jauneorange } = require("../../couleurs");

module.exports = async (client, oldChannel, newChannel) => {
  function info(inf) {
    if (inf === null) return "Aucune information";
    if (inf !== null) return inf;
  }
  function type(chan) {
    if (chan === "text") return "Texte";
    if (chan === "voice") return "Vocale";
    if (chan === "news") return "Annonce";
  }
  const fetchGuildAuditLogs = await oldChannel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_UPDATE",
  });
  const lastChannelUpdated = fetchGuildAuditLogs.entries.first();

  const { executor } = lastChannelUpdated;

  const embed = new MessageEmbed()
    .setColor(jauneorange)
    .setAuthor(executor.username, executor.displayAvatarURL())
    .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
    .setTitle(`Le salon ${oldChannel.name} vient d'être modifier`);
  if (oldChannel.name !== newChannel.name) {
    embed.addField("Nom :", oldChannel.name + " => " + newChannel.name, true);
  }
  if (oldChannel.type !== newChannel.type) {
    embed.addField(
      "Type :",
      type(oldChannel.type) + " => " + type(newChannel.type),
      true
    );
  }
  if (oldChannel.rawPosition !== newChannel.rawPosition) {
    embed.addField(
      "Position",
      oldChannel.rawPosition + " => " + newChannel.rawPosition,
      true
    );
  }
  if (oldChannel.nsfw !== newChannel.nsfw) {
    embed.addField(
      `NSFW :`,
      `${oldChannel.nsfw ? "Oui" : "Non"} => ${
        newChannel.nsfw ? "Oui" : "Non"
      }`,
      true
    );
  }
  embed.setTimestamp();

  if (oldChannel.parent !== newChannel.parent) {
    embed.addField(
      "Categorie :",
      `
     ${
       oldChannel.parent
         ? info(oldChannel.parent.name)
         : info(oldChannel.parent)
     }  => ${
        newChannel.parent
          ? info(newChannel.parent.name)
          : info(oldChannel.parent)
      }`,
      true
    );
  }
  if (info(oldChannel.topic) !== info(newChannel.topic)) {
    embed.addField(
      `Topic`,
      info(oldChannel.topic) + " => " + info(newChannel.topic)
    );
  }
  client.guilds.cache
    .get(oldChannel.guild.id)
    .channels.cache.get("830018869614870538")
    .send(embed);
};
