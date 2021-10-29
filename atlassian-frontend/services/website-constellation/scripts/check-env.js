const fs = require('fs-extra');
const path = require('path');

function run() {
  return fs.exists(path.join(__dirname, '../.env')).then((result) => {
    if (!result) {
      throw new Error(`Could not find constellation-website/.env file
You can find the data in LastPass under the name "CONSTELLATION_LOCAL_CREDS".

Once you have the data run these commands:

cd services/website-constellation
touch .env

And then add the data to the created .env file.
Read http://go/dsd-local-dev for more information.
`);
    }
  });
}

module.exports = run;
