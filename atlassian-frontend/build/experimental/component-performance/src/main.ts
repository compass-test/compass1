import puppeteer from 'puppeteer';
import { config } from 'dotenv';

config();

const main = async () => {
  const browser = await puppeteer.launch({
    args: [
      // Required for Docker version of Puppeteer
      '--no-sandbox',
      '--disable-setuid-sandbox',
      // This will write shared memory files into /tmp instead of /dev/shm,
      // because Docker’s default for /dev/shm is 64MB
      '--disable-dev-shm-usage',
    ],
  });

  const browserVersion = await browser.version();
  console.log('\n');
  console.log(`🚀 Started ${browserVersion}`);

  const storyName = process.env.STORY_NAME!;
  const packageName = process.env.PACKAGE_NAME!.substring(1).replace('/', '·');

  const runs = Number(process.env.RUNS);
  const numberOfCopies = process.env.COPIES!;
  const numberOfSamples = process.env.SAMPLES!;

  console.log(
    'Running component performance:',
    { packageName, storyName, runs, numberOfCopies, numberOfSamples },
    '\n',
  );

  await Array.from({ length: runs }).reduce(
    (promise: Promise<void>, _, index) =>
      promise.then(() =>
        runPerformanceTest(browser, {
          packageName,
          storyName,
          index,
          numberOfCopies,
          numberOfSamples,
        }),
      ),
    Promise.resolve(),
  );

  await browser.close();
};

main().catch((e) => console.warn(`ERROR: ${e}`));

interface PerformanceOptions {
  packageName: string;
  storyName: string;
  index: number;
  numberOfSamples: string;
  numberOfCopies: string;
}

async function runPerformanceTest(
  browser: puppeteer.Browser,
  options: PerformanceOptions,
) {
  const page = await browser.newPage();
  const {
    packageName,
    storyName,
    index,
    numberOfCopies,
    numberOfSamples,
  } = options;

  try {
    const url = `http://${process.env.STORYBOOK_HOST || 'localhost'}:${
      process.env.STORYBOOK_PORT || 56789
    }/?path=/story/${packageName}-componentlab--${storyName}`;

    console.log(`Attempt #${index + 1} going to url: ${url}`);
    await page.goto(url);

    await page.waitForSelector('iframe');

    // Wait until the main view is loaded
    const elementHandle = await page.$('iframe#storybook-preview-iframe');
    const frame = await elementHandle!.contentFrame();
    await frame!.waitForSelector('body.sb-show-main');

    // The performance add-on is the second tab; what's a better selector?
    await page.click('div[role="tablist"] > :nth-child(2)');
    await page.reload(); // For some reason, the add-on needs reloading to enable all controls.

    const selectorPrefix = 'storybook-addon-performance';
    await page.waitForSelector(
      `select#${selectorPrefix}-copy-select:not([disabled])`,
    );

    await page.select(`select#${selectorPrefix}-copy-select`, numberOfCopies);
    await page.select(
      `select#${selectorPrefix}-sample-select`,
      numberOfSamples,
    );
    await page.click(`button#${selectorPrefix}-start-all-button`);

    await (page as any)._client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: `./results/raw-${index}`,
    });

    await page.waitForSelector(
      `button#${selectorPrefix}-save-button:not([disabled])`,
    );

    await page.click(`button#${selectorPrefix}-save-button`);
    console.log(`✨ Attempt #${index + 1} was successful!\n`);
  } catch (e) {
    console.error('💔 An error occurred – ', e, '\n');
    await page.screenshot({
      path: `./screenshots/error-${packageName}-attempt-${index}.png`,
    });
  }

  await page.close();
}
