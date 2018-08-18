const cheerio = require('cheerio');
// const fectch = require('isomorphic-fetch');

function isReady(players){
    let i;
    for (i = 0; i < players.length; i++) {
        if(players[i].includes('Waiting')) {
            return false; 
        } 
    }
    return true; 
}
function getTurn(content){
    let i;
    for (i = 0; i < content.length; i++) {
        if(content[i].type == 'text') {
            if(content[i].data.includes('Turn')) {
                return content[i].data; 
            } 
        } 
    }
    return 'Bad Programmer Error'; 
}
function format(text){
    return {
        data: text.split("\n"), 
        toString: function(){
            return text; 
        }
    }
}
module.exports.parseText = function(data){
    return new Promise((resolve, reject) => {
        try {
            const $ = cheerio.load(data);
            const tbody = format($('tbody').text());     
            const text = tbody.data; 
            const game = $('b').text();
            const turn = getTurn($('font').contents()); 
            resolve({
                isReady:isReady(text),
                status:`Testing Interval\n${game}\n${turn.toString()}`
            });        
        } catch (error) {
            reject(error);
        }
    });
}
module.exports.fetchImage = function(data){
    return new Promise((resolve, reject) => {
        try {
             
        } catch (error) {
            reject(error);
        }
    });
}