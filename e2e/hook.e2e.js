
const BASE_URL = `http://localhost:${process.env.PORT || 9001}/hooks`;

describe('hook关于dome的e2e测试', () => {

  it('it hook', async () => {
    console.log('hook-e2e-test:start it ing...');
    await page.goto(BASE_URL);    // 到指定的路径
    // 等待元素准备就绪
    await page.waitForSelector('.ant-btn', {
      timeout: 5000,
    });

    // 点击事件，注意前后顺序
    await page.click('div .ant-btn');
    await page.screenshot({ path: 'hook-e2e-test-click1-after.png' });
    await page.click('div .ant-btn');
    await page.screenshot({ path: 'hook-e2e-test-click2-after.png' });
    // await page.click('div .ant-btn', { clickCount : 3 }); // 设置点击次数
    // 找到目标节点，使用css3选择器，并获取元素的内容
    const text = await page.$eval('div>div>p:nth-of-type(2)', el => el.textContent)
    console.log('text:',text)

    // 返回页面的完整 html 代码，包括 doctype。
    page.content().then((xx)=>{
      console.log(xx)
    })
    

    // 比较结果是否达到预期
    expect(text).toContain(`You clicked 2 times`);

    // 截图确认结果
    await page.screenshot({ path: 'hook-e2e-test.png' }); 
  });
});