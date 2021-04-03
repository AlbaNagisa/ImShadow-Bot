const prefix = "t!";

module.exports = (client, message) => {
  const args = message.content.slice(prefix.length).split(/ +/g);

  if (message.author.bot) return;

  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!message.content.startsWith(prefix)) return;
  else if (!command)
    return message.channel.send("Ce n'est pas une commande valide");

  command.run(client, message, args);
};
