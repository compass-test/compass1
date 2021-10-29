import axios from 'axios';
import { DesktopOS, BrowserStackBrowser, BrowserStackBrowsers } from '../types';

async function getBSLatestBetaBrowsers(
  osName: DesktopOS = 'Windows',
  osVersion = '10',
) {
  const user = process.env.BROWSERSTACK_USERNAME || '';
  const key = process.env.BROWSERSTACK_KEY || '';
  const auth = Buffer.from(`${user}:${key}`).toString('base64');
  const RESOLUTION = '1920x1080';

  const response = await axios.get<BrowserStackBrowsers>(
    'https://api.browserstack.com/5/browsers?all=true',
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    },
  );

  const betaBrowsers = response.data[osName][osVersion].reduce(
    (acc: BrowserStackBrowser[], currBrowser: BrowserStackBrowser) => {
      if (
        currBrowser.browser_version?.includes('beta') &&
        currBrowser.browser === 'chrome'
      ) {
        // FIXME: Mixing types between BrowserStackBrowser and AFBrowserCapability...
        acc.push({
          os: osName,
          os_version: osVersion,
          browserName: currBrowser.browser,
          browser_version: currBrowser.browser_version,
          resolution: RESOLUTION,
        });
      }
      return acc;
    },
    [],
  );
  return betaBrowsers;
}

async function main() {
  const betaBrowsers = await getBSLatestBetaBrowsers();
  console.log(JSON.stringify(betaBrowsers));
}

if (require.main === module) {
  main().catch(e => {
    console.error(e);
    process.exit(1);
  });
}
