/* eslint-disable import/no-extraneous-dependencies */

import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

export const vrExampleTestId = 'vr-example';

export const shootAndValidateExample = (
  packageName: string,
  exampleName: string,
) => async (): Promise<void> => {
  const url = getExampleUrl(
    'commerce',
    packageName,
    exampleName,
    global.__BASEURL__,
  );
  const { page } = global;
  await loadPage(page, url);
  await page.waitForSelector('div[data-testid="' + vrExampleTestId + '"]');
  const image = await page.screenshot({
    fullPage: true,
    captureBeyondViewport: true,
  });
  expect(image).toMatchProdImageSnapshot();
};
