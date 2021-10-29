import { getExampleUrl, loadPage } from '@atlaskit/visual-regression/helper';

const loadExample = async (example: string) => {
  const url = getExampleUrl('jsm', 'calendar', example, global.__BASEURL__);
  const { page } = global;
  await loadPage(page, url);
  await page.waitForSelector('[data-testid="calendar"]');
  return page;
};

describe('Snapshot Test', () => {
  describe('calendar month view', () => {
    it('should match snapshot', async () => {
      const page = await loadExample('month-view');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot with more link dialog open', async () => {
      const page = await loadExample('month-view');
      await page.click(
        '[data-testid="calendar"] .fc-daygrid-body tr:first-child td:nth-child(5) .fc-daygrid-more-link',
      );
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot with event popup open', async () => {
      const page = await loadExample('month-view');
      await page.click(
        '[data-testid="calendar"] .fc-daygrid-body tr:first-child td:nth-child(4) .fc-daygrid-event-harness:nth-child(3) a',
      );
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot after closing event popup', async () => {
      const page = await loadExample('month-view');
      await page.click(
        '[data-testid="calendar"] .fc-daygrid-body tr:first-child td:nth-child(4) .fc-daygrid-event-harness:nth-child(3) a',
      );

      await page.waitForSelector('[data-testid="close-event-popup"]');
      await page.click('[data-testid="close-event-popup"]');
      await page.waitForFunction(
        () => !document.querySelector('[data-testid="close-event-popup"]'),
      );
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot with nested event popup open', async () => {
      const page = await loadExample('month-view');
      await page.click(
        '[data-testid="calendar"] .fc-daygrid-body tr:first-child td:nth-child(5) .fc-daygrid-more-link',
      );
      await page.click('.atlaskit-portal div:nth-child(6)');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot after closing nested event popup', async () => {
      const page = await loadExample('month-view');
      await page.click(
        '[data-testid="calendar"] .fc-daygrid-body tr:first-child td:nth-child(5) .fc-daygrid-more-link',
      );
      await page.click('.atlaskit-portal div:nth-child(6)');

      await page.waitForSelector('[data-testid="close-event-popup"]');
      await page.click('[data-testid="close-event-popup"]');
      await page.waitForFunction(
        () => !document.querySelector('[data-testid="close-event-popup"]'),
      );
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot with placeholder event', async () => {
      const page = await loadExample('month-view');
      const calendarBody = await page.$(
        '[data-testid="calendar"] .fc-daygrid-body',
      );
      expect(calendarBody).not.toBe(null);

      const boundingBox = await calendarBody?.boundingBox();
      expect(boundingBox).not.toBe(null);

      if (boundingBox) {
        await page.mouse.click(
          boundingBox.x + boundingBox.width / 2,
          boundingBox.y + boundingBox.height / 2,
        );

        const image = await page.screenshot();
        expect(image).toMatchProdImageSnapshot();
      }
    });
  });

  describe('five day view', () => {
    it('should match snapshot', async () => {
      const page = await loadExample('five-day-view');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });
  });

  describe('week view', () => {
    it('should match snapshot', async () => {
      const page = await loadExample('week-view');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot with placeholder event', async () => {
      const page = await loadExample('week-view');
      const calendarBody = await page.$(
        '[data-testid="calendar"] .fc-timegrid-body',
      );
      expect(calendarBody).not.toBe(null);

      const boundingBox = await calendarBody?.boundingBox();
      expect(boundingBox).not.toBe(null);

      if (boundingBox) {
        await page.mouse.move(
          boundingBox.x + boundingBox.width / 2,
          boundingBox.y + boundingBox.height / 2,
        );
        await page.mouse.down();
        await page.mouse.move(
          boundingBox.x + boundingBox.width / 2,
          boundingBox.y + boundingBox.height / 2 + 50,
        );

        const image = await page.screenshot();
        expect(image).toMatchProdImageSnapshot();
      }
    });

    it('should match snapshot with a popup open when adding an event', async () => {
      const page = await loadExample('week-view');
      const calendarBody = await page.$(
        '[data-testid="calendar"] .fc-timegrid-body',
      );
      expect(calendarBody).not.toBe(null);

      const boundingBox = await calendarBody?.boundingBox();
      expect(boundingBox).not.toBe(null);

      if (boundingBox) {
        await page.mouse.move(
          boundingBox.x + boundingBox.width / 3,
          boundingBox.y + boundingBox.height / 3,
        );
        await page.mouse.down();
        await page.mouse.move(
          boundingBox.x + boundingBox.width / 3,
          boundingBox.y + boundingBox.height / 3 + 50,
        );
        await page.mouse.up();

        await page.waitForSelector('[data-testid="close-popup"]');

        const image = await page.screenshot();
        expect(image).toMatchProdImageSnapshot();
      }
    });

    it('should match snapshot without all-day slot', async () => {
      const page = await loadExample('week-view-without-all-day-slot');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });

    it('should match snapshot when timezone changes', async () => {
      const page = await loadExample('week-view-with-timezone-controls');
      await page.click('[data-testid="timezone-change-button"]');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });
  });

  describe('day view', () => {
    it('should match snapshot', async () => {
      const page = await loadExample('day-view');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });
  });

  describe('custom event borders', () => {
    it('should match snapshot', async () => {
      const page = await loadExample('custom-event-borders');
      const image = await page.screenshot();
      expect(image).toMatchProdImageSnapshot();
    });
  });
});
