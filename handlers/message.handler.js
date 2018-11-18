const types = require('../actions/types');
const { getPing, newGame, getVersion } = require('../actions/gameActions');
const { writeFile, exists } = require('../actions/hostActions');
const { fetchFile } = require('../actions/webActions');
const { HOST } = require("../appsettings.json");

// PM  message.author.send(message.content)
function sendMessage(client, message) {
    client.author.send(message);
}

function commandParse(content) {
    let args = content.trim().split(/\s+/);
    let command = args.shift();
    return { command, args };
}

function notValidLen(len) {
    return (len <= 0 || len >= 2);
}
// create_game
async function messageHandler(message){
    let action;
    const { command, args } = commandParse(message.content); 
    switch (command) {
        case types.PING:
            action = await getPing();
            break;
        case types.CREATE:
            action = await newGame(args);
            break;
        case types.VERSION:
            action = await getVersion();
            break;
        default:
            action = 'Bad Programmer Error';
            return;
      }
    return action;
}

// Sudo, unfinished function, will be reduced once new features need hanlding 
async function dominionsHandler(message) {
    let action;
    const gameName = message.content;
    const author = message.author.username;
    const gamePath = `${HOST.APP_DATA}\\${gameName}`;

    // This is from the current manager
    if(author == HOST.MANAGER_NAME)
        return;

    if (!exists(gamePath)) {
        action = `Game: ${gameName}, not found`;
        return action;
    }

    if(notValidLen(message.attachments.length)) {
        action = 'Current rules are you must attach one file';
        return action;
    }

    const attachment = message.attachments.first();
    const filename = attachment.filename; 

    const file = await fetchFile(attachment.url);
    const sucess = await writeFile(`${gamePath}\\${filename}`, file); 

    if (!sucess)
        action = `Game: ${gameName}, not found`;
    else 
        action = `Thank you ${author}. Your turn file has been received for game: ${gameName}`;
    // channel.send(game.status)
    return action;
}

module.exports = async (message) => {
    let action;
    switch (message.channel.type) {
        case types.DM:
            action = await messageHandler(message); 
            break;
        case types.TEXT:
            action = await messageHandler(message); 
            break; 
      }
      sendMessage(message, action)
}


