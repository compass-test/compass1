import { BrowserTestCase } from '@atlaskit/webdriver-runner/lib/runner/runner';
import Page from '@atlaskit/webdriver-runner/lib/wrapper/wd-wrapper';
import { getExampleUrl } from '@atlaskit/webdriver-runner/utils/example';

const pageUrl = getExampleUrl(
  'dragonfruit',
  'page-component-details',
  'component-dependencies',
);

type PageSection = WebdriverIO.Element;
type Browser = WebdriverIO.BrowserObject;

const dependencyPageTester = async (client: Browser) => {
  const page = new Page(client);
  let main: PageSection = await page.$('html');

  return {
    navigateToPage: async () => {
      await page.goto(pageUrl);

      main = await page.$('#main');
      const h1 = await main.$('h1');

      expect(await h1.isDisplayed()).toBe(true);
      expect(await h1.getText()).toBe('Dependencies');
    },

    assertEmptyStateShown: async () => {
      const h4 = await main.$('h4');

      expect(await h4.isDisplayed()).toBe(true);
      expect((await h4.getText()).length).toBeGreaterThan(0);
    },

    addRelationship: async (componentName: string, fromEmptyState: boolean) => {
      // If not empty state open the form
      if (!fromEmptyState) {
        const addButton = await main.$('Add dependency');
        await addButton.click();
      }

      await page.click(`//*[text()='Select a component']`);

      await page.click(`//*[text()='${componentName}']`);

      await page.click('button[type=submit]');

      await page.waitForSelector(
        '[data-testid="relationships.depends_on.outward--list"]',
      );

      const relationshipList = await main.$(
        '[data-testid="relationships.depends_on.outward--list"]',
      );

      const relationships = await relationshipList.$$('li');

      expect(relationships.length).toBe(1);
    },

    removeRelationship: async (componentName: string) => {
      await page.hover(
        `[aria-label='Delete relationship with ${componentName}']`,
      );

      await page.click(
        `[aria-label='Delete relationship with ${componentName}']`,
      );

      await page.click(
        `[data-testid='pollinator.confirmation-modal.submit-button']`,
      );
    },
  };
};

BrowserTestCase(
  'Component dependencies - Should be able to add and remove relationships',
  {},
  async (client: Browser) => {
    const tester = await dependencyPageTester(client);

    await tester.navigateToPage();

    await tester.assertEmptyStateShown();

    await tester.addRelationship('react', true);

    await tester.removeRelationship('react');

    await tester.assertEmptyStateShown();
  },
);
