const BASE_URL = `http://localhost:${process.env.PORT || 9001}/mock/test`;

describe('mock-test', () => {
  beforeAll(async () => {
    jest.setTimeout(1000000);
  });
  it('it should mock-test', async () => {
    await page.goto(BASE_URL);
    await page.waitForSelector('p', {
      timeout: 5000,
    });
    const text = await page.evaluate(() => document.getElementsByTagName('p')[0].innerText);
    await page.screenshot({ path: 'mock-test.png' });
    expect(text).toContain('mock');
  });
});