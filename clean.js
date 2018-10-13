const fs = require('fs');
const path = require('path');
const regMap = require('./src/helper/regMap');
const cleanPath = path.join(__dirname, './output');

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