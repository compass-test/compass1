import Page from '@atlaskit/webdriver-runner/wd-wrapper';
import { CardStatus } from '@atlaskit/media-card/types';

type RecentUploadCard = {
  readonly filename: string;
  readonly status: CardStatus;
};

interface MediaCardResult {
  element: WebdriverIO.Element;
  meta: RecentUploadCard;
}

export interface RecentCardFilter {
  status?: CardStatus;
  filename?: string;
}

function createCardFilterPredicate(filter: RecentCardFilter) {
  return ({ meta }: MediaCardResult) =>
    (filter.filename === undefined || meta.filename === filter.filename) &&
    (filter.status === undefined || meta.status === filter.status);
}

export class MediaPickerPageObject {
  constructor(readonly page: Page) {}

  async getAllRecentUploadCards(): Promise<MediaCardResult[]> {
    const selector = '[data-testid="media-file-card-view"]';
    const mediaPickerElement = await this.page.$(
      '[data-testid="media-picker-popup"]',
    );
    const result = await mediaPickerElement.$$(selector);
    return Promise.all(
      result.map(async (element) => {
        const status: CardStatus = (await element.getAttribute(
          'data-test-status',
        )) as any;
        let filename = '';
        if (status !== 'error') {
          const nameElement = await element.$(
            '[data-testid="media-card-file-name"]',
          );
          filename = await nameElement.getHTML(false);
        }
        const meta: RecentUploadCard = {
          filename: filename,
          status,
        };
        return { meta, element };
      }),
    );
  }

  async getFilteredRecentUploadCards(
    filter: RecentCardFilter,
  ): Promise<MediaCardResult[]> {
    const cardFilterPredicate = createCardFilterPredicate(filter);
    await this.page.waitUntil(async () => {
      const cards = await this.getAllRecentUploadCards();
      return cards.some(cardFilterPredicate);
    });
    return (await this.getAllRecentUploadCards()).filter(cardFilterPredicate);
  }

  async getNthUploadCard(index: number): Promise<MediaCardResult> {
    const selector = '[data-testid="media-file-card-view"]';
    const mediaPickerElement = await this.page.$(
      '[data-testid="media-picker-popup"]',
    );

    await this.page.waitUntil(async () => {
      const result = await mediaPickerElement.$$(selector);
      return Array.isArray(result) && result.length > index;
    }, `Could not access card index ${index}`);

    const result = await mediaPickerElement.$$(selector);

    if (result.length === 0) {
      throw new Error('Could not load cards');
    }

    if (index >= result.length) {
      throw new Error(`Index is too high (only ${result.length} cards)`);
    }

    const element = result[index];
    const status: CardStatus = (await element.getAttribute(
      'data-test-status',
    )) as any;
    let filename = '';
    if (status !== 'error') {
      filename = filename = await element.getAttribute('data-test-media-name');
    }
    const meta: RecentUploadCard = {
      filename: filename,
      status,
    };
    return { meta, element };
  }

  async clickInsertButton(): Promise<void> {
    await this.page.click('[data-testid="media-picker-insert-button"]');
    await this.page.waitForInvisible('[data-testid="media-picker-popup"]');
  }

  async clickCancelButton(): Promise<void> {
    await this.page.click('[data-testid="media-picker-cancel-button"]');
    await this.page.waitForInvisible('[data-testid="media-picker-popup"]');
  }

  async clickGiphyButton(): Promise<void> {
    await this.page.click('[data-testid="media-picker-giphy-menu-item"]');
  }

  async selectCards(filter: RecentCardFilter) {
    const cards = await this.getFilteredRecentUploadCards(filter);
    await Promise.all(cards.map(({ element }) => element.click()));
  }

  async selectNthUploadCard(index: number) {
    const { element } = await this.getNthUploadCard(index);
    await element.click();
    await this.page.waitForSelector(
      '[data-testid="media-picker-insert-button"]',
    );
  }

  async uploadFile(localFilePath: string) {
    const fileInputSelector = '[data-testid="media-picker-file-input"]';
    await this.page.waitForSelector(fileInputSelector);

    // We want to make input visible in order to be able to "type" into it.
    await this.page.execute(() => {
      const element = document.querySelector<HTMLInputElement>(
        '[data-testid="media-picker-file-input"]',
      );
      if (element) {
        element.style.display = 'block';
        element.removeAttribute('multiple');
        element.value = '';
      }
    });
    const fileInput = await this.page.$(fileInputSelector);
    const filename = await this.page.uploadFile(localFilePath);
    // These two lines ↕ (up and bellow) should be next to each other! Otherwise IE will break in Browserstack.
    await fileInput.addValue(filename);

    // TODO Actually what we want to wait for is a card with given name
    await this.page.waitForSelector(
      '[data-testid="media-picker-insert-button"]',
    );
  }
}
