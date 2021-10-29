import path from 'path';

import glob from 'glob';

import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

const exampleFiles = glob
  .sync(path.join(__dirname, '../../examples') + '/**.tsx')
  .map((fp) => path.basename(fp))
  .sort();

describe('All examples', () => {
  test.each(exampleFiles)('Example %s', async (exampleFile) => {
    const matches = /([\w\-_]+).tsx/.exec(exampleFile);
    if (!matches) {
      throw new Error(`Example filename malformed: ${exampleFile}`);
    }
    const exampleName = matches[1];
    const url = getExampleUrl(
      'jira',
      'jira-portfolio-plan-wizard',
      exampleName,
      global.__BASEURL__,
    );
    const page = global.page;
    await page.setViewport({ width: 1280, height: 800 });
    await loadPage(page, url);
    const node = await page.$('[data-vr-root="true"] > *');

    const waitFor = await page.evaluate(
      `document.documentElement.dataset.vrWaitFor`,
    );

    if (waitFor != null) {
      await page.waitForSelector(`[data-vr-ready="${waitFor}"]`);
    }

    const clipRaw = await page.evaluate(
      `document.documentElement.dataset.vrClip`,
    );

    const image = await (async () => {
      // If we have clip infomartion, we will take screenshot of the body
      try {
        const clip = JSON.parse(clipRaw as string);
        const body = await page.$('body');
        return await body?.screenshot({ clip });
      } catch (err) {
        if (err.name !== 'SyntaxError') {
          // JSON parse error
          throw err;
        }

        // Otherwise, just take screenshot of the root node content
        return await node?.screenshot();
      }
    })();

    expect(image).toMatchProdImageSnapshot();
  });
});
