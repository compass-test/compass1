const puppeteer = require('puppeteer');
const { readdirSync, statSync } = require('fs');
const { extname } = require('path');

const acceptedFileExt = ['.html'];

const ignoreFolders = `^((?!\/components).)*$`; // for now only collect component folders

const walkSync = (dir = '', ignoreDirs = '', filelist = []) => {
  if (dir[dir.length - 1] !== '/') {
    dir = dir.concat('/');
  }

  const files = readdirSync(dir);
  filelist = filelist || [];
  files.forEach((file) => {
    const filePath = `${dir}${file}`;
    const isDirectory = statSync(filePath).isDirectory();
    if (
      file.includes('node_modules') ||
      (ignoreDirs && new RegExp(ignoreDirs).test(filePath))
    ) {
      return;
    }

    if (isDirectory) {
      filelist = walkSync(`${filePath}/`, ignoreDirs, filelist);
    } else if (acceptedFileExt.includes(extname(file))) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

// target specific URL or default to local server
const baseURL = process.env.LHCI_TEST_URL || 'http://localhost:9000';

const urls = walkSync('./public', ignoreFolders)
  .filter((item) => item && !!item.match(/components\/.+/gi)) // only collect components child pages
  .map((item) =>
    item.replace('./public', `${baseURL}`).replace('index.html', ''),
  );

module.exports = {
  ci: {
    collect: {
      chromePath: puppeteer.executablePath(),
      settings: {
        emulatedFormFactor: 'desktop',
        onlyCategories: ['accessibility'], // accessibility only for now
        chromeFlags: [
          '--headless',
          'CI' in process.env && '--no-sandbox',
        ].filter(Boolean),
      },
      numberOfRuns: 1,
      ...(!process.env.LHCI_TEST_URL && {
        startServerCommand: 'gatsby serve',
        startServerReadyPattern: 'You can now view',
        startServerReadyTimeout: 10000,
      }),
      url: urls,
    },
  },
};
