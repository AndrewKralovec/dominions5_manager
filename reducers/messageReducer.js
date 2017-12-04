const types = require('../actions/actionTypes');
const gamesActions = require('../actions/gameActions');
// PM  message.author.send(message.content)
// message.channel.type
function messageReducer(message){
    switch (message.content) {
        case types.PING:
            gamesActions.get_ping();
        case types.CREATE:
            gamesActions.new_game()
            .then(data => {
                message.reply(data)
            })
            .catch(error =>  {
                throw error; 
            });
        case types.VERSION:
            gamesActions.get_version()
            .then(data => {
                message.reply(data)
            })
            .catch(error =>  {
                throw error; 
            });
      }
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
        case types.TEXT:
            messageReducer(message); 
      }
}


