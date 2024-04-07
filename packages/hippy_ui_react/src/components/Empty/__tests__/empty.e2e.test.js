describe('Empty 测试用例', () => {
  const consoleHandler = jest.fn((msg) => msg.text());
  beforeAll(async () => {
    await page.on('console', consoleHandler);
    await page.goto('http://localhost:6060/#/组件库列表/Empty');
    await page.waitForSelector('div[data-testid="Empty-container"]');
  });

  it('点击图片应该触发 onPress 事件', async () => {
    await page.click(
      '.rsg--root-46:nth-child(2) > .rsg--preview-47:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .wrapper:nth-child(2) > .contenter:nth-child(2) .content:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
    );
    expect(consoleHandler.mock.results.slice(-1)[0].value).toEqual('onPress');
  });

  it('自定义图片应该设置成功', async () => {
    const attr = await page.$eval(
      '.rsg--root-46:nth-child(4) > .rsg--preview-47:nth-child(1) > div:nth-child(1) > div:nth-child(1) > .wrapper:nth-child(2) > .contenter:nth-child(2) .content:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)',
      (e) => e.getAttribute('style'),
    );
    expect(attr).toContain(
      'background-image: url("https://qzonestyle.gtimg.cn/aoi/sola/20200326162512_215xmdVIwm.png")',
    );
  });
});
