const fs = require('fs');
const path = require('path');

// Attributes should only be added to the JSON store in CI
if (!process.env.CI) {
  process.exit(0);
}

// eslint-disable-next-line prefer-const
let [key, value] = process.argv[2].split('=');

if (!isNaN(value)) {
  value = parseInt(value, 10);
} else if (!value || value === 'true' || value === 'false') {
  value = Boolean(value);
}

const fileName = path.resolve(
  __dirname,
  `../metrics-store-${process.env.BITBUCKET_PARALLEL_STEP || '0'}.json`,
);
let store;
try {
  store = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
} catch {
  store = {};
}
fs.writeFileSync(fileName, JSON.stringify({ ...store, [key]: value }));
