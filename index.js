const Discord = require("discord.js");
const fectch = require('isomorphic-fetch');
const settings = require("./appsettings.json");
const messageReducer = require('./reducers/messageReducer');
const statusReducer = require('./reducers/statusReducer');
const connect = require('./actions/connectionActions');
const client = new Discord.Client();
function getGameStatus(channel){
    return () => {
        settings.GAMES.forEach(async (game) => {
            fetch(`${settings.URL}${game}`)
            .then(data => data.text())
            .then(data => {
                statusReducer(data, channel); 
            }).catch(error => {
                throw (error);
            });
        });
    };
}
client.on('ready', async () => {
    // await client.user.setUsername(settings.MANAGER_NAME)
    console.log(`Logged in as ${client.user.tag}!`);    
    const channel = await connect(client); 
    setInterval(getGameStatus(channel), settings.INTERVAL);
});
client.on('message', (message) => {
    messageReducer(message); 
});
client.login(settings.TOKEN);

        