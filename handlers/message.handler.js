const types = require('../actions/types')
// const gameHandler = require('./game.handler')
const dominionsHandler = require('./dominions.handler')

// PM  message.author.send(message.content)
const sendMessage = (client, message) => {
    client.author.send(message)
}

module.exports = async (message) => {
    let action
    switch (message.channel.type) {
        case types.DM:
            action = await dominionsHandler(message) 
            break
        case types.TEXT:
            action = await dominionsHandler(message) 
            break 
      }
      sendMessage(message, action)
}
