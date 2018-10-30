const Discord = require("discord.js");
const clientHandler = require('./handlers/client.handler');
const client = new Discord.Client();
clientHandler(client);

        