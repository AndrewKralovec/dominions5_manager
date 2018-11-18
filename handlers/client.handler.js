const settings = require("../appsettings.json");
const messageHandler = require('./message.handler');
const webHandler = require('./web.handler');
const channelHandler = require('./channel.handler');
// const manager = require('../events/manager.events');
const connect = require('../actions/connectionActions');


module.exports =  function(client) {
    client.on('ready', async () => {
        // await client.user.setUsername(settings.MANAGER_NAME)
        console.log(`Logged in as ${client.user.tag}!`);
        const channel = await connect(client);
        // When manager is ready, start the webHandler
        channelHandler(channel);
        webHandler(channel, settings); 
    });
    client.on('message', (message) => messageHandler(message));
    client.login(settings.TOKEN);
    client.on('error', (error) => {
        console.log(error); 
    });
}

        