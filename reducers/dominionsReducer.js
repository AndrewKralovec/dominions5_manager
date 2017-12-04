const types = require('../actions/actionTypes');
const types = require('../actions/gameActions');
module.exports = (message) => {
    switch (message.content) {
        case types.PING:
            return  message.reply('Pong!');
        default:
            return null;
      }
}