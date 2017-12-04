const {execFile} = require('child_process');
const { GAME_FOLDER } = require("../appsettings.json");
// GAME_FOLDER
// dom5 --tcpclient 70.36.184.129 --port 9876 
module.exports.get_version = () => {
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
module.exports.new_game = (game_name) => {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', `Dominions5.exe --newgame ${game_name} --mapfile random_map.map`], {
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
module.exports.get_ping = () => {
    return 'pong';
}