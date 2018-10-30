const fectch = require('isomorphic-fetch');
const types = require('../actions/types');
const gamesActions = require('../actions/gameActions');
const { writeFile, exists } = require('../actions/hostActions');
const { fetchFile } = require('../actions/webActions');
const { HOST } = require("../appsettings.json");

// PM  message.author.send(message.content)

function sendMessage(client, message) {
    client.author.send(message);
}

async function messageHandler(message, action = 'Bad Programmer Error'){
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
        default:
            return;
      }
    sendMessage(message, action); 
}

async function dominionsHandler(message, action = 'Turn file has been received') {
    // Sudo, unfinished function, will be reduced once new features need hanlding 
    const gameName = message.content;
    const author = message.author.username;

    // This is from the current manager
    if(author == HOST.MANAGER_NAME)
        return;

    const len = message.attachments.length;

    if(len <= 0 || len >= 2) {
        sendMessage(message, 'Current rules are you must attach one file'); 
        return;
    }
    const path = `${HOST.APP_DATA}\\${gameName}`;
    const valid = exists(path);

    if (!valid) 
        throw new Error("Game not found");

    const attachment = message.attachments.first();
    const filename = attachment.filename; 

    const file = await fetchFile(attachment.url);
    const sucess = await writeFile(`${path}\\${filename}`, file); 

    if (!sucess)
        throw new Error("Could not write file");

    sendMessage(message, action);
}

module.exports = (message) => {
    switch (message.channel.type) {
        case types.DM:
            dominionsHandler(message); 
            break;
        case types.TEXT:
            messageHandler(message); 
            break; 
      }
}


