const program = require('commander');
const inquirer = require('inquirer');
const pkg = require('../package.json');
const qs = require('./helper/questions');
const App = require('./app');
const Clean = require('./clean');

program
    .version(pkg.version, '-v, --version');

program
    .command('search')
    .alias('s')
    .description('get search pictures what you want.')
    .action(async () => {
        const answers = await inquirer.prompt(qs.startQuestions);
        const app = new App(answers);
        await app.start();
    });

program
    .command('clean')
    .alias('c')
    .description('clean all pictures in directory "output".')
    .action(async () => {
        const answers = await inquirer.prompt(qs.confirmClean);
        const clean = new Clean();
        answers.isRemove && await clean.clean();
    });

program
    .command('*')
    .description('not supposed commander.')
    .action(() => program.help());
    
program.parse(process.argv);

if(process.argv.length < 3){
    program.help();
}