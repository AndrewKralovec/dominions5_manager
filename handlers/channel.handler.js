const manager = require('../events/manager.events')
const games = []
const users = new Map()

const loadMembers = (members) => {
    let member
    for (member of members.values()) {
        const { id, username } = member.user
        users.set(id, username)
    }
}

const createGame = ([name, map, era]) => {
    console.log([name, map, era])
}

module.exports = (channel) => {
    loadMembers(channel.members)
}
