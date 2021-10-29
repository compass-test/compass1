/* eslint-disable no-console */
// eslint-disable-next-line import/no-dynamic-require
const path = require('path');

// eslint-disable-next-line import/no-dynamic-require
const nanosEnv = require(path.join(process.cwd(), './nanos-env.json'));

const fetch = require('node-fetch');

module.exports = async () => {
  const baseUrl = nanosEnv.BASE_URL;

  try {
    const result = await fetch(baseUrl);
    if (result.statusCode !== 200) {
      throw new Error("Nano's does not seem to be online, starting it up now");
    }
    console.log('Found existing Nano instance will use that');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};
