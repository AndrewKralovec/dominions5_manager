const fs = require('fs')
const fetch = require('isomorphic-fetch')

module.exports.mkDir = (path) => {
    return new Promise((resolve, reject) => {
        try {
            fs.mkdir(path, () => {
                resolve()            
            })
        } catch (error) {
            reject(error)
        }
    })
} 

module.exports.submitTurn = (name) => {
    return new Promise((resolve, reject) => {
        try {
            fs.mkdir(name, () => {
                resolve()            
            })
        } catch (error) {
            reject(error)
        }
    })
} 

module.exports.writeFile = (name, content) => {
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(name, content, 'utf8', (err) => {
                if (err) {
                    throw err 
                }
                resolve(true)
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.exists = (path) => {
    // eslint-disable-next-line no-sync
    return (fs.existsSync(path)) 
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
