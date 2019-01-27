const cheerio = require('cheerio')
const fetch = require('isomorphic-fetch')

const isReady = (players) => {
    let index
    for (index = 0; index < players.length; index++) {
        if (players[index].includes('Waiting')) {
            return false
        } 
    }
    return true
}

const getTurn = (content) => {
    let index
    for (index = 0; index < content.length; index++) {
        if (content[index].type == 'text') {
            if (content[index].data.includes('Turn')) {
                return content[index].data
            } 
        } 
    }
    return 'Bad Programmer Error'
}

const format = (text) => {
    return {
        'data': text.split("\n"), 
        'toString': () => text
    }
}

module.exports.parseText = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const $ = cheerio.load(data)
            const tbody = format($('tbody').text())
            const text = tbody.data
            const game = $('b').text()
            const turn = getTurn($('font').contents())
            resolve({
                'isReady': isReady(text),
                'status': `Testing Interval\n${game}\n${turn.toString()}`
            })     
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.fetchFile = (url) => {
    return new Promise((resolve, reject) => {
        try {
            fetch(url)
            .then(data => data.text())            
            .then(data => {
                resolve(data)
            })
        } catch (error) {
            reject(error)
        }
    })
}
