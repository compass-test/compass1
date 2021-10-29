import type { Page } from 'puppeteer';
import type {
  SideEffectOptions,
  PuppeteerWaitForOptions as WaitForOptions,
} from './types';

/**
 * Disable all side effects that can cause inconsistent results in VR tests
 * If your test relies on a side effect however, you can specify to allow it
 */
export async function disableAllSideEffects(
  page: Page,
  allowSideEffects: SideEffectOptions = {},
) {
  if (!allowSideEffects.cursor) {
    await disableCaretCursor(page);
  }
  if (!allowSideEffects.animation) {
    await disableAllAnimations(page);
  }
  if (!allowSideEffects.transition) {
    await disableAllTransitions(page);
  }
  if (!allowSideEffects.scroll) {
    await disableScrollBehavior(page);
  }
}

export async function disableCaretCursor(page: Page) {
  const css = `
  * {
    caret-color: transparent !important;
  }
  `;
  await page.addStyleTag({ content: css });
}

export async function disableAllTransitions(page: Page) {
  const css = `
  *, *::after, *::before {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
  }
  `;
  await page.addStyleTag({ content: css });
}

export async function disableAllAnimations(page: Page) {
  const css = `
  *, *::after, *::before {
    animation: none !important;
  }
  `;
  await page.addStyleTag({ content: css });
}

export async function disableScrollBehavior(page: Page) {
  const css = `
  * {
    scroll-behavior: auto !important;
  }
  `;
  await page.addStyleTag({ content: css });
}

/**
 * Image Loading Helpers
 *
 * We use `page.goto(url, { waitUntil: 'networkidle0' })` which waits for network requests on initial page
 * load to complete.
 *
 * If your example loads content after initial page load (e.g. `waitUntil: 'networkidle0'` isn't sufficient),
 * you can use `waitForLoadedImageElements` or `waitForLoadedBackgroundImages` to wait for all the images
 * on the page to load prior to taking a screenshot.
 */

// Wait for all image elements on the page to have loaded.
export function areAllImageElementsLoaded(): boolean {
  const images = Array.from(document.images);
  if (!images.length) {
    throw new Error(`
      'waitForLoadedImageElements' was used, but no images existed on the page within the time threshold.
      Ensure the page contains images.
      You can increase the wait time via the 'mediaDelayMs' parameter.
    `);
  }
  return images.every(i => i.complete);
}

/**
 * Wait for resolved image elements to have all loaded.
 *
 * Ensure any `<img />` element's on the page have finished loading their `src` URI.
 *
 * Note: this won't help for Media items which are unresolved (e.g. due to authentication
 * or a media id mismatch) as those scenarios don't render an `<img />`.
 */
export async function waitForLoadedImageElements(
  page: Page,
  timeout: number,
  mediaDelayMs = 150,
) {
  // Wait for Media API to resolve urls
  await page.waitForTimeout(mediaDelayMs);
  // polling at 50ms (roughly every 3 rendered frames)
  return page.waitForFunction(areAllImageElementsLoaded, {
    polling: 50,
    timeout,
  });
}

type ImageLoadedResponse = { url: string; loaded: boolean };
type WaitForLoadedBackgroundImagesEvalReturn = (
  selector: string,
  raceTimeout: number,
) => Promise<ImageLoadedResponse[] | string>;

/**
 * Wait for images loaded via the CSS background-image property.
 *
 * Ensure elements using a `background-image` have finished loading their `url`.
 *
 * @param page Reference to Puppeteeer page object.
 * @param selector The selector to match elements which use a CSS background-image.
 *    Best practice is to match only the elements you care about via a direct selector.
 *    If you need to match several different classes you can use the wildcard selector.
 *    e.g. In order of lookup performance `.foo` or `.foo > *`, or `.foo *`.
 * @param timeoutMs Milliseconds to wait for downloading images before failing the test.
 * @param debug Whether or not to console.log how many matched images were found.
 */
