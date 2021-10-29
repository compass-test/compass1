import Page from '@atlaskit/webdriver-runner/wd-wrapper';

const anyContentSelector = [
  '[data-testid="media-viewer-image-content"]',
  '[data-testid="media-viewer-video-content"]',
  '[data-testid="media-viewer-pdf-content"]',
].join(',');

const installMediaViewerShowControlsBackdoor = () => {
  const controls = document.querySelectorAll('.mvng-hide-controls');
  for (let i = 0; i < controls.length; i++) {
    controls[i].classList.remove('mvng-hide-controls');
  }
};

export class MediaViewerPageObject extends Page {
  async init() {
    await this.waitForVisible('[data-testid="media-viewer-popup"]');
    await this.waitForSelector('.mvng-hide-controls');
    // here we use a backdoor to force-reveal controls forever
    await this.execute(installMediaViewerShowControlsBackdoor);
  }

  async getCurrentMediaDetails() {
    const [type, size] = (
      await this.getText(`[data-testid="media-viewer-file-metadata-text"]`)
    ).split(' · ');
    const iconEl = await this.$('[data-testid="media-viewer-file-type-icon"]');
    return {
      name: await this.getText(`[data-testid="media-viewer-file-name"]`),
      type,
      size,
      icon: await iconEl.getAttribute('data-type'),
    };
  }

  async validateMediaCard(validationParameters: {
    name: string;
    size: string | null;
    type: string;
    icon: string;
  }) {
    const { name, size, type, icon } = validationParameters;
    await this.waitUntilContainsText(
      `[data-testid="media-viewer-file-name"]`,
      name,
    );
    await this.waitUntilContainsText(
      `[data-testid="media-viewer-file-metadata-text"] span`,
      type,
    );
    if (size) {
      await this.waitUntilContainsText(
        `[data-testid="media-viewer-file-metadata-text"]`,
        `${size}`,
      );
    }
    await this.waitForSelector(
      `[data-testid="media-viewer-file-type-icon"][data-type="${icon}"]`,
    );
  }

  async navigateNext() {
    await this.click(`[data-testid="media-viewer-navigation-next"]`);
    await this.waitForVisible(anyContentSelector);
  }

  async openSidebar() {
    await this.click('[data-testid="media-viewer-sidebar-button"]');
    await this.waitForVisible('[data-testid="media-viewer-sidebar-content"]');
  }

  async closeSidebar() {
    await this.click('button[aria-label="Close panel"]');
    await this.waitForInvisible('[data-testid="media-viewer-sidebar-content"]');
  }

  async navigatePrevious() {
    await this.click('[data-testid="media-viewer-navigation-prev"]');
    await this.waitForVisible(anyContentSelector);
  }

  async closeMediaViewer(closeWithEsc: boolean) {
    if (closeWithEsc) {
      await this.keys('Escape');
    } else {
      await this.click('[data-testid="media-viewer-close-button"]');
    }

    await this.waitUntil(async () => {
      try {
        const exists = await this.isExisting(
          '[data-testid="media-viewer-popup"]',
        );
        return !exists;
      } catch (error) {
        return false;
      }
    });
  }
}
