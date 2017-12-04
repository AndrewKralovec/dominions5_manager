
const cheerio = require('cheerio');
function isReady(players){
    for (i = 0; i < players.length; i++) {
        if(players[i].includes('Waiting')) {
            return false; 
        } 
    }
    return true; 
}
function getTurn(content){
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
module.exports = (data) => {
    const $ = cheerio.load(data);
    var tbody = format($('tbody').text());     
    var text = tbody.data; 
    if(!isReady(text)) {
        const game = $('b').text();
        const turn = getTurn($('font').contents()); 
        return `\n--------------------\nTesting Interval\n${game}\n${turn.toString()}`; 
    }else{
        return false;
    }
}

