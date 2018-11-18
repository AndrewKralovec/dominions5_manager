const fectch = require('isomorphic-fetch');
const { parseText } = require("../actions/webActions");
module.exports =  function(channel, settings) {
    if(!settings.WEBSCAN)
        return;

    setInterval(() => {
        settings.GAMES.forEach(async (game) => {
            fetch(`${settings.URL}${game}`)
            .then(data => data.text())
            .then(data => parseText(data))
            .then(game => {
                if(game.isReady)
                    channel.send(game.status);
            }).catch(error => {
                throw (error);
            });
        });
    }, settings.INTERVAL);
}

