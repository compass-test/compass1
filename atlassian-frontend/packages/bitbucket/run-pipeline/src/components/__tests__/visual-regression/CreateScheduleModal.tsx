import {
  getExampleUrl,
  loadPage,
  takeElementScreenShot,
} from '@atlaskit/visual-regression/helper';

const modal = "[data-testid='create-schedule']";

const selectBranch = "div[id='run-pipeline-branch-selector-select']";
const masterBranchSelectOption =
  "div[id='react-select-run-pipeline-branch-selector-select-option-0']";

const selectSchedule = "div[id='create-schedule-selector-select']";
const weeklyScheduleOption =
  "div[id='react-select-create-schedule-selector-select-option-1']";
const dailyScheduleOption =
  "div[id='react-select-create-schedule-selector-select-option-2']";

const runPipelineOptionXPath = "//div//*[text()='custom: foo']";
const createScheduleButtonXPath =
  "//button[not(@disabled)]//*[text()='Create']";

describe('<CreateScheduleModal />', () => {
  it('should match blank schedule modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'create-schedule-modal',
      global.__BASEURL__,
    );
    const { page } = global;

    await loadPage(page, url);
    await page.waitForSelector(modal);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match hourly schedule modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'create-schedule-modal',
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
    await page.waitForXPath(createScheduleButtonXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match weekly schedule modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'create-schedule-modal',
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

    // view schedules
    await page.waitForSelector(selectSchedule);
    await page.click(selectSchedule);

    // select schedules
    await page.waitForSelector(weeklyScheduleOption);
    await page.click(weeklyScheduleOption);

    // submit to create runner
    await page.waitForXPath(createScheduleButtonXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });

  it('should match daily schedule modal', async () => {
    const url = getExampleUrl(
      'bitbucket',
      'run-pipeline',
      'create-schedule-modal',
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

    // view schedules
    await page.waitForSelector(selectSchedule);
    await page.click(selectSchedule);

    // select schedules
    await page.waitForSelector(dailyScheduleOption);
    await page.click(dailyScheduleOption);

    // submit to create runner
    await page.waitForXPath(createScheduleButtonXPath);

    expect(
      await takeElementScreenShot(global.page, modal),
    ).toMatchProdImageSnapshot();
  });
});
