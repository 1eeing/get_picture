const config = require('../config/default');

exports.startQuestions = [
    {
        type: 'input',
        name: 'keyword',
        message: 'What pictures do yo want to get ?',
        validate: function(keyword) {
            const done = this.async();
            if(keyword === ''){
                done('Please enter the keyword to get pictures');
                return;
            }
            done(null, true);
        }
    }
];

exports.confirmClean = [
    {
        type: 'confirm',
        name: 'isRemove',
        message: `Do you want to remove all pictures in ${config.outputPath} ?`,
        default: true,
    }
];