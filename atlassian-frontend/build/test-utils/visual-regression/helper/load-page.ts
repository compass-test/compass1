import glob from 'glob';
import Path from 'path';
import Url, { URL } from 'url';
import { HTTPRequest, Page } from 'puppeteer';
import { performance } from 'perf_hooks';
import { ExampleConfig, PageEventEmitter, LoadPageOptions } from './types';
import { disableAllSideEffects } from './utils';
import { mockStandardDate } from './mock-date';

export const pageSelector = '#examples';

const defaultLoadPageOptions = { reloadSameUrl: true };

function isExampleUrl(url: string): boolean {
  const { pathname } = Url.parse(url);
  if (!pathname) {
    return false;
  }
  return (
    Path.basename(pathname) === 'examples.html' &&
    !!new URL(url).searchParams.get('groupId')
  );
}

export async function loadPage(
  page: Page,
  url: string,
  options: LoadPageOptions = defaultLoadPageOptions,
) {
  const { reloadSameUrl, disabledSideEffects } = options;
  if (isExampleUrl(url)) {
    await loadExampleUrl(page, url, !reloadSameUrl);
  } else {
    await navigateToUrl(page, url, !reloadSameUrl);
  }
  await disableAllSideEffects(page, disabledSideEffects);
}

export type PageloadStatus = 'page-reused' | 'page-loaded';

export async function navigateToUrl(
  page: Page,
  url: string,
  reuseExistingSession = false,
): Promise<PageloadStatus> {
  const start = performance.now();

  // Mock Date in the browser
  await mockStandardDate(page);

  if (reuseExistingSession && page.url() === url) {
    // Page load skipped since the page already has that URL loaded.
    return 'page-reused';
  }

  // Disable Webpack's HMR, as it negatively impacts usage of the 'networkidle0' setting.
  await page.setRequestInterception(true);
  page.on('request', (request: HTTPRequest) => {
    if ((request as any)._interceptionHandled) {
      return;
    }

    if (request.url().includes('xhr_streaming')) {
      console.log('Aborted connection request to webpack xhr_streaming');
      request.abort();
    } else {
      request.continue();
    }
  });

  const tracker = trackers(page);
  const { BuildReporter } = require('@atlaskit/build-reporting');
  const reporter = BuildReporter.create();

  // Track requests and log any hanging connections
  try {
    await page.goto(url, { waitUntil: 'networkidle0' });
    const duration = start - performance.now();

    reporter.sendOperationalEvent({
      actionSubject: 'testing-example-page',
      actionSubjectId: url,
      action: 'loaded',
      attributes: {
        type: 'visual-regression',
        method: 'navigateToUrl',
        duration,
        reuse: reuseExistingSession,
      },
    });
  } catch (error) {
    const duration = start - performance.now();

    reporter.sendOperationalEvent({
      actionSubject: 'testing-example-page',
      actionSubjectId: url,
      action: 'failed',
      attributes: {
        type: 'visual-regression',
        method: 'navigateToUrl',
        duration,
        reuse: reuseExistingSession,
        error,
      },
    });

    console.warn(
      `Failed navigate to: ${url}\n` +
        `with error: ${error.message}\n\n` +
        'Did you forget to start examples in another terminal? (--watch and --debug flags expect you to do it)',
    );
    const inflight = tracker.inflightRequests();
    console.warn(
      `Waiting on requests:\n${inflight
        .map(requests => `  ${requests.url()}`)
        .join('\n')}`,
    );
  }

  tracker.dispose();

  return 'page-loaded';
}

function trackers(page: Page) {
  const requests = new Set<HTTPRequest>();
  const onStarted = (request: HTTPRequest) => requests.add(request);
  const onFinished = (request: HTTPRequest) => requests.delete(request);
  page.on('request', onStarted);
  page.on('requestfinished', onFinished);
  page.on('requestfailed', onFinished);

  return {
    dispose() {
      if (isPageEventEmitter(page)) {
        page.off('request', onStarted);
        page.off('requestfinished', onFinished);
        page.off('requestfailed', onFinished);
      }
    },

    inflightRequests() {
      return Array.from(requests);
    },
  };
}

const isPageEventEmitter = (page: Page): page is PageEventEmitter =>
  !!(page as PageEventEmitter).removeListener;

/**
 * Load Example Url
 *
 * Useful if a package leverages another package's example and you wish to validate
 * that it's available.
 */
export async function loadExampleUrl(
  page: Page,
  url: string,
  reuseExistingSession = false,
) {
  const start = performance.now();
  const { BuildReporter } = require('@atlaskit/build-reporting');
  const reporter = BuildReporter.create();

  await navigateToUrl(page, url, reuseExistingSession);
  const errorMessage = await validateExampleLoaded(page);
  const duration = performance.now() - start;

  const action = errorMessage ? 'failed' : 'loaded';

  reporter.sendOperationalEvent({
    actionSubject: 'testing-example-page',
    actionSubjectId: url,
    action,
    attributes: {
      type: 'visual-regression',
      method: 'loadExampleUrl',
      duration,
      reuse: reuseExistingSession,
      error: errorMessage,
    },
  });

  if (errorMessage) {
    // Throw to fail the test up front instead of waiting for a selector timeout.
    throw new Error(
      `${errorMessage}. Page loaded with unexpected content: ${url}`,
    );
  }
}

// If the required example isn't available, the page resolves with either
// an inline error message, or as empty content.
// Here we check for both scenarios and if discovered we return an error message.
async function validateExampleLoaded(page: Page): Promise<string> {
  await page.waitForSelector('#examples');
  return page.evaluate(() => {
    const renderedContent = document.querySelector<HTMLElement>(
      '#examples > *:first-child',
    );
    if (renderedContent && !renderedContent.children.length) {
      const message = renderedContent.innerText || '';
      // eslint-disable-next-line no-bitwise
      if (~message.indexOf('does not have an example built for')) {
        return `This example isn't available`;
      }
    }
    if (!renderedContent) {
      return `Examples page error`;
    }
    // It's assumed the example loaded correctly
    return '';
  });
}

// get all examples from the code sync
function getAllExamplesSync(): ExampleConfig[] {
  return glob
    .sync('**/packages/**/examples/*.+(js|ts|tsx)', {
      ignore: '**/node_modules/**',
    })
    .map(file => {
      const reverseExamplePath = file.split('/').reverse();
      return {
        team: reverseExamplePath[3],
        package: reverseExamplePath[2],
        exampleName: reverseExamplePath[0]
          .replace('.js', '')
          .replace('.tsx', '')
          .replace(/^\d+-\s*/, ''),
      };
    });
}

export function getExamplesFor(pkgName: string): ExampleConfig[] {
  return getAllExamplesSync().filter(obj => obj.package === pkgName);
}

// construct example urls for a given example
export const getExampleUrl = (
  group: string,
  packageName: string,
  exampleName: string = '',
  baseUrl: string = global.__BASEURL__,
  mode: 'dark' | 'light' | 'none' = 'none',
): string =>
  `${baseUrl}/examples.html?groupId=${group}&packageId=${packageName}&exampleId=${exampleName}&mode=${mode}`;
