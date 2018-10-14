const puppeteer = require('puppeteer');
const chalk = require('chalk');
const config = require('./config/default');
const srcToImg = require('./helper/srcToImg');

class App {
    constructor(conf) {
        this.conf = Object.assign({}, config, conf);
    }

    async start () {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
    
        //打开搜索引擎，先写死百度
        await page.goto(this.conf.searchPath);
        console.log(chalk.green(`go to ${this.conf.searchPath}`));
    
        //设置窗口大小，过大会引起反爬虫
        await page.setViewport({
            width: 1920,
            height: 700
        });
    
        //搜索文字输入框聚焦
        await page.focus('#kw');
    
        //输入要搜索的关键字
        await page.keyboard.sendCharacter(this.conf.keyword);
    
        //点击搜索
        await page.click('.s_search');
        console.log(chalk.green(`get start searching pictures`));
    
        //页面加载后要做的事
        page.on('load', async () => {
            console.log(chalk.green(`searching pictures done, start fetch...`));
            //获取所有指定图片的src
            const srcs = await page.$$eval('img.main_img', pictures => {
                return pictures.map(img => img.src);
            });
            console.log(chalk.green(`get ${srcs.length} pictures, start download`));
    
            srcs.forEach(async (src) => {
                await page.waitFor(200);
                await srcToImg(src, this.conf.outputPath);
            });
        });
    }
};

module.exports = App;