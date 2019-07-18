const BASE_URL = `http://localhost:${process.env.PORT || 9001}/mock/test`;

describe('mock-test', () => {
  beforeAll(async () => {
    console.log('mock-test:beforeAll');
    jest.setTimeout(1000000);
  });
  console.log('mock-test:start it');
  it('it should mock-test', async () => {
    console.log('mock-test:start it ing...');
    await page.goto(BASE_URL);
    await page.waitForSelector('p', {
      timeout: 5000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('p')[0].innerText);
    await page.screenshot({ path: 'mock-test.png' });    // 截屏
    expect(text).toMatchSnapshot();    // 快照（判断描述及值）
    expect(text).toContain('mock');
    return console.log('mock-test:it return console.log');
  });
});