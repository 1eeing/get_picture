const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const defaultConf = require('./config/default');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const regMap = require('./helper/regMap');
const { validate, leftCount, imgMin } = require('./helper/tinify');

class ImgMin {
    constructor(conf) {
        this.conf = Object.assign({}, defaultConf, conf);
        // this.imgs = 0;
    }

    async isDir(filePath) {
        try {
            const stats = await stat(filePath);
            if(stats.isDirectory()){
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    }

    async findImg(filePath) {
        try {
            const isDirectory = await this.isDir(filePath);
            if(!isDirectory){
                return;
            }
            const files = await readdir(filePath);
            for(let file of files){
                // 这里不能用forEach，只能用for循环
                // 加上await，则是一张张异步压缩图片，如果中间出错，则部分成功
                // 不加await，则是同步发起压缩图片请求，异步写入，如果中间出错，则全部失败
                // 这里为了压缩更快，采用同步写法

                // await this.getImg(file);
                const fullPath = path.join(filePath, file);
                this.getImg(fullPath);
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getImg(file) {
        const stats = await stat(file);
        // 如果是文件夹，则递归调用findImg
        if(stats.isDirectory()){
            this.findImg();
        }else if(stats.isFile()){
            if(regMap.isTinyPic.test(file)){
                // this.imgs ++;
                const left = leftCount();
                // 剩余数判断，解决同步时剩余数不足导致的全部图片压缩失败问题
                if(left <= 0){
                    console.log(chalk.red(`当前key的可用剩余数不足！${file} 压缩失败！`));
                    return;
                }
                await imgMin(file);
            }else{
                console.log(chalk.red(`不支持的文件格式 ${file}`));
            }
        }
    }

    async start() {
        try {
            const isValidated = await validate(this.conf.key);
            if(!isValidated){
                return;
            }
            const filePath = this.conf.imgMinPath;
            await this.findImg(filePath);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = ImgMin;