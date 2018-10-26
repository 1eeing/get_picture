const path = require('path');

module.exports = {
    searchPath: 'http://image.baidu.com/',
    outputPath: path.join(__dirname, '../../output'),
    presentPath: process.cwd(),
    keyword: '',
    key: '',
    imgMinPath: path.join(process.cwd(), './images')
};