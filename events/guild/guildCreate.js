module.exports = (client) => {
    console.log(client.guilds.cache.map(m => m.name + ' : ' +m.id))
}