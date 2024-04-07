describe('UImage 测试用例', () => {
  const consoleHandler = jest.fn((msg) => msg.text());
  beforeAll(async () => {
    await page.on('console', consoleHandler);
    await page.goto('http://localhost:6060/#/组件库列表/UImage');
    await page.waitForSelector('div[data-testid="preview-wrapper"]');
  });

  it('图片正常渲染', async () => {
    const style = await page.$eval('div > .content > div > div:nth-child(1) > div', (e) => e.getAttribute('style'));
    expect(style).toContain(
      'background-image: url("https://y.qq.com/music/common/upload/t_cm3_photo_publish/1969717.jpg?r=1579098322725")',
    );
  });

  it('加载失败兜底', async () => {
    const colorList = [
      {
        selector: 'div > .content > div > div:nth-child(2) > div',
        style: '', // todo
      },
    ];
    for (let i = 0; i < colorList.length; i++) {
      const colorStyle = await page.$eval(colorList[i].selector, (e) => e.getAttribute('style'));
      expect(colorStyle).toContain(colorList[i].style);
    }
  });
});
