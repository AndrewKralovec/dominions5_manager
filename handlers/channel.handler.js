const manager = require('../events/manager.events');
const games = [];
const users = new Map();

function loadMembers(members){
    let member;
    for (member of members.values()) {
        const { id, username } = member.user;
        users.set(id, username);
    }
}

function createGame([name, map, era]) {
    
    console.log(data);
}

module.exports =  function(channel) {
    loadMembers(channel.members);

    manager.on('CREATE_GAME', createGame); 
    
    manager.on('ALERT_PLAYERS', (arg) => {
        console.log('status', arg);
    }); 
};