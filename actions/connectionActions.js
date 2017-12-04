
const {client_id} = require("../appsettings.json");
module.exports = function(client){
    return new Promise((resolve, reject) => {
        try {
            client.channels.forEach(channel => {
                if(channel.id == client_id){
                    resolve(channel);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
