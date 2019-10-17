const config = require('../config/default');
const tinypngKeys = require('../config/tinypngKeys');

// 搜索图片
exports.startQuestions = [
  {
    type: 'input',
    name: 'keyword',
    message: 'What pictures do yo want to get ?',
    validate: function (keyword) {
      const done = this.async();
      if (keyword === '') {
        done('Please enter the keyword to get pictures');
        return;
      }
      done(null, true);
    }
  }
];

// 确认清除
exports.confirmClean = [
  {
    type: 'confirm',
    name: 'isRemove',
    message: `Do you want to remove all pictures in ${config.outputPath} ?`,
    default: true,
  }
];

// 选择tinypng的key
exports.choseKey = [
  {
    type: 'list',
    name: 'tinypngKey',
    message: "Chose your tinypng's key or entry a new key by gp p -k [key].",
    choices: tinypngKeys,
  }
]
