const fs = require('fs')
const path = require('path')

function readDirR(dir) {
    return fs.statSync(dir).isDirectory() ? Array.prototype.concat(...fs.readdirSync(dir).map(f => readDirR(path.join(dir, f)))) : dir
}

module.exports = server => {
    const resourcesPath = path.join(__dirname, '../../api')

    readDirR(resourcesPath)
        .filter(file => {
            return file.indexOf('-routes.js') >= 0
        })
        .forEach(file => {
            require(path.resolve(file))(server)
        })
}