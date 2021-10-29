import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='run-pipeline']";

const selectBranch = "div[id='run-pipeline-branch-selector-select']";
const masterBranchSelectOption =
  "div[id='react-select-run-pipeline-branch-selector-select-option-0']";

const selectPipeline = "div[id='run-pipeline-selector-select']";
const variablesPipelineSelectOption =
  "div[id='react-select-run-pipeline-selector-select-option-1']";
const errorPipelineSelectOption =
  "div[id='react-select-run-pipeline-selector-select-option-2']";

const variableNameField = '[name="foo"]';
const variablePasswordField = '[name="SECURED_bar"]';

const runPipelineOptionXPath = "//div//*[text()='custom: foo']";
const runPipelineButtonXPath = "//button[not(@disabled)]//*[text()='Run']";
const runPipelineButtonDisabledXPath = "//button[@disabled]//*[text()='Run']";

describe('<RunPipelineBranchSelector />', () => {
  it('should match run custom pipeline dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'run-pipeline-with-branch-selector',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    // view branches
    await page.waitForSelector(selectBranch);
    await page.click(selectBranch);

    // select branch
    await page.waitForSelector(masterBranchSelectOption);
    await page.click(masterBranchSelectOption);

    await page.waitFor(4000);
    await page.waitForXPath(runPipelineOptionXPath);

    // submit to create runner
    await page.waitForXPath(runPipelineButtonXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match run custom pipeline with variables dialog', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'run-pipeline-with-branch-selector',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    // view branches
    await page.waitForSelector(selectBranch);
    await page.click(selectBranch);

    // select branch
    await page.waitForSelector(masterBranchSelectOption);
    await page.click(masterBranchSelectOption);

    await page.waitFor(4000);
    await page.waitForXPath(runPipelineOptionXPath);

    // view pipelines
    await page.waitForSelector(selectPipeline);
    await page.click(selectPipeline);

    // select pipeline
    await page.waitForSelector(variablesPipelineSelectOption);
    await page.click(variablesPipelineSelectOption);

    // insert variable
    await page.waitForSelector(variableNameField);
    await page.focus(variableNameField);
    await page.keyboard.type('foo');

    await page.focus(variablePasswordField);
    await page.keyboard.type('bar');

    // submit to create runner
    await page.waitForXPath(runPipelineButtonXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match run pipeline dialog with error', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'run-pipeline-with-branch-selector',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    // view branches
    await page.waitForSelector(selectBranch);
    await page.click(selectBranch);

    // select branch
    await page.waitForSelector(masterBranchSelectOption);
    await page.click(masterBranchSelectOption);

    await page.waitFor(4000);
    await page.waitForXPath(runPipelineOptionXPath);

    // view pipelines
    await page.waitForSelector(selectPipeline);
    await page.click(selectPipeline);

    // select pipeline
    await page.waitForSelector(errorPipelineSelectOption);
    await page.click(errorPipelineSelectOption);

    // submit to create runner
    await page.waitForXPath(runPipelineButtonDisabledXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
