const types = require('../actions/types')
const { getPing, newGame, getVersion } = require('../actions/gameActions')

const commandParse = (content) => {
    let args = content.trim().split(/\s+/)
    let command = args.shift()
    return { args, command }
}

module.exports = async(message) => {
    let action
    const { args, command } = commandParse(message.content) 
    switch (command) {
        case types.PING:
            action = await getPing()
            break
        case types.CREATE:
            action = await newGame(args)
            break
        case types.VERSION:
            action = await getVersion()
            break
        default:
            action = 'Command not found'
            break
      }
    return action
}
