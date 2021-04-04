module.exports = async (client) => {
  client.user.setPresence({
    activity: {
      name: "Yunomi",
      type: "STREAMING",
      url: "https://twitch.tv/Alban9562",
    },
  });
};
