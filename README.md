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
    "client_id": "",
    "games":[

    ], 
    "interval":"",     
    "logging": "false",
    "manager_name":"", 
    "token":"",
    "url":"http://www.llamaserver.net/gameinfo.cgi?game="
}
```
 * client_id key is the Discord Bot ID. This is **required** for this manager to work. 
 * games key is an array of games that the manager will check on an interval to determine game status. This is **required** for this manager to work. 
 * interval key is the amount of time the manager will wait until it checks the game status. The value is ment to be in miliseconds, but this can be configed any way you wish. This is **required** for this manager to work. 
 * logging key tells the manager if it needs to log out app data 
 * token key is the Discord Bot token. The token is used for Bot authentication. This is **required** for this manager to work. 
 * url key is the url to the llamaserver (the server that hosts Dominions 5 game information. 






