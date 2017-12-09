# dominions5_manager
Dominions5 Discord Bot for managing and automating Dominions5 Games. Currenlty the dominions5_manager application starts a discord bot to monitor your games being hosted on http://www.llamaserver.net. The creation and mangment of game servers is still being developed.

## App Setup
You must have node version v7.6.0 or higher. The await & async functions have been added to help clean up promise purgatory. 
 * git clone https://github.com/AndrewKralovec/dominions5_manager
 * change appsettings.json to fit your app Dominions 5 and Discord Bot settings
 * npm install
 * node index.js 

## Notes
The application is all the files as a whole that you download. The manger is `Index.js`, its the entry point of the application. The Bot is the discord client. 

## API

#### appsettings.json

This is where Dominions 5 and Discord Bot settings held. You can add any settings you want your Bot to use. 

appsettings.json
```
{
    "CHANNEL_ID": "",
    "GAME_FOLDER": "D:\\Games\\Dominions5\\Dominions5",
    "GAMES":[
    ], 
    "INTERVAL":"3600000",     
    "LOGGING": "true",
    "MANAGER_NAME":"Dominions5_Manager", 
    "TOKEN":"",
    "URL":"http://www.llamaserver.net/gameinfo.cgi?game="
}
```
 * channel_id key is the Discord Bot ID. This is **required** for this manager to work. 
 * game_folder key is the location of your Dominions5 executable file. 
 * games key is an array of games that the manager will check on an interval to determine game status. This is **required** for this manager to work. 
 * interval key is the amount of time the manager will wait until it checks the game status. The value is meant to be in milliseconds, but this can be configured any way you wish. This is **required** for this manager to work. 
 * logging key tells the manager if it needs to log out app data 
 * manager_name key is a string value you wish to name your discord bot.  **For Now** this is **required** for this manager to work. You can remove the setUsername function from the index.js file and the name of your manager will be what you set it up to be in the discord developer interface. 
 * token key is the Discord Bot token. The token is used for Bot authentication. This is **required** for this manager to work. 
 * url key is the url to the llamaserver (the server that hosts Dominions 5 game information. 

#### index.js

This is the entry point of the app. `Index.js` loads the application settings, reducer and action functions. First index try's to connect to your server channel.  If index is able to connect, it does executes to main functions (**For Now**). The fist function is an interval function. This function checks the game status located on the llamaserver. The interval function gets the list of games from the games key set in the `appsettings.json` file, as well as the amount of time to wait from the interval key value. 
```
... 
.then(channel => {
    setInterval(() => {
        getGameStatus(channel); 
    }, settings.INTERVAL);
})
```
The second function is the `messageReducer` function. This function is used to determine the messages sent to the bot.
```
const messageReducer = require('./reducers/messageReducer');
...
client.on('message', (message) => {
    messageReducer(message); 
});
```
**For Now** direct messages are used only for turn files. When the Bot gets the users turn file(2h file), it will add the turn file to the bin directory until all players are ready for the game to be processed. Messages in the channel will be ignored, unless they start with the `$` special characters. If a message in the channel starts with the `$` special characters, the Bot will interpret this as a command and will try to process the command you are trying to specify. **For Now** the message commands are set in the `actionTypes.js` file. You can edit/add any custom commands in this folder. 
```
...
module.exports.VERSION = '$version';
module.exports.CREATE = '$create_game';
module.exports.PR = '$process_turn';
module.exports.GAME_STATUS = '$game_status';
module.exports.GENERATE_MAP = '$generate_map';
```

### App Directory  
You'll notice two naming conventions, reducers & actions. These are **not** meant to be confused with reducers & actions found in React Redux. 

#### Actions 
Folder for actions functions. Actions are,... are meant to generate actions. All of the game processing logic will be found in these files. The Manager does this by executing Dominions5.exe file as a new process. Since a shell is not spawned, behaviors such as I/O redirection and file globbing are not supported.

#### Bin 
**For now** is basically a misc Folder.

#### DB 
Folder for sqlite (though any can be set here), database files. **For now** You shouldnt have to worry about loosing game data. The manager doesn't keep track of games or players, it interprets input and executes actions. 

#### Reducers 
Folder for Reducer functions. Reducers are to interpret input and determine what the corresponding action should be. I came up with the name because they reduce the line numbers in index.js (originally everything was set in index.js). 


## Packages 
 * cheerio, for parsing the web service web pages. 
 * discord.js, for creating and managing the Discord Bot. 
 * isomorphic-fetch, for fetching outside resources.  

## Dominions 5 command line options

This [document](http://www.illwinter.com/dom5/techmanual.html#network-options) contains information on the command line options available for Dominions 5 as well as commands to control a network server without using the GUI. If you just want to play Dominions 5, you do not need to read this document.
