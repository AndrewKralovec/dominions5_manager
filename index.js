const Discord = require("discord.js");
const fectch = require('isomorphic-fetch');
const settings = require("./appsettings.json");
const messageReducer = require('./reducers/messageReducer');
const statusReducer = require('./reducers/statusReducer');
const connect = require('./actions/connectionActions');
const client = new Discord.Client();

function getGameStatus(channel){
    settings.games.forEach((game) => {
        fetch(`${settings.url}${game}`)
        .then(data => data.text())
        .then(data => {
            const message = statusReducer(data); 
            if(message){
                channel.send(message)
            }
        }).catch(error => {
            throw (error);
        });
    })
}
client.on('ready', () => {
    client.user.setUsername(settings.manager_name)
    .then(data => { 
        console.log(`Logged in as ${data.client.user.tag}!`);
        return connect(data.client)
    })
    .then(channel => {
        setInterval(() => {
            getGameStatus(channel); 
        }, settings.interval);
    }).catch(error => {
        console.log(error); 
        process.exit();    
    });
});
client.on('message', (message) => {
    messageReducer(message); 
});
client.login(settings.token);

        