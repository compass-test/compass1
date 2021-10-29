import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='run-pipeline']";
const runPipelineOptionXPath = "//div//*[text()='custom: foo']";
const selectPipeline = "div[id='run-pipeline-selector-select']";
const errorPipelineSelectOption =
  "div[id='react-select-run-pipeline-selector-select-option-2']";

describe('<RunPipelineForCommit />', () => {
  it('should match run pipeline for commit dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'run-pipeline-for-commit',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    await page.waitForXPath(runPipelineOptionXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match run pipeline for commit with error dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'run-pipeline-for-commit',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    await page.waitForXPath(runPipelineOptionXPath);

    await page.click(selectPipeline);
    await page.waitForSelector(errorPipelineSelectOption);
    await page.click(errorPipelineSelectOption);

    await page.waitFor(2000);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
