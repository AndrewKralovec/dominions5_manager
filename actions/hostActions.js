const fs = require('fs')
const path = require('path')
module.exports.mkDir = function(path){
    return new Promise((resolve, reject) => {
        try {
            fs.mkdir(path,() => {
                resolve();            
            }) 
        } catch (error) {
            reject(error);
        }
    });
}; 
module.exports.submitTurn = function(name){
    return new Promise((resolve, reject) => {
        try {
            fs.mkdir(path,() => {
                resolve();            
            }) 
        } catch (error) {
            reject(error);
        }
    });
}; 
module.exports.writeFile = function(name, content){
    return new Promise((resolve, reject) => {
        try {
            fs.writeFile(name, content, 'utf8', function (err) {
                if (err) {
                    throw err; 
                }
                resolve("The file was saved!");
            });
        } catch (error) {
            reject(error);
        }
    });
}; 
