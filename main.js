const { Client, Collection } = require("discord.js");
const client = new Client();
const { loadCommands, loadEvents } = require("./utils/loaders");
const { config } = require("./config");

require("./utils/function")(client);

client.mongoose = require("./utils/mongoose");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);
client.mongoose.init();

client.login(config.token);
