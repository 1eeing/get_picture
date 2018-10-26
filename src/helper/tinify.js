const fs = require('fs');
const tinify = require('tinify');
const chalk = require('chalk');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);

function setKey(key) {
    tinify.key = key;
}

async function validate(key) {
    console.log(chalk.green('正在认证tinyPng的key...'));
    setKey(key);
    return new Promise(resolve => {
        tinify.validate((err) => {
            if(err){
                console.log(err);
                return resolve(false);
            }
            console.log(chalk.green('认证成功！'));
            const left = leftCount();
            if(left <= 0){
                console.log(chalk.red('当前key的剩余可用数已用尽，请更换key重试！'));
                return resolve(false);
            }
            console.log(chalk.green(`当前key剩余可用数为 ${left}`));
            resolve(true);
        });
    });
};

function compressionCount() {
    return tinify.compressionCount;
};

function leftCount() {
    const total = 500;
    return total - Number(compressionCount());
};

function writeFilePromise(file, content, cb) {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, content, (err) => {
            if(err){
                return reject(err);
            }
            cb && cb();
            resolve();
        });
    });
};

function toBufferPromise(sourceData) {
    return new Promise((resolve, reject) => {
        tinify.fromBuffer(sourceData).toBuffer(function(err, resultData) {
            if (err) {
                return reject(err);
            }
            resolve(resultData);
        })
    });
};

async function imgMin(img) {
    try {
        console.log(chalk.blue(`开始压缩图片 ${img}`));
        const sourceData = await readFile(img);
        const resultData = await toBufferPromise(sourceData);
        await writeFilePromise(img, resultData, () => console.log(chalk.green(`图片压缩成功 ${img}`)));
    } catch (error) {
        console.log(error);
    }
};

module.exports = { validate, compressionCount, leftCount, imgMin };