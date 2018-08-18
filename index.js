const Discord = require("discord.js");
const settings = require("./appsettings.json");
const messageHandler = require('./handlers/messageHandler');
const webHandler = require('./handlers/webHandler');
const connect = require('./actions/connectionActions');
const client = new Discord.Client();
client.on('ready', async () => {
    // await client.user.setUsername(settings.MANAGER_NAME)
    console.log(`Logged in as ${client.user.tag}!`);
    const channel = await connect(client);
    // When manager is ready, start the webHandler
    webHandler(channel, settings); 
});
client.on('message', (message) => {
    messageHandler(message); 
});
client.login(settings.TOKEN);

        