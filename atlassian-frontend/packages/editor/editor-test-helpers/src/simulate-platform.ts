import { browser } from '@atlaskit/editor-common';

export enum Platforms {
  Mac,
  Window,
}

export default function simulatePlatform(platform: Platforms) {
  const _mac = browser.mac;
  let spyNavigator: jest.SpyInstance;
  beforeAll(() => {
    spyNavigator = jest.spyOn(window.navigator, 'platform', 'get');

    if (platform === Platforms.Mac) {
      browser.mac = true;
      spyNavigator.mockReturnValue('MacIntel');
      return;
    }

    browser.mac = false;

    spyNavigator.mockReturnValue('Other');
  });

  afterAll(() => {
    browser.mac = _mac;
    spyNavigator.mockRestore();
  });
}
