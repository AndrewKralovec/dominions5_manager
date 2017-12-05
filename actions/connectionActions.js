
const {CHANNEL_ID} = require("../appsettings.json");
module.exports = function(client){
    return new Promise((resolve, reject) => {
        try {
            client.channels.forEach(channel => {
                if(channel.id == CHANNEL_ID){
                    resolve(channel);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}