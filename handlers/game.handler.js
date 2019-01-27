const { writeFile, exists, fetchFile } = require('../functions/host.functions')
const { HOST } = require("../appsettings.json")

const notValidLen = (len) => {
    return (len <= 0 || len >= 2)
}

module.exports = async (message) => {
    let action
    const gameName = message.content
    const author = message.author.username
    const gamePath = `${HOST.APP_DATA}\\${gameName}`

    // This is from the current manager
    if (author == HOST.MANAGER_NAME)
        return

    if (!exists(gamePath))
        return `Game: ${gameName}, not found`

    if (notValidLen(message.attachments.length))
        return 'Current rules are you must attach one file'

    const attachment = message.attachments.first()
    const filename = attachment.filename 

    const file = await fetchFile(attachment.url)
    const success = await writeFile(`${gamePath}\\${filename}`, file)
    
    if (!success)
        action = `Game: ${gameName}, not found`
    else 
        action = `Thank you ${author}. Your turn file has been received for game: ${gameName}`
    // channel.send(game.status)
    return action
}
