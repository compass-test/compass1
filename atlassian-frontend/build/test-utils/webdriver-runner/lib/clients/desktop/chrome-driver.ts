import chromedriver from 'chromedriver';

/*
 * util module to support
 *   a. install chrome-driver
 *   b. start and stop chrome driver server
 */

export const port = 9515;
const args = ['--url-base=/', `--port=${port}`];

export async function startServer() {
  chromedriver.start(args);
  console.log('Started chrome server');
}

export function stopServer() {
  chromedriver.stop();
  console.log('Stopping chrome server');
}
