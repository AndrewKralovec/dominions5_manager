const types = require('../actions/actionTypes');
const gamesActions = require('../actions/gameActions');
// PM  message.author.send(message.content)
// message.channel.type
async function messageReducer(message, action = null){
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
            break; 
      }
      message.author.send(action) 
}
function dominionsReducer(message){
    const game_name = message.content;
    const author = message.author.username;
    message.attachments.forEach((attachment) => {
        attachment.value.url; 
        attachment.value.filename; 
    });
    // Upload information to Server &or game folder 
}
module.exports = (message, action = null) => {
    switch (message.channel.type) {
        case types.DM:
            dominionsReducer(message); 
            break;
        case types.TEXT:
            messageReducer(message); 
            break; 
      }
}


