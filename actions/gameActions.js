const {execFile} = require('child_process');
const { GAME_FOLDER } = require("../appsettings.json");
module.exports.getVersion = () => {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', 'Dominions5.exe --version'], {
                cwd: GAME_FOLDER
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
module.exports.newGame = (name, map, era) => {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', `./Dominions5.exe --newgame ${name} --mapfile ${map} --era ${era} -T`], {
                cwd: GAME_FOLDER
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
module.exports.processTurn = (game) => {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', `./Dominions5.exe ${game} --host`], {
                cwd: GAME_FOLDER
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
module.exports.getPing = () => {
    return 'pong';
}