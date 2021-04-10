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
    .setTitle(`Un salon vient d'être modifier`)
    .addField("Nom :", oldChannel.name + " => " + newChannel.name, true)

    .addField("Type :", type(oldChannel.type) + " => " + newChannel.type, true)

    .addField(
      "Position",
      oldChannel.rawPosition + " => " + newChannel.rawPosition,
      true
    )
    .addField(
      `NSFW :`,
      oldChannel.nsfw
        ? "Oui"
        : "Non" + " => " + newChannel.nsfw
        ? "Oui"
        : "Non",
      true
    )
    .setTimestamp();
  embed.addField(
    "Categorie :",
    oldChannel.parent.name + " => " + newChannel.parent.name,
    true
  );
  embed.addField(
    `Topic`,
    info(oldChannel.topic) + " => " + info(newChannel.topic)
  );

  client.guilds.cache
    .get(oldChannel.guild.id)
    .channels.cache.get("830018869614870538")
    .send(embed);
};