export async function waitForLoadedBackgroundImages(
  page: Page,
  selector = '#examples *',
  timeoutMs = 30000,
  debug = false,
) {
  if (selector !== '*') {
    // Ensure we have a match before proceeding
    await page.waitForSelector(selector);
  }

  try {
    const result = await page.evaluate<WaitForLoadedBackgroundImagesEvalReturn>(
      (sel: string, raceTimeout: number) => {
        const urlSrcRegex = /url\(\s*?['"]?\s*?(\S+?)\s*?["']?\s*?\)/i;
        const bgImageUrlSet: Set<string> = Array.from<HTMLElement>(
          document.querySelectorAll(sel),
        ).reduce(
          (collection, node) => {
            const prop = window
              .getComputedStyle(node, null)
              .getPropertyValue('background-image');
            // Find elements which have a bg image set
            const match = urlSrcRegex.exec(prop);
            if (match) {
              collection.add(match[1]);
            }
            return collection;
          },
          // Using a Set for automatic de-duplication
          new Set<string>(),
        );

        const numImagesToWaitFor = bgImageUrlSet.size;
        // Ensure we found images to wait for...
        if (numImagesToWaitFor === 0) {
          const selectorError = `waitForLoadedBackgroundImages: Selector '${sel}' didn't match any elements with a CSS background-image property.`;
          // Fail the test if the selector fails to match (this likely implies the selector is wrong).
          return Promise.reject(selectorError);
        }

        // Wait for images to load, or abort if timeout threshold is exceeded
        return Promise.race([
          new Promise<string>((_resolve, reject) => {
            const timeoutError = `waitForLoadedBackgroundImages: Failed to resolve background images for '${sel}' within the threshold of ${raceTimeout} milliseconds`;
            setTimeout(reject, raceTimeout, timeoutError);
          }),
          Promise.all(
            Array.from(bgImageUrlSet).map(
              url =>
                new Promise<ImageLoadedResponse>((resolve, reject) => {
                  const img = new Image();
                  img.onload = () => resolve({ url, loaded: true });
                  img.onerror = () => reject({ url, loaded: false });
                  img.src = url;
                }),
            ),
          ),
        ]);
      },
      selector,
      timeoutMs,
    );

    if (debug && typeof result !== 'string') {
      const numImagesLoaded = result.filter(o => o.loaded).length;
      const numImagesFailed = result.length - numImagesLoaded;
      console.info(
        `waitForLoadedBackgroundImages: Loaded: ${numImagesLoaded}
        ${numImagesFailed > 0 ? `, failed: ${numImagesFailed}` : ''}`,
      );
    }
    // Success
    return Promise.resolve();
  } catch (e) {
    // Relay the problem back to the test runner
    return Promise.reject(e);
  }
}

/** Wait for the desired number of elements to exist on the page */
export async function waitForElementCount(
  page: Page,
  elementSelector: string,
  elementCount: number,
  waitOptions: WaitForOptions = { visible: true, timeout: 3000 },
) {
  await page.waitForFunction(
    (selector: string, count: number) =>
      document.querySelectorAll(selector).length === count,
    waitOptions,
    elementSelector,
    elementCount,
  );
}

/** Waits for atlaskit tooltip component to appear and fade in */
export async function waitForTooltip(page: Page, textContent = '') {
  const xpath = textContent
    ? `//*[contains(@class, "Tooltip") and contains(text(), "${textContent}")]`
    : '//*[contains(@class, "Tooltip")]';
  await page.waitForXPath(xpath, {
    timeout: 5000,
    visible: true,
  });

  // The tooltip takes 350 ms to animate in (plus some buffer)
  await page.waitForTimeout(400);
}

/** Waits for atlaskit tooltip component to disappear */
export async function waitForNoTooltip(page: Page) {
  const tooltipSelector = '[class^="Tooltip"]';
  await page.waitForFunction(
    (selector: string) => !document.querySelector(selector),
    { timeout: 5000 },
    tooltipSelector,
  );
}

export const waitForText = async (page: Page, selector: string, text: string) =>
  await page.waitForFunction(
    (selector: string, text: string) => {
      const items = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      );
      if (items) {
        return items.some(item => {
          return item.innerText && item.innerText.includes(text);
        });
      }
    },
    { timeout: 5000 },
    selector,
    text,
  );
