module.exports.run = async (client, message, args, settings) => {
  function clean(text) {
    if (typeof text === 'string') {
      return text
        .replace(/`/g, '`' + String.fromCharCode(8203))
        .replace(/@/g, '@' + String.fromCharCode(8203))
    }
    return text
  }

  const code = args.join(' ')
  if (!code) return false
  try {
    if (message.author.id !== '363636421803769867')
      return message.reply("Bas non ducoup tu n'es pas un de mes devs x)")
    const evaled = eval(code)
    const cleanCode = await clean(evaled)
    message.channel
      .send(cleanCode, { code: 'js' })
      .catch((e) => message.channel.send(e, { code: 'js' }))
  } catch (error) {
    message.channel.send(error, { code: 'js' })
  }
}

module.exports.help = {
  name: 'ev',
  categorie: 'dev',
}
