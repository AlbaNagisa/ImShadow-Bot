module.exports = async (client) => {
  client.user.setPresence({ activity: { name: "Yunomi", type: "WATCHING" } });
};
