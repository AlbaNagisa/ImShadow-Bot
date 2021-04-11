const { rouge } = require("../../couleurs");
const { MessageEmbed } = require("discord.js");
const moment = require("moment");
module.exports = async (client, channel) => {
  function type(chan) {
    if (chan === "text") return "Texte";
    if (chan === "voice") return "Vocale";
    if (chan === "news") return "Annonce";
  }
  console.log(channel);

  const fetchGuildAuditLogs = await channel.guild.fetchAuditLogs({
    limit: 1,
    type: "CHANNEL_DELETE",
  });
  const lastChannelDeleted = fetchGuildAuditLogs.entries.first();
  console.log(lastChannelDeleted);
  const { executor } = lastChannelDeleted;
  const embed = new MessageEmbed()

    .setColor(rouge)
    .setTitle(`Un salon vient d'être supprimer`)
    .setAuthor(executor.tag, executor.displayAvatarURL())
    .setThumbnail(executor.displayAvatarURL({ dynamic: true }))
    .addField("Nom :", channel.name, true)
    .addField("Type :", type(channel.type), true)
    .addField(
      `Créer le :`,
      moment(channel.createdAt)
        .locale("fr")
        .format("dddd Do MMMM  YYYY, HH:mm:ss"),
      true
    )
    .addField(`NSFW :`, channel.nsfw ? "Oui" : "Non", true)
    .setTimestamp();

  if (channel.parent) {
    embed.addField("Categorie :", channel.parent.name, true);
  }
  if (channel.topic) {
    embed.addField("Topic :", channel.topic);
  }
  await client.guilds.cache
    .get(channel.guild.id)
    .channels.cache.get("830018869614870538")
    .send(embed);
};
