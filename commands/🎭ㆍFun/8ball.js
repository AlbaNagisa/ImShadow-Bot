
const {MessageAttachment} = require('discord.js')
const client = require('nekos.life');
const neko = new client();


module.exports.run = async (client, message, args) => {
    if(!args[0]) return message.channel.send("Tu dois poser une question !")
        const image = await neko.sfw["8Ball"]({
         text: args.join(' ')
        });
        const attachment = new MessageAttachment(image.url)
        return message.channel.send({
          constent: image.response,
          files: [attachment]
        });
        

    
    
}

module.exports.help = {
name: "8ball",
categorie: "🎭ㆍFun"
}
