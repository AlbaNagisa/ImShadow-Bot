const { MessageEmbed } = require("discord.js");

module.exports = async (client, guild, user) => {
  const fetchGuildAuditLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: "MEMBER_BAN_ADD",
  });
  const lastMemberBanAdd = fetchGuildAuditLogs.entries.first();

  const { executor, reason } = lastMemberBanAdd;

  const embed = new MessageEmbed()
    .setAuthor(executor.tag, executor.displayAvatarURL({ dynamic: true }))
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .setTitle(`${user.tag} c'est fait bannir`);

  embed.addField(
    `Raison :`,
    reason ? reason : `Aucune raison n'a été donnée lors de son bannissement`
  );

  embed.setTimestamp();

  guild.channels.cache.get("830018869614870538").send(embed);
};
