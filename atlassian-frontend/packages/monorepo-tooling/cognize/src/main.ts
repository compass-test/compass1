/* eslint-disable no-param-reassign,no-console */
import { readdirSync, statSync, readFileSync } from 'fs';
import { extname, join } from 'path';
import { cwd, exit } from 'process';
import { transformFileSync } from '@babel/core';
import { showHelp } from 'yargs';

import plugin from './babel-plugin';

import { ArgsvParse } from './types';

const getAbsolutePath = (filePath: string) => {
  if (!filePath) {
    return '';
  }
  return join(cwd(), `${filePath}`);
};

const acceptedFileExt = ['.js', '.jsx', '.ts', '.tsx'];

const walkSync = (
  dir: string = '',
  targetImports: string = '',
  ignoreDirs: string = '',
  filelist: any = [],
) => {
  if (dir[dir.length - 1] !== '/') {
    dir = dir.concat('/');
  }

  const files = readdirSync(dir);
  filelist = filelist || [];
  files.forEach((file: string) => {
    if (
      file.includes('node_modules') ||
      file.includes('.git') ||
      (ignoreDirs && new RegExp(ignoreDirs).test(file))
    ) {
      return;
    }
    const filePath = `${dir}${file}`;
    if (statSync(filePath).isDirectory()) {
      filelist = exportFunctions.walkSync(
        `${filePath}/`,
        targetImports,
        ignoreDirs,
        filelist,
      );
    } else if (
      acceptedFileExt.includes(extname(file)) &&
      readFileSync(filePath, 'utf8').match(targetImports)
    ) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const transformAndLogDetails = (
  filesToParse: string[],
  targetImports: string,
  customLogger: string,
  ignoreDirs: string,
) => {
  filesToParse.forEach((filePath) => {
    const absoluteFilePath: string = exportFunctions.getAbsolutePath(filePath);
    const absolutePathToLogFunction: string = exportFunctions.getAbsolutePath(
      customLogger,
    );

    try {
      exportFunctions.transformFileSync(absoluteFilePath, {
        filename: absoluteFilePath,
        rootMode: 'upward-optional',
        root: absoluteFilePath,
        configFile: true,
        babelrc: true,
        overrides: [
          {
            plugins: [
              [
                plugin,
                {
                  targetImports,
                  customLogger: absolutePathToLogFunction,
                  ignoreDirs,
                },
              ],
            ],
          },
        ],
      });
    } catch (err) {
      console.error(err);
    }
  });
};

const checkRequiredArgs = (
  filesDirectory: string = '',
  targetImports: string = '',
) => {
  if (!filesDirectory || !targetImports) {
    showHelp();
    console.log(
      '\n!!! You must supply both a path to a directory to scan and the target packages to track !!!\n',
    );
    exit(1);
  }
};

const parseAndTransform = (
  filesDirectory: string = '',
  targetImports: string = '',
  customLogger: string = '',
  ignoreDirs: string = '',
) => {
  const filesToParse = exportFunctions.walkSync(
    filesDirectory,
    targetImports,
    ignoreDirs,
  );
  if (filesToParse.length === 0) {
    console.log('Directory has no files to parse');
    exit(1);
  }
  exportFunctions.transformAndLogDetails(
    filesToParse,
    targetImports,
    customLogger,
    ignoreDirs,
  );
};

const getConfigFile = (configPath: string) => require(join(cwd(), configPath));

const main = (argvsParse: ArgsvParse) => {
  try {
    const { c, l, d, t, i } = argvsParse;
    if (c) {
      //check if Config file is present in the args
      const {
        targetImports,
        filesDirectory,
        customLogger,
        ignoreDirs,
      } = exportFunctions.getConfigFile(c);

      exportFunctions.checkRequiredArgs(
        d || filesDirectory,
        t || targetImports,
      );
      exportFunctions.parseAndTransform(
        d || filesDirectory,
        t || targetImports,
        l || customLogger,
        i || ignoreDirs,
      );
    } else {
      exportFunctions.checkRequiredArgs(d, t);
      exportFunctions.parseAndTransform(d, t, l, i);
    }
  } catch (err) {
    console.log(err);
  }
};

const exportFunctions = {
  main,
  getConfigFile,
  walkSync,
  parseAndTransform,
  transformFileSync,
  transformAndLogDetails,
  getAbsolutePath,
  checkRequiredArgs,
};

export default exportFunctions;
