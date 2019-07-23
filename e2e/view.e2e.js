
import puppeteer from "puppeteer";

describe('关于是否为黑盒-不可见测试-百度搜索', () => {
  it('view it', async () => {
    console.log('view e2e-baidu-search start...');
    
    const browser = await puppeteer.launch({
      headless: false,  // 关闭无头模式，即可启动完整版的浏览器
      slowMo: 1000,   // 减慢操作的速度,方便观察
    });

    const page = await browser.newPage();
    await page.goto("https://baidu.com/");

    // 捕获控制台的输出
    page.on('console', msg => console.log('PAGE LOG:', msg.text())); 

    await page.waitForSelector('#kw', {
      timeout: 4000,
    });

    await page.type("#kw", "海贼王"); // 输入要搜索的关键词
    await page.click('#su');

    // 如果是相对路径，则从当前路径解析(项目在设备上的地址如：E:\umi\umi-test\e2e\screenshot)
    await page.screenshot({ path: './e2e/screenshot/baidu-search.png', fullPage: true });
    // await browser.close();
    // 可以用page.isClosed()来检测Puppeteer中的页面是否已关闭：
  },90000);   // 这只测试用例的中止时长默认5000
});