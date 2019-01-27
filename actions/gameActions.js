const { execFile } = require('child_process')
const { HOST } = require("../appsettings.json")
const { DOMINIONS } = require("./types")

const fileOptions = {
    'cwd': HOST.GAME_FOLDER
}

const execDominions5 = (command) => {
    return new Promise((resolve, reject) => {
        try {
            execFile('cmd.exe', ['/c', command], fileOptions, (error, stdout) => {
                if (error)
                    reject(error)
                resolve(stdout)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.getVersion = () => execDominions5(`./${DOMINIONS} --version`)

/*
 * need players in a game folder for this to run
 * https://steamcommunity.com/app/722060/discussions/0/1489992713690759682/
 * http://www.illwinter.com/dom5/techmanual.html
 */
module.exports.newGame = (name, map, era) => execDominions5(`./${DOMINIONS} --newgame ${name} --mapfile ${map} --era ${era} -T`)
module.exports.processTurn = (game) => execDominions5(`./${DOMINIONS} ${game} --host`)
module.exports.getPing = () => 'pong'
