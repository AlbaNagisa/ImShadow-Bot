module.exports.run = async (client, message, args, settings) => {
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
    return message.reply("il faut spécifier un ***nombre*** entre 1 et 100!");

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);
};

module.exports.help = {
  name: "clear",
  categorie: "🚫 ㆍ Moderation",
};
