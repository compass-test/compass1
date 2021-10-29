import { PuppeteerPage } from '@atlaskit/visual-regression/helper';

export interface TestExtensionProviders {
  extensionFrameManifest?: boolean;
  floatingToolbarManifest?: boolean;
  [key: string]: boolean | undefined;
}

export const getBoundingClientRect = async (
  page: PuppeteerPage,
  elementSelector: string,
) => {
  // page.click clicks in centre of element, so we need to get the bounding rect
  // so we can click the top left corner
  const boundingRectCoords = await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      const rect = element.getBoundingClientRect();
      return {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      };
    }
  }, elementSelector);

  if (!boundingRectCoords) {
    throw Error(`Unable to find element ${elementSelector} on page`);
  }

  return boundingRectCoords;
};
