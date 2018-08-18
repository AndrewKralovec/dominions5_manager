const {execFile} = require('child_process');
const { HOST } = require("../appsettings.json");

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

module.exports.getVersion = () => execDominions5('Dominions5.exe --version'); 
module.exports.newGame = (name, map, era) => execDominions5(`./Dominions5.exe --newgame ${name} --mapfile ${map} --era ${era} -T`);
module.exports.processTurn = (game) => execDominions5(`./Dominions5.exe ${game} --host`);
module.exports.getPing = () => 'pong'; 