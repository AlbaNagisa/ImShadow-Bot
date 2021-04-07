const prefix = "t!";

module.exports = async (client, message) => {
  const args = message.content.slice(prefix.length).split(/ +/g);
  const dbUser = await client.getUser(message.author);
  if (message.author.bot) return;
  if (!dbUser)
    await client.createUser({
      userID: message.member.id,
      username: message.member.user.tag,
      warns: [],
    });
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if (!message.content.startsWith(prefix)) return;
  else if (!command)
    return message.channel.send("Ce n'est pas une commande valide");

  command.run(client, message, args);
};
