const { Client, Collection } = require("discord.js");
const client = new Client();
const { loadCommands, loadEvents } = require("./utils/loaders");
const { config } = require("./config");
["commands", "cooldowns"].forEach((x) => (client[x] = new Collection()));

loadCommands(client);
loadEvents(client);

client.login(config.token);
