describe('Mask 测试用例', () => {
  const consoleHandler = jest.fn((msg) => msg.text());
  beforeAll(async () => {
    await page.on('console', consoleHandler);
    await page.goto('http://localhost:6060/#/组件库列表/Mask');
    await page.waitForSelector('div[data-testid="Mask-container"]');
  });

  it('点击触发 onClose 事件', async () => {
    await page.click('div > .content > div > div > div:nth-child(1)');
    expect(consoleHandler.mock.results.slice(-1)[0].value).toEqual('===onClose===');
  });

  it('设置蒙层样式', async () => {
    const style = await page.$eval('div > .content > div > div', (e) => e.getAttribute('style'));
    expect(style).toContain('height: 450px;');
  });
});
