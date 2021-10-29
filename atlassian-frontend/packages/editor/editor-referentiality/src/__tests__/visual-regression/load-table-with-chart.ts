import { snapshot, initEditorWithAdf, Appearance } from './__utils';
import { PuppeteerPage } from '@atlaskit/visual-regression/helper';
import adf from '../__fixtures__/adf.json';

const initEditor = async (page: PuppeteerPage, adf: Object) => {
  await initEditorWithAdf(page, {
    appearance: Appearance.fullPage,
    adf,
    viewport: { width: 1040, height: 800 },
  });
};

describe('Table with associated chart', () => {
  it('should render correctly on initial load', async () => {
    const page = global.page;
    await initEditor(page, adf);
    await snapshot(page);
  });
});
