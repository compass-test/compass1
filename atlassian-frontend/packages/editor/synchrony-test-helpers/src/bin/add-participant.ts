import puppeteer, { KeyInput } from 'puppeteer';
import Url from 'url';
import { performance } from 'perf_hooks';
import yargs from 'yargs';

type Result<T> = [Error, null] | [null, T];

const EDITOR_SELECTOR_LOADED = '.ProseMirror';
const EDITOR_SELECTOR_EDITABLE = '.ProseMirror[contenteditable=true]';

const LOREM_IPSUM = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Molestie ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Pharetra massa massa ultricies mi. Nunc vel risus commodo viverra. Rhoncus est pellentesque elit ullamcorper dignissim cras. Augue neque gravida in fermentum et sollicitudin ac. Urna id volutpat lacus laoreet non curabitur gravida. In vitae turpis massa sed elementum. Cras tincidunt lobortis feugiat vivamus at augue eget arcu dictum. Placerat orci nulla pellentesque dignissim. Risus commodo viverra maecenas accumsan lacus vel facilisis. Mauris pharetra et ultrices neque ornare aenean euismod. At elementum eu facilisis sed. Mi proin sed libero enim sed. Sed cras ornare arcu dui vivamus arcu felis bibendum ut.

Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Sapien eget mi proin sed libero. Nibh nisl condimentum id venenatis a condimentum. Lacus sed viverra tellus in hac habitasse. Venenatis lectus magna fringilla urna porttitor. Blandit turpis cursus in hac. Eros donec ac odio tempor orci dapibus. Ut sem nulla pharetra diam sit. Quis blandit turpis cursus in hac habitasse platea. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Netus et malesuada fames ac turpis egestas maecenas pharetra convallis. Tellus mauris a diam maecenas sed enim ut sem viverra.
`;

const cli = yargs
  .option('headless', { type: 'boolean', default: true })
  .option('credentials', { type: 'string' })
  .option('url', { type: 'string', demandOption: true })
  .option('speed', { type: 'number', default: 200 }).argv;

async function main(): Promise<Result<string>> {
  const browser = await puppeteer.launch({
    headless: cli.headless,
  });

  const page = await browser.newPage();

  if (typeof cli.credentials === 'string') {
    const url = Url.parse(cli.url);
    const [sessionToken, csrfToken] = cli.credentials.split(':');

    await page.setCookie(
      {
        name: 'cloud.session.token',
        value: sessionToken,
        path: '/',
        secure: true,
        httpOnly: true,
        sameSite: 'Lax',
        domain: url.host,
      },
      {
        name: 'atl.xsrf.token',
        value: csrfToken,
        path: '/wiki',
        secure: true,
        domain: url.host,
      },
    );
  }

  await page.goto(cli.url);

  const editor = await page.waitForSelector(EDITOR_SELECTOR_LOADED, {
    timeout: 5 * 60 * 1000,
  });

  await editor?.click();

  const editableEditor = await page.waitForSelector(EDITOR_SELECTOR_EDITABLE, {
    timeout: 5 * 60 * 1000,
  });

  await editableEditor?.click();

  let index = 0;
  let previous = 0;
  let frame = 1000 / cli.speed;

  page.on('console', (e) => {
    if (['error', 'warning'].includes(e.type())) {
      for (let i = 0; i < e.args().length; ++i) {
        // eslint-disable-next-line no-console
        console.log(e.args()[i].toString());
      }
    }
  });

  // type at the end of the document
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (performance.now() - previous < frame) {
      continue;
    }

    await page.keyboard.press(
      LOREM_IPSUM[index % LOREM_IPSUM.length] as KeyInput,
    );
    index++;
    previous = performance.now();
  }
}

main()
  .then(([err, result]: Result<string>) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }

    if (result) {
      // eslint-disable-next-line no-console
      console.log(result);
      process.exit(0);
    }
  })
  .catch((error: Error) => {
    setImmediate(() => {
      throw error;
    });
  });
