import { BrowserTestCase } from '@atlaskit/webdriver-runner/runner';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';
import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const pageUrl = getExampleUrl(
  'dragonfruit',
  'page-component-details',
  'component-details',
);

BrowserTestCase('Component details - Should render', {}, async (client) => {
  const page = new Page(client);
  await page.goto(pageUrl);

  // Component name exists in an H1 and has content
  const h1 = await page.$('h1');

  expect(await h1.isDisplayed()).toBe(true);
  expect((await h1.getText()).length).toBeGreaterThan(0);

  // Find the component type in the sidebar
  const sidebarHeader = await page.$('[data-navheader]');
  const type = await sidebarHeader.$('[data-item-description]');

  // Component type exists and has content
  expect(await type.isDisplayed()).toBe(true);
  expect((await type.getText()).length).toBeGreaterThan(0);
});

BrowserTestCase(
  'Component details - Name can be updated',
  {},
  async (client) => {
    const page = new Page(client);
    await page.goto(pageUrl);

    const newName = 'New component name!';

    // Click on the read view to open the edit view
    const readViewContentWrapper =
      'h1 button[aria-label="Edit component name"] + div';
    await page.waitForSelector(readViewContentWrapper);
    await page.click(readViewContentWrapper);

    // Enter a new name
    const input = 'h1 input';
    await page.waitForSelector(input);
    // Execute code in the browser to clear the textarea
    // I found this to be much more reliable than emptyTextFieldByBackspacing.
    await page.execute((input: string) => {
      (document.querySelector(input) as HTMLInputElement).value = '';
    }, input);
    await page.click(input);
    await page.type(input, newName);

    // Confirm changes
    const confirmButton = 'h1 button[aria-label="Save"]';
    await page.waitForSelector(confirmButton);
    await page.click(confirmButton);

    // Component name should have updated
    const h1 = await page.$('h1');
    expect(await h1.getText()).toBe(newName);
  },
);

BrowserTestCase(
  'Component details - Description can be updated',
  {},
  async (client) => {
    const page = new Page(client);
    await page.goto(pageUrl);

    const newDescription = 'New component description!';

    // The description is wrapped in a section with an aria-labelledby
    // This gives us an easy way to find the root element
    const heading = await page.$('h2=Description');
    const id = await heading.getAttribute('id');
    const base = `[aria-labelledby="${id}"]`;

    // Click on the read view to open the edit view
    const readViewContentWrapper = `${base} button[aria-label="Edit component description"] + div`;
    await page.waitForSelector(readViewContentWrapper);
    await page.click(readViewContentWrapper);

    // Enter a new description
    const input = `${base} textarea`;
    await page.waitForSelector(input);
    // Execute code in the browser to clear the textarea
    // I found this to be much more reliable than emptyTextFieldByBackspacing.
    await page.execute((input: string) => {
      (document.querySelector(input) as HTMLTextAreaElement).value = '';
    }, input);
    await page.click(input);
    await page.type(input, newDescription);

    // Confirm changes
    const confirmButton = `${base} button[aria-label="Save"]`;
    await page.waitForSelector(confirmButton);
    await page.click(confirmButton);

    // Component description should have updated
    const description = await page.$(`${base} form`);
    expect(await description.getText()).toBe(newDescription);
  },
);

const addLabel = async (page: Page, labelName: string) => {
  const input = '#labels_editor_input';
  await page.waitForSelector(input);
  await page.type(input, `${labelName}`);
  await page.keys('Enter');
  const labelSelector = `span=${labelName}`;
  await page.waitForSelector(labelSelector);
};

BrowserTestCase(
  'Component details - Labels can be managed',
  {},
  async (client) => {
    const page = new Page(client);
    await page.goto(pageUrl);

    // Click on the read view to open the edit view
    const labelsInlineEditorWrapper =
      '[data-testid="pollinator.page-component-details.labels-editable-view.read-view"]';
    await page.waitForSelector(labelsInlineEditorWrapper);
    await page.click(labelsInlineEditorWrapper);

    await addLabel(page, 'newlabel');
    await addLabel(page, 'newlabel2');

    // Move selection to newLabel and delete it
    await page.keys('ArrowLeft');
    await page.keys('ArrowLeft');
    await page.keys('Backspace');

    const labelSelector = `span=newlabel`;
    await page.waitForInvisible(labelSelector);
  },
);
