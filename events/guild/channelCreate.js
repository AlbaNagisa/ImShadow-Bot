const { MessageEmbed } = require("discord.js");
const { vert } = require("../../couleurs");

module.exports = async (client, channel) => {
  function type(chan) {
    if (chan === "text") return "Texte";
    if (chan === "voice") return "Vocale";
    if (chan === "news") return "Annonce";
  }
  const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_CREATE",
  });
  const lastChannelCreated = fetchGuildAuditLogs.entries.first();
  console.log(channel.type);
  const { executor } = lastChannelCreated;

  const embed = new MessageEmbed()
    .setColor(vert)
    .setAuthor(executor.tag, executor.displayAvatarURL())
    .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
    .setTitle(`Un salon vient d'être créer`)
    .addField("Nom :", channel.name, true)

    .addField("Type :", type(channel.type), true)

    .addField("Position", channel.rawPosition, true)
    .addField(`NSFW :`, channel.nsfw ? "Oui" : "Non", true)
    .setTimestamp();
  if (channel.parent) {
    embed.addField("Categorie :", channel.parent.name, true);
  }
  if (channel.topic) {
    embed.addField(`Topic`, channel.topic);
  }

  await client.guilds.cache
    .get(channel.guild.id)
    .channels.cache.get("830018869614870538")
    .send(embed);
};
