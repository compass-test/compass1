/**
 * This is the utility to generate list of excluded folders for Intellij IDEA workspace file.
 * This is needed to avoid Intellij going nuts from node_modules that eventually have
 * cycle references (thx, bolt).
 * For more information see https://hello.atlassian.net/wiki/spaces/~amotsjonov/blog/2018/02/05/214075851/Intellij+IDEA+WebStorm+Atlaskit+bolt+mk-2+edition
 * In case of any Questions about this file or what it is doing,
 * feel free to Aleksandr "Sasha" Motsjonov (@sasha/@amotsjonov)
 *
 * Usage:
 *  - In case of cold start:
 *    1. Clone the repo
 *    2. Open it in Intellij
 *    3. Do the `bolt`
 *  - In case of existing Intellij IDEA setup:
 *    1. Do the `bolt`
 */

import { basename, normalize, relative, join } from 'path';
import fs from 'fs';
import { promisify } from 'util';
import chalk from 'chalk';
import * as bolt from 'bolt';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

const ROOT = normalize(`${__dirname}/../../..`); // with __dirname being build/legacy/ci-scripts
const BASENAME = basename(ROOT);
const IDEA_FOLDER = normalize(`${ROOT}/.idea`);
const IML_FILE_PATH = normalize(`${IDEA_FOLDER}/${BASENAME}.iml`);
const MODULE_IML_PATH = normalize(`${ROOT}/${BASENAME}.iml`);
const FILE_MODULE_PREFIX = 'file://$MODULE_DIR$';
const ALT_FILE_MODULE_PREFIX = 'file://$MODULE_DIR$/';
const CONTENT_END_TAG = '</content>';
const START_TAG = `<!-- BOLT IGNORE -->`;
const END_TAG = `<!-- /BOLT IGNORE -->\n`;

const getSelfEnclosedTag = (prefix: string) => `<content url="${prefix}" />`;

const exists = async (path: string) => {
  try {
    await access(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

const getPathFromExcludeFolderUrl = (excludeFolderUrl: string) => {
  const urlResult = excludeFolderUrl.match(/\$MODULE_DIR\$\/\/?(.*)"/);
  if (urlResult !== null) {
    return normalize(urlResult[1]);
  }
};

const getImlContents = async () => {
  const [isImlModule, isImlFile] = await Promise.all([
    exists(MODULE_IML_PATH),
    exists(IML_FILE_PATH),
  ]);

  let imlContents: string;
  if (isImlModule) {
    console.log(`Directory is an idea module. Updating iml file.`);
    imlContents = (await readFile(MODULE_IML_PATH)).toString();
  } else if (isImlFile) {
    imlContents = (await readFile(IML_FILE_PATH)).toString();
  } else {
    throw new Error(
      `No ${IML_FILE_PATH} nor ${MODULE_IML_PATH} found. Open project in Intellij IDEA first.`,
    );
  }

  imlContents = imlContents.replace(
    `url="${ALT_FILE_MODULE_PREFIX}"`,
    `url="${FILE_MODULE_PREFIX}"`,
  );

  const selfEnclosedTag = getSelfEnclosedTag(FILE_MODULE_PREFIX);
  if (imlContents.includes(selfEnclosedTag)) {
    imlContents = imlContents.replace(
      selfEnclosedTag,
      `<content url="${FILE_MODULE_PREFIX}">\n${CONTENT_END_TAG}`,
    );
  }

  return imlContents;
};

const getUserExcludeFolderPaths = (
  imlContents: string,
  startIndex: number,
  endIndex: number,
) => {
  let userContent = imlContents;
  if (startIndex !== -1 && endIndex !== -1) {
    // We want use only non-generated content to be able to see user specified exclusions
    userContent =
      imlContents.substr(0, startIndex) +
      imlContents.substr(endIndex + END_TAG.length);
  }

  const existingExcludeFoldersRegex = /<excludeFolder url="(.*)" \/>/g;
  const existingExcludeFoldersResult = userContent.match(
    existingExcludeFoldersRegex,
  );
  const existingUrls: string[] = [];
  if (existingExcludeFoldersResult !== null) {
    existingExcludeFoldersResult.forEach(result => {
      const existingUrl = getPathFromExcludeFolderUrl(result);
      if (existingUrl) {
        existingUrls.push(existingUrl);
      }
    });
  }

  return existingUrls;
};

const getNewExcludeFolders = async (existingUrls: string[]) => {
  const allWorkspaces = await bolt.getWorkspaces({
    cwd: ROOT,
  });

  return allWorkspaces
    .map(workspace => join(relative(ROOT, workspace.dir), 'node_modules'))
    .concat('node_modules')
    .filter(folder => existingUrls.indexOf(folder) === -1)
    .map(folder => `<excludeFolder url="${FILE_MODULE_PREFIX}/${folder}" />`);
};

export const shouldUpdateIntellijImlFile = async () => {
  const [isImlModule, isImlFile] = await Promise.all([
    exists(MODULE_IML_PATH),
    exists(IML_FILE_PATH),
  ]);

  return isImlModule || isImlFile;
};

export const updateIntellijImlFile = async () => {
  console.log(
    'Generating list of excluded folders for Intellij IML config ...',
  );
  const startTime = Date.now();
  const imlContents = await getImlContents();

  const contentEndTagIndex = imlContents.lastIndexOf(CONTENT_END_TAG);

  // If the </content> tag doesn't exists, there's no point.
  if (contentEndTagIndex === -1) {
    throw new Error(
      `We couldn't find the ${CONTENT_END_TAG} in your ${IML_FILE_PATH} file.`,
    );
  }

  const startIndex = imlContents.indexOf(START_TAG),
    endIndex = imlContents.lastIndexOf(END_TAG);

  const existingUrls = getUserExcludeFolderPaths(
    imlContents,
    startIndex,
    endIndex,
  );

  const newExcludes = await getNewExcludeFolders(existingUrls);

  const hasPrevGeneratedExcludes = startIndex !== -1 && endIndex !== -1;

  let beforeContent;
  let afterContent;

  if (hasPrevGeneratedExcludes) {
    beforeContent = imlContents.substr(0, startIndex);
    afterContent = imlContents.substr(endIndex + END_TAG.length);
  } else {
    beforeContent = imlContents.substr(0, contentEndTagIndex);
    afterContent = imlContents.substr(contentEndTagIndex);
  }
  const middleContent = `${START_TAG}\n${newExcludes.join(`\n`)}\n${END_TAG}`;

  const newContent = beforeContent + middleContent + afterContent;

  const isImlModule = await exists(MODULE_IML_PATH);
  const imlFilePath = isImlModule ? MODULE_IML_PATH : IML_FILE_PATH;

  await writeFile(imlFilePath, newContent);

  console.log(
    `File written at: ${imlFilePath} in ${(Date.now() - startTime) / 1000}s`,
  );
};

if (require.main === module) {
  updateIntellijImlFile().catch(e => {
    console.error(chalk.red('Intellij ignore script failed'));
    console.error(e);
    process.exit(1);
  });
}
