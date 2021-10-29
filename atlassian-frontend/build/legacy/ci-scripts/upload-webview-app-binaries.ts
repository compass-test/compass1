import axios, { AxiosBasicCredentials } from 'axios';
import { execFile } from 'child_process';
import { writeFile } from 'fs';
import path from 'path';
import { promisify } from 'util';

type Platform = 'ios' | 'android';

/**
 * Automatic uploading of AFE BrowserStack App binaries.
 *
 * BrowserStack automatically deletes uploaded apps after 30 days.
 * It's based on uploaded timestamp, not last usage.
 *
 * Since our AFE app is a simple shell app containing a WebView,
 * we don't replace it with new versions on a regular cadence.
 *
 * To ensure our CI test suite remains operational, this script
 * needs to be run every 30 days to ensure the apps are still
 * available for testing.
 *
 * @see https://www.browserstack.com/app-automate/rest-api
 *
 * By default this will use the browserstack credentials set within
 * CI environment variables.
 *
 * You don't need to upload these into your own account unless you
 * intend to test out changes to the native applications locally.
 *
 * In CI, override the credentials in the provided input boxes when
 * running the custom pipeline `upload-webdriver-webview-binaries`.
 */

const asyncExecFile = promisify(execFile);
const asyncWriteFile = promisify(writeFile);

/**
 * The native app binaries from the below repositories are uploaded into the atlassian-frontend
 * repo in order to leverage existing bitbucket credentials which don't have access into the
 * alternate repos.
 *
 * @see https://bitbucket.org/atlassian/afe-browserstack-ios-app/downloads/browserstack-ios-app.ipa
 * @see https://bitbucket.org/atlassian/afe-browserstack-android-app/downloads/app-debug.apk
 */
const AF_DOWNLOADS_URL =
  'https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-frontend/downloads/';
const APP_IOS_FILENAME = 'browserstack-ios-app.ipa';
const APP_ANDROID_FILENAME = 'browserstack-android-app.apk';

// Download remote file
async function fetchAppBinary(
  filename: string,
  credentials: AxiosBasicCredentials,
) {
  const url = `${AF_DOWNLOADS_URL}${filename}`;
  console.info('Fetching:', url);
  const { data } = await axios.get(url, {
    auth: credentials,
    responseType: 'arraybuffer',
  });
  return data;
}

// Publish IPA/APK to App Automate
async function uploadToAppAutomate(
  filePath: string,
  credentials: string,
  platform: Platform,
) {
  try {
    const args = [
      '-u',
      `${credentials}`,
      '-X',
      'POST',
      `https://api-cloud.browserstack.com/app-automate/upload`,
      '-F',
      `file=@${filePath}`,
      '-F',
      `data={\"custom_id\": \"afe-browserstack-${platform}-app\"}`,
    ];

    console.log('Publish app to BrowserStack:\ncurl', args.join(' '));
    const { stdout } = await asyncExecFile('curl', args);
    const result = JSON.parse(stdout);

    if (result.app_url) {
      // `stdout` ~= {"app_url":"bs://a2b2296bcf49d936c0a54f37911db86823955f8d","custom_id":"afe-browserstack-ios-app","shareable_id":"builduser/afe-browserstack-ios-app"}
      console.info('Successful:\n' + stdout);
    } else {
      // `stderr` is the upload process output. e.g. "% Total  % Received  % Xferd  Average Speed  Time" etc
      // `stdout` is whatever unexpected response was returned. e.g.
      // {"error":"[BROWSERSTACK_APP_UNZIP_FAILED] Invalid app: The unzip of your app failed. Please verify that the app file is valid and try again."}
      throw new Error(stdout);
    }
  } catch (error) {
    const errMsg = error.message || error;
    throw new Error(
      `Failed to publish to App Automate: ${filePath}.\n` + errMsg,
    );
  }
}

// Fetch and publish app
async function publishAppToBrowserStack(
  platform: Platform,
  bitBucketCredentials: AxiosBasicCredentials,
  browserStackCredentials: string,
) {
  const filename = platform === 'ios' ? APP_IOS_FILENAME : APP_ANDROID_FILENAME;
  const appPath = path.join('./', filename);

  // Fetch app binary/package
  const app = await fetchAppBinary(filename, bitBucketCredentials);
  // Write downloaded data to disk
  await asyncWriteFile(appPath, app);

  // Upload app binaries
  await uploadToAppAutomate(appPath, browserStackCredentials, platform);
}

async function main() {
  const {
    BITBUCKET_USER,
    BITBUCKET_PASSWORD,
    BROWSERSTACK_USERNAME,
    BROWSERSTACK_KEY,
    SECURED_BROWSERSTACK_KEY,
  } = process.env;

  if (!BITBUCKET_USER || !BITBUCKET_PASSWORD) {
    throw new Error(
      'Missing Bitbucket credentials BITBUCKET_USER and/or BITBUCKET_PASSWORD.',
    );
  }

  // Secured key is provided as an optional user override, otherwise it uses the
  // pre-existing CI credentials.
  const BROWSERSTACK_PASSWORD = SECURED_BROWSERSTACK_KEY || BROWSERSTACK_KEY;

  if (!BROWSERSTACK_USERNAME || !BROWSERSTACK_PASSWORD) {
    throw new Error(
      'Missing BrowserStack credentials BROWSERSTACK_USERNAME and/or BROWSERSTACK_KEY.',
    );
  }

  const bbCreds = {
    username: BITBUCKET_USER,
    password: BITBUCKET_PASSWORD,
  };
  const bsCreds = `${BROWSERSTACK_USERNAME}:${BROWSERSTACK_PASSWORD}`;

  console.info(
    "\nPublish iOS and Android apps to BrowserStack's App Automate:\n",
  );

  await publishAppToBrowserStack('ios', bbCreds, bsCreds);
  await publishAppToBrowserStack('android', bbCreds, bsCreds);

  // All done
  console.info('\nApp Automate will delete these apps after 30 days.');
  console.info('Ensure this is run on a schedule to prevent issues in CI.\n');
  process.exit(0);
}

if (require.main === module) {
  main().catch(e => {
    console.error(e.response ? e.response : e);
    process.exit(1);
  });
}
