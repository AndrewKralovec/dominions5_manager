# dominions5_manager
Dominions5 Discord Bot for managing and automating Dominions5 Games

## App Setup
Dominions5 Discord Bot for managing and automating Dominions5 Games


 * git clone https://github.com/AndrewKralovec/dominions5_manager
 * change appsettings.json to fit your app Dominions 5 and Discord Bot settings
 * npm install
 * node index.js 

## API

#### appsettings.json

This is where Dominions 5 and Discord Bot settings held. You can add any settings you want your BOT to use. 

appsettings.json
```
{
    "CLIENT_ID": "",
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
 * client_id key is the Discord Bot ID. This is **required** for this manager to work. 
 * game_folder key is the location of your Dominions5 executable file. 
 * games key is an array of games that the manager will check on an interval to determine game status. This is **required** for this manager to work. 
 * interval key is the amount of time the manager will wait until it checks the game status. The value is meant to be in milliseconds, but this can be configured any way you wish. This is **required** for this manager to work. 
 * logging key tells the manager if it needs to log out app data 
 * manager_name key is a string value you wish to name your discord bot.  **For Now** this is **required** for this manager to work. You can remove the setUsername function from the index.js file and the name of your manager will be what you set it up to be in the discord developer interface. 
 * token key is the Discord Bot token. The token is used for Bot authentication. This is **required** for this manager to work. 
 * url key is the url to the llamaserver (the server that hosts Dominions 5 game information. 

#### index.js

This is the entry point of the app. `Index.js` loads the application settings, reducer and action functions. First index try's to connect to your server channel.  If index is able to connect, it does executes to main functions (**For Now**). The fist function is an interval function. This function checks the game status located on the llamaserver. The interval function gets the list of games from the games key set in the `appsettings.json` file, as well as the amount of time to wait from the interval key value. The second function is the `messageReducer` function. This function is used to determine the messages sent to the bot. **For Now** direct messages are used only for turn files. When the gets the turn file from a user it will add the turn file to the store until all players are ready for the turn to be processed. Messages in the channel will be ignored, unless they start with the `$` special characters. If a message in the channel starts with the `$` special characters, the bot will interpret this as a command and will try to process the command you are trying to specify 

#### Reducers 
To be filled out later 
#### Actions 
To be filled out later 

## Packages 
 * cheerio, for parsing the web service web pages. 
 * discord.js, for creating and managing the Discord Bot. 
 * isomorphic-fetch, for fetching outside resources.  

## Dominions 5 command line options

This [document](http://www.illwinter.com/dom5/techmanual.html#network-options) contains information on the command line options available for Dominions 5 as well as commands to control a network server without using the GUI. If you just want to play Dominions 5, you do not need to read this document.




