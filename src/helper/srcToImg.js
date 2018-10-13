const http = require('http');
const https = require('https');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');
const writeFile = promisify(fs.writeFile);
const regMap = require('./regMap');

const urlToImg = promisify((url, dir) => {
    let mod;
    if(regMap.isHttp.test(url)){
        mod = http;
    }else if(regMap.isHttps.test(url)){
        mod = https;
    }
    const ext = path.extname(url);
    const file = path.join(dir, `${Date.now()}${ext}`);

    mod.get(url, res => {
        res.pipe(fs.createWriteStream(file)).on('finish', () => {
            console.log(file);
        });
    });
});

const base64ToImg = async (base64Str, dir) => {
    const matchs = base64Str.match(regMap.isBase64);
    try {
        const ext = matchs[1].split('/')[1].replace('jpeg', 'jpg');
        const file = path.join(dir, `${Date.now()}.${ext}`);

        await writeFile(file, matchs[2], 'base64');
        console.log(file);
    } catch (error) {
        console.log(chalk.red('无法识别的图片'));
    }
};

module.exports = (src, dir) => {
    if(regMap.isPic.test(src)){
        urlToImg(src, dir);
    }else{
        base64ToImg(src, dir);
    }
};