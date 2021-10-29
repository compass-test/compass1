/* eslint-disable no-console */
const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { extname, join } = require('path');
const { exec } = require('child_process');

const auditResultsFilepath = join(__dirname, 'lighthouse-audit-results.txt');

const basePath = join(__dirname, '.lighthouseci/');
const auditResults = readdirSync(basePath);

const filteredResults = auditResults.filter(
  (result) => extname(result) === '.json',
);

if (!filteredResults.length) {
  console.log('No results found');
  process.exit(1);
}

const auditErrorTypeCountMap = {};

const addErrorToCountMap = (errorType) => {
  const errorCount = auditErrorTypeCountMap[errorType] || 0;
  auditErrorTypeCountMap[errorType] = errorCount + 1;
};

const stringifyErrorTypeCountMap = () => {
  return Object.entries(auditErrorTypeCountMap)
    .map(([errorType, errorCount]) => {
      return `${errorType}: ${errorCount}`;
    })
    .join('\n');
};

const getAuditsFromResultFile = (resultFilename) => {
  const resultFilePath = `${basePath}${resultFilename}`;

  try {
    const resultData = readFileSync(resultFilePath);
    return JSON.parse(resultData);
  } catch (e) {
    throw Error(`Unable to read file or parse JSON from ${resultFilePath}:`, e);
  }
};

const getFailedItems = ({ finalUrl, audits = {} }) => {
  const items = [];
  Object.keys(audits).forEach((auditId) => {
    const failedItems =
      audits[auditId] &&
      audits[auditId].details &&
      audits[auditId].details.items;
    const errorType = audits[auditId] && audits[auditId].id;
    if (!failedItems || !failedItems.length) {
      return;
    }
    items.push({ url: finalUrl, items: failedItems, errorType });
  });

  return items;
};

const writeToFile = ({ url, items, errorType }) => {
  items.forEach(({ node }) => {
    addErrorToCountMap(errorType);
    const { selector, snippet, explanation, nodeLabel } = node;
    let buf = '';
    buf += `--- ${errorType} ---\n`;
    buf += `Failed element: ${snippet}\n`;
    buf += `Node label:     ${nodeLabel}\n`;
    buf += `Selector:       ${selector}\n`;
    buf += `Explanation:    ${explanation}\n`;
    buf += `Link:           ${url}?lhciFailedSelector=${encodeURIComponent(
      selector,
    )}\n`;
    buf += `--------------\n\n`;
    writeFileSync(auditResultsFilepath, buf, {
      flag: 'a',
    });
  });
};

const processResult = (resultFilename) => {
  const results = getAuditsFromResultFile(resultFilename);
  const items = getFailedItems(results);
  items.forEach(writeToFile);
};

const main = () => {
  writeFileSync(auditResultsFilepath, ''); // prepare audit results file
  filteredResults.map(processResult);
  console.log('Lighthouse results written to:', auditResultsFilepath);
  console.log('\n');
  console.log(
    '--- Lighthouse audit error type summary ---',
    `\n${stringifyErrorTypeCountMap() || 'No errors found :)'}`,
  );
  console.log('\n');
};

main();

if (process.env.LHCI_TEST_URL) {
  // if test URL exists then we don't want to spin up local server so we exit early
  process.exit(0);
}

if (!Object.keys(auditErrorTypeCountMap).length) {
  // If there were no errors then no need to spin up local server
  process.exit(0);
}

const server = exec('gatsby serve');

server.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

server.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
});

server.on('exit', (code) => {
  console.log(`child process exited with code ${code}`);
});
