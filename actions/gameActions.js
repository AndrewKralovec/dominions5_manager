const { execFile } = require('child_process');
const { HOST } = require("../appsettings.json");
const { DOMINIONS } = require("./types");

function execDominions5(command) {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', command], {
                cwd: HOST.GAME_FOLDER
            }, (error, stdout, stderr) => {
                if (error) {
                    throw error;
                }
                resolve(stdout);
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports.getVersion = () => execDominions5(`./${DOMINIONS} --version`); 
module.exports.newGame = (name, map, era) => execDominions5(`./${DOMINIONS} --newgame ${name} --mapfile ${map} --era ${era} -T`);
module.exports.processTurn = (game) => execDominions5(`./${DOMINIONS} ${game} --host`);
module.exports.getPing = () => 'pong'; 


//C:\Users\Owner\AppData\Roaming\Dominions5\savedgames

// C:\\Users\\Owner\\AppData\\Roaming\\Dominions5\\savedgames\\