const fectch = require('isomorphic-fetch');
const types = require('../actions/actionTypes');
const gamesActions = require('../actions/gameActions');
const hostActions = require('../actions/hostActions');


// PM  message.author.send(message.content)
// message.channel.type
async function messageHandler(message, action = null){
    switch (message.content) {
        case types.PING:
            action = await gamesActions.getPing();
            break;
        case types.CREATE:
            action = await gamesActions.newGame()
            break;
        case types.VERSION:
            action = await gamesActions.getVersion()
            break;
        default :
            return;
      }
      message.author.send(action) 
}
function dominionsHandler(message){
    // Sudo, unfinished function
    const game_name = message.content;
    const author = message.author.username;
    message.attachments.forEach((attachment) => {
        fetch(attachment.url)
        .then(data => data.text())            
        .then(data => {
            return hostActions.writeFile(game_name, data)
        }).then(data => {
            console.log(data); 
        }) 
        .catch(error => {
            throw (error);
        });
    });
}
module.exports = (message, action = null) => {
    switch (message.channel.type) {
        case types.DM:
            dominionsHandler(message); 
            break;
        case types.TEXT:
            messageHandler(message); 
            break; 
      }
}


