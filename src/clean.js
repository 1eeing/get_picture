const fs = require('fs');
const regMap = require('./helper/regMap');
const config = require('./config/default');
const cleanPath = config.outputPath;

class Clean {
    constructor() {}

    clean() {
        fs.readdir(cleanPath, (err, files) => {
            if(err){
                throw err;
            }
            files.forEach(file => {
                if(regMap.isPic.test(file)){
                    const img = `${cleanPath}/${file}`;
                    fs.unlink(img, (e) => {
                        if(e) {
                            throw e;
                        }
                    });
                }
            });
            console.log('clean finished');
        });
    }
};

module.exports = Clean;