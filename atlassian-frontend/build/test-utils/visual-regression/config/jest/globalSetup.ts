/* eslint-disable */
/* prettier-ignore */
import puppeteer from 'puppeteer';
import fs from 'fs';
import mkdirp from 'mkdirp';
import os from 'os';
import path from 'path';
import * as docker from '../../docker-helper';

const DIR = path.join(os.tmpdir(), 'jest_puppeteer_global_setup');
type LaunchOptions = puppeteer.BrowserConnectOptions &
  puppeteer.BrowserLaunchArgumentOptions;

/**
 * Start puppeteer service
 *  - CI start local puppeteer
 *  - Local start a docker instance running puppeteer
 */
export default async function globalSetup() {
  if (process.env.CI || process.env.VR_DEBUG) {
    // If it is in CI start puppeteer and stored websocket endpoint
    // launch and run puppeteer if inside of CI
    console.log('puppeteer:', (puppeteer as any).executablePath());
    const puppeteerOptions: LaunchOptions = {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
      ],
    };
    if (process.env.VR_DEBUG) {
      puppeteerOptions.slowMo = 100;
      puppeteerOptions.headless = false;
    }
    const browser = await puppeteer.launch(puppeteerOptions);
    (global as any).__BROWSER__ = browser;
    mkdirp.sync(DIR);
    fs.writeFileSync(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint()); // Shared endpoint with all thread nodes
  } else {
    await docker.login();
    await docker.enforceLatestImages();
    await docker.startDocker();
  }
}
