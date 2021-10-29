/* eslint-disable */
/* prettier-ignore */
import os from 'os';
import path from 'path';
import puppeteer from 'puppeteer';
import rimraf from 'rimraf';
const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
// @ts-ignore
import { getDockerWsEndpoint } from './jsdomEnvironment';
import * as docker from '../../docker-helper';

/**
 * Shutdown all puppeteer services
 *  - CI stop local puppeteer
 *  - Local stop docker
 */
export default async function globalTeardown() {
  if (process.env.CI || process.env.VR_DEBUG) {
    // Close browser created in globalSetup and remove web socket file
    await (global as any).__BROWSER__.close();
    rimraf.sync(DIR);
  } else {
    try {
      // Connect to docker puppeteer to close browser
      const wsEndpoint = await getDockerWsEndpoint();
      const dockerBrowser = await puppeteer.connect({
        browserWSEndpoint: wsEndpoint,
        ignoreHTTPSErrors: true,
      });
      await dockerBrowser.close();

      // Stop docker execution
      await docker.stopDocker();
    } catch (err) {
      console.error(err.toString());
    }
  }
}
