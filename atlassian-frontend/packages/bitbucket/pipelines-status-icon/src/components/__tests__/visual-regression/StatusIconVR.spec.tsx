import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

import { name } from '../../../../package.json';

describe(name, () => {
  it('should match production example', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'pipelines-status-icon',
      'StatusIcon',
      global.__BASEURL__,
    );
    const { page } = global;
    await loadPage(page, url);
    const element = await page.waitForSelector('#status-icons');
    const image = await element?.screenshot();
    expect(image).toMatchProdImageSnapshot();
  });
});
