const { loadCommands } = require('../../utils/loaders')
module.exports.run = (client, message, args, settings) => {
  if (message.author.id != '363636421803769867')
    return message.reply("Bas non ducoup tu n'es pas un de mes devs x)")
  loadCommands(client, `${process.cwd()}/commands`)
  message.channel.send(`Mes ${client.commands.size} commandes ont redémarré`)
}

module.exports.help = {
  name: 'cmd',
  categorie: 'dev',
}
