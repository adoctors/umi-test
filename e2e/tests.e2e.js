import puppeteer from 'puppeteer';


describe('puppeteer test', () => {
  const fun = async () => {
    puppeteer.launch().then(async browser => {
      const page = await browser.newPage();
      await page.goto('https://y.qq.com');
      // 屏幕截图
      await page.screenshot({ path: 'yqq.png' });
      // 其他操作...
      await browser.close();
    });
  };

  it('puppeteer test fn it', fun);
});
