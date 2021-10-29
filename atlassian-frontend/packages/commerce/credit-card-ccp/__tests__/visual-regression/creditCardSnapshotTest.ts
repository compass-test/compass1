import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

describe('Snapshot Test', () => {
  it('Credit Card matches snapshot', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-ccp',
      'credit-card-form',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('Displays Credit Card error on empty card holder', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-ccp',
      'credit-card-form',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );
    await page.click('button[type="submit"]');
    await page.waitForSelector('span[role="alert"]');
    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });

  it('Displays Credit Card error on empty stripe controlled fields', async () => {
    const url = getExampleUrl(
      'commerce',
      'credit-card-ccp',
      'credit-card-form',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    const client = await page.target().createCDPSession();
    // setting a high value on the playback rate of animations so that stripe icon animations are guaranteed to run
    await client.send('Animation.setPlaybackRate', { playbackRate: 12 });
    await page.waitForSelector(
      '[data-testid="commerce-creditcard.complete-state"]',
    );
    await page.focus('input[name="cardholderName"]');
    await page.keyboard.type('Taco');
    await page.click('button[type="submit"]');
    await page.waitForSelector('span[role="alert"]');
    // give some time for the animations to have run an accelerated rate
    await page.waitForTimeout(100);

    const image = await page.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
