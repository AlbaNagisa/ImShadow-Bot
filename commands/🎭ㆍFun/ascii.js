const figlet = require("figlet");

module.exports.run = (client, message, args) => {
  if (!args.join(" "))
    return message.channel.send(
      "Tu as oublié le plus important ! Le message à retranscrire."
    );

  figlet(args.join(" "), function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    message.channel.send(`\`\`\`${data}\`\`\``);
  });
};

module.exports.help = {
  name: "ascii",
  categorie: "🎭ㆍFun",
};
