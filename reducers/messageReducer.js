const types = require('../actions/actionTypes');
module.exports = (message) => {
    switch (message.content) {
        case types.PING:
          return  message.reply('Pong!');
        default:
          return null;
      }
}

