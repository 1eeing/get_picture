const path = require('path');

module.exports = {
    searchPath: 'http://image.baidu.com/',
    // 下载图片输出目录
    outputPath: path.join(__dirname, '../../output'),
    presentPath: process.cwd(),
    keyword: '',
    key: '',
    // 图片压缩默认输入路径
    imgMinPath: path.join(process.cwd(), './images'),
    // 图片压缩输出目录
    imgMinOutputPath: path.join(process.cwd(), './imgMinOutPut'),
};