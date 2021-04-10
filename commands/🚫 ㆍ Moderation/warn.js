const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args) => {
  if (!message.member.hasPermission(["ADMINISTRATOR"]))
    return message.reply("Tu ne dispose pas des permissions nécessaires");
  const user = message.mentions.members.first();

  if (!user) return message.reply(`Mentionne un utilisateur`);
  const mem = await message.guild.members.cache.get(user.id);
  const memberToUpdate = await client.getUser(mem.id);

  args.shift();
  let raison = args.join(" ");
  if (!args[0])
    return message.reply(
      "il est impossible d'avertir un membre sans lui dire pourquoi"
    );
  if (!memberToUpdate) {
    return message.reply(
      `L'utilisateur n'éxiste pas dans la base de donnée contacte un administrateur immédiatement !!`
    );
  }
  if (mem) {
    var warns = memberToUpdate.warns;
    if (warns) {
      warns.push(raison);
    } else warns = [raison];
    await client.updateUser(mem, { warns: warns });
    message.reply(`${mem} a bien pris un avertissement`);
    const embed = new MessageEmbed()
      .setTitle(`Avertissement`)
      .setDescription(
        `Tu as été avertis pour **${raison}** sur **${message.guild.name}** par **${message.author.username}**`
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
  categorie: "🚫 ㆍ Moderation",
  name: "warn",
};
