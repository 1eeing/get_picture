const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const chalk = require('chalk');
const keysPath = path.resolve(__dirname, '../config/tinypngKeys.js');
const emptyKeysPath = path.resolve(__dirname, '../config/emptyKeys.js');

readFile = promisify(fs.readFile);
writeFile = promisify(fs.writeFile);

module.exports = async function (key) {
  try {
    const oldContent = await readFile(keysPath, 'utf8');
    const emptyContent = await readFile(emptyKeysPath, 'utf8');
    const newContent = oldContent === emptyContent ? oldContent.replace('[]', `['${key}']`) : oldContent.replace(']', `,'${key}']`);
    await writeFile(keysPath, newContent);
    console.log(chalk.green("Saving tinypng's success!"));
  } catch (error) {
    console.log(chalk.red(`Some thing is wrong when you saving tinypng's key: ${error}`));
  }
}
