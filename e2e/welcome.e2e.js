const BASE_URL = `http://localhost:${process.env.PORT || 9001}`;

describe('welcome', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should have demo/自定义组件/测试', async () => {
    await page.goto(BASE_URL);
    await page.waitForSelector('p', {
      timeout: 5000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('p')[0].innerText);
    await page.screenshot({ path: 'welcome.png' });

    // 语句：expect(text).toContain('demo/自定义组件/测试2');
    // 结果：
    // expect(received).toContain(expected) // indexOf
    // Expected substring: "demo/自定义组件/测试2"
    // Received string:    "demo/自定义组件/测试"

    expect(text).toContain('demo/自定义组件/测试');
  });
});