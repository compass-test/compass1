const fs = require('fs-extra');
const path = require('path');
const url = require('url');

function generateRedirects() {
  const redirectFile = fs.readFileSync(
    path.resolve(__dirname, '../../server/_redirects.txt'),
    'utf-8',
  );
  const redirectsArray = redirectFile
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const lineItemsArray = line.split(/\s+/);
      const origin = url.parse(lineItemsArray[0]);
      if (origin.pathname !== '/') {
        return [origin.pathname, lineItemsArray[2]];
      }
      return null;
    })
    .filter((i) => i);

  fs.writeFileSync(
    path.resolve(__dirname, '../../server/constants/redirect-urls.js'),
    `
    /**
      THIS IS A CODE-GENERATED FILE PLEASE DO NOT EDIT
      TO MAKE CHANGES TO THIS FILE PLEASE FIRST READ THE README IN
      scripts/generate-redirect-list/README.md
    */
    module.exports = ${JSON.stringify(redirectsArray, null, 2)}`,
    'utf-8',
  );
}

generateRedirects();
