const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
  const fetchGuildAuditLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_REMOVE",
  });
  const lastMemberBanRemove = fetchGuildAuditLogs.entries.first();

  const { executor, reason } = lastMemberBanRemove;

  const embed = new MessageEmbed()
    .setAuthor(executor.tag, executor.displayAvatarURL({ dynamic: true }))
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle(`${user.tag} c'est fait débannir`);

  embed.addField(
    `Raison du bannissement:`,
    reason ? reason : `Aucune raison n'a été donnée lors de son bannissement`
  );

  embed.setTimestamp();

  guild.channels.cache.get("830018869614870538").send(embed);
};
