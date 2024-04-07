describe('Button 测试用例', () => {
  const dialogHandler = jest.fn((dialog) => dialog.accept());
  const consoleHandler = jest.fn((msg) => msg.text());
  beforeAll(async () => {
    await page.on('console', consoleHandler);
    await page.on('dialog', dialogHandler);
    await page.goto('http://localhost:6060/#/组件库列表/Button');
    await page.waitForSelector('div[data-testid="Button-container"]');
  });

  it('普通点击应该触发 onPress 事件', async () => {
    await page.click('div[accessibilitylabel="普通点击 按钮"]');
    expect(consoleHandler.mock.results.slice(-1)[0].value).toEqual('===normal===');
  });

  it('节流点击应该只触发一次 onPress 事件', async () => {
    await page.click('div[accessibilitylabel="开启节流 按钮"]');
    await page.click('div[accessibilitylabel="开启节流 按钮"]');
    await page.click('div[accessibilitylabel="开启节流 按钮"]');
    expect(consoleHandler.mock.results.slice(-2)[0].value).not.toEqual('===throttle1===');
    expect(consoleHandler.mock.results.slice(-1)[0].value).toEqual('===throttle1===');
  });

  it('防抖点击应该只触发一次 onPress 事件', async () => {
    await page.click('div[accessibilitylabel="开启防抖 按钮"]');
    await page.click('div[accessibilitylabel="开启防抖 按钮"]');
    await page.click('div[accessibilitylabel="开启防抖 按钮"]');
    await page.click('div[accessibilitylabel="开启防抖 按钮"]');
    await page.click('div[accessibilitylabel="开启防抖 按钮"]');
    expect(consoleHandler.mock.results.slice(-2)[0].value).not.toMatch('===debounce1===');
    expect(consoleHandler.mock.results.slice(-1)[0].value).toEqual('===debounce1===');
  });

  it('禁止点击按钮应该触发 onDisablePress 事件', async () => {
    await page.click('div[accessibilitylabel="禁止点击：Button.type.default 按钮"]');
    expect(dialogHandler).toHaveBeenCalled();
  });

  it('前置图标按钮应该正确渲染', async () => {
    const b1 = await page.$('div[accessibilitylabel="合唱 按钮"] div[src]');
    const b2 = await page.$('div[accessibilitylabel="唱歌 按钮"] div[src]');
    const b3 = await page.$('div[accessibilitylabel="S 按钮"] div[src]');
    const b4 = await page.$('div[accessibilitylabel="M 按钮"] div[src]');
    const b5 = await page.$('div[accessibilitylabel="B 按钮"] div[src]');
    const b6 = await page.$('div[accessibilitylabel="H 按钮"] div[src]');
    await expect(b1).not.toBeNull();
    await expect(b2).not.toBeNull();
    await expect(b3).not.toBeNull();
    await expect(b4).not.toBeNull();
    await expect(b5).not.toBeNull();
    await expect(b6).not.toBeNull();
  });

  it('自定义样式按钮应该正确渲染', async () => {
    const attr = await page.$eval('div[accessibilitylabel="自定义文字style 按钮"]', (e) => e.getAttribute('style'));
    expect(attr).toContain('background-color: rgb(255, 51, 153)');
    expect(attr).toContain('color: rgb(0, 255, 0)');
  });

  it('自定义样式按钮应该透传 color', async () => {
    const attr = await page.$eval('div[accessibilitylabel="自定义文字style 按钮"] div', (e) => e.getAttribute('style'));
    expect(attr).toContain('color: rgb(0, 255, 0)');
  });

  it('自定义样式按钮应该覆盖宽度', async () => {
    const attr = await page.$eval('div[accessibilitylabel="宽度 按钮"]', (e) => e.getAttribute('style'));
    expect(attr).toContain('min-width: 45px');
    expect(attr).toContain('padding: 0px');
  });

  it('不同尺寸按钮应该正确渲染', async () => {
    let attr = await page.$eval('div[accessibilitylabel="尺寸-S-24：Button.size.small 按钮"]', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('border-radius: 24px');
    expect(attr).toContain('height: 24px');
    expect(attr).toContain('padding: 0px 16px');
    expect(attr).toContain('min-width: 52px');

    attr = await page.$eval('div[accessibilitylabel="尺寸-M-32：Button.size.medium 按钮"]', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('border-radius: 32px');
    expect(attr).toContain('height: 32px');
    expect(attr).toContain('padding: 0px 20px');
    expect(attr).toContain('min-width: 64px');

    attr = await page.$eval('div[accessibilitylabel="尺寸-B-36：Button.size.big 按钮"]', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('border-radius: 36px');
    expect(attr).toContain('height: 36px');
    expect(attr).toContain('padding: 0px 32px');

    attr = await page.$eval('div[accessibilitylabel="尺寸-H-40：Button.size.huge 按钮"]', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('border-radius: 40px');
    expect(attr).toContain('height: 40px');
    expect(attr).toContain('padding: 0px 32px');
  });

  it('Circle 按钮应该正确渲染', async () => {
    const attr = await page.$eval('div[data-testid="Button-example-11"] div[class="content"] div div', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('width: 32px');
    expect(attr).toContain('height: 32px');
    expect(attr).toContain('border-radius: 32px');
  });

  it('Round 设置圆角按钮应该正确渲染', async () => {
    let attr = await page.$eval('div[accessibilitylabel="按钮 按钮"]', (e) => e.getAttribute('style'));
    expect(attr).not.toContain('border-radius: 32px');

    attr = await page.$eval('div[accessibilitylabel="K歌 按钮"]', (e) => e.getAttribute('style'));
    expect(attr).toContain('border-radius: 32px');

    attr = await page.$eval('div[accessibilitylabel="自定义 按钮"]', (e) => e.getAttribute('style'));
    expect(attr).toContain('border-radius: 10px');
  });

  it('Badge 按钮应该正确渲染', async () => {
    const vip = await page.$('div[src="http://qzonestyle.gtimg.cn/aoi/sola/20200221170128_ZR0A9LvMVN.png"]');
    expect(vip).not.toBeNull();

    const free = await page.$('div[src="http://qzonestyle.gtimg.cn/aoi/sola/20200221170128_ZR0A9LvMVN.png"]');
    expect(free).not.toBeNull();
  });

  it('不同类型按钮应该正确渲染', async () => {
    let attr = await page.$eval('div[accessibilitylabel="类型：Button.type.default（默认） 按钮"]', (e) =>
      e.getAttribute('style'),
    );
    let text = await page.$eval('div[accessibilitylabel="类型：Button.type.default（默认） 按钮"] div', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('background-color: rgb(242, 242, 246)');
    expect(text).toContain('color: rgb(17, 17, 17)');

    attr = await page.$eval('div[accessibilitylabel="类型：Button.type.normal 按钮"]', (e) => e.getAttribute('style'));
    text = await page.$eval('div[accessibilitylabel="类型：Button.type.normal 按钮"] div', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('background-color: rgb(255, 255, 255)');
    expect(attr).toContain('border-color: rgb(242, 242, 246)');
    expect(text).toContain('color: rgb(254, 79, 79)');

    attr = await page.$eval('div[accessibilitylabel="类型：Button.type.primary 按钮"]', (e) => e.getAttribute('style'));
    text = await page.$eval('div[accessibilitylabel="类型：Button.type.primary 按钮"] div', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).toContain('background-color: rgb(254, 79, 79)');
    expect(text).toContain('color: rgb(255, 255, 255)');

    attr = await page.$eval('div[accessibilitylabel="类型：Button.type.text 按钮"]', (e) => e.getAttribute('style'));
    text = await page.$eval('div[accessibilitylabel="类型：Button.type.text 按钮"] div', (e) =>
      e.getAttribute('style'),
    );
    expect(attr).not.toContain('border-color');
    expect(text).toContain('color: rgb(254, 79, 79)');
  });
});
