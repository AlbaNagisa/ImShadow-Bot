const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  const user = await message.mentions.users.first();
  if (!user) return message.reply(`Tu dois mentionner un utilisateur`);
  const mem = await message.guild.members.cache.get(user.id);
  const memberToUpdate = await client.getUser(mem);

  if (!args[0])
    return message.reply(
      "Il est impossible d'enlever l'avertissement d'un membre sans donner l'id de l'avertissement"
    );
  if (!memberToUpdate) {
    return message.reply(
      `L'utilisateur n'éxiste pas dans la base de donnée contacte un administrateur immédiatement !!`
    );
  }
  args.shift();
  const pos = args[0];
  if (!pos)
    return message.reply(`Tu n'as pas préciser l'id du warn à supprimer`);
  if (mem) {
    var warns = memberToUpdate.warns;
    const r = warns[pos];
    warns.splice(pos, 1);
    await client.updateUser(mem, { warns: warns });
    console.log(warns);
    message.reply(
      `L'avertissement avec pour ID : **${pos}** et pour raison : **${r}** a été retiré`
    );
    const embed = new MessageEmbed()
      .setTitle(`Avertissement retiré`)
      .setDescription(
        `Ton avertissement ID : **${pos}** Raison : **${r}** a été retiré par **${message.author.tag}**`
      )
      .setFooter(`Tu as ${warns.length} avertissement !`)
      .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
    mem.send(embed);
  } else {
    message.channel.send(
      `Cet utilisateur n'existe pas ou n'est pas dans le serveur`
    );
  }
};

module.exports.help = {
  name: "unwarn",
  categorie: "🚫 ㆍ Moderation",
};
