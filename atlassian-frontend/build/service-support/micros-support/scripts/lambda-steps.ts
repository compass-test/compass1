import chalk from 'chalk';
import spawndamnit from 'spawndamnit';
import path from 'path';
import {
  uploadLambdaZip,
  microsResourceSet,
  microsDeploy,
  getArtefactLocation,
  MicrosEnvStrings,
} from './micros-steps';
import fs from 'fs';
import util from 'util';

const readFile = util.promisify(fs.readFile);

const BUNDLE_DESTINATION = 'dist/bundle.js';

const bundle = (cwd: string) => {
  console.log(chalk.yellow('Bundling...'));
  return spawndamnit(
    'yarn',
    [
      'rollup',
      '-c',
      path.resolve(cwd, __dirname, '../config/rollup.config.js'),
      '--file',
      BUNDLE_DESTINATION,
    ],
    {
      cwd,
      stdio: 'inherit',
    },
  );
};

const compressBundle = (cwd: string, zipdestination: string) => {
  console.log(chalk.yellow('Compressing bundle...'));

  return spawndamnit('zip', ['-r', zipdestination, BUNDLE_DESTINATION], {
    cwd,
    stdio: 'inherit',
  });
};

const getPackageVersion = async (cwd: string) => {
  return JSON.parse(
    (await readFile(`${cwd}/package.json`)).toString(),
  ).version.replace(/\./g, '_');
};

export const deploy = async (
  targetPath: string,
  serviceName: string,
  fileName: string,
  env: MicrosEnvStrings,
  useResourceSet: boolean,
  isCi: boolean,
  isSox: boolean,
  dryRun: boolean,
) => {
  const cwd = path.resolve(targetPath);
  const packageVersion = await getPackageVersion(cwd);
  // Artefact names must be unique so we always append current time to ensure this step does not fail
  const releaseVersion = `${packageVersion}-${new Date().getTime()}`;
  await bundle(cwd);

  const zipdestination = `dist/${releaseVersion}.zip`;
  const artefact = getArtefactLocation(serviceName, releaseVersion, isSox);

  await compressBundle(cwd, zipdestination);

  await uploadLambdaZip(
    cwd,
    zipdestination,
    serviceName,
    env,
    isCi,
    artefact,
    isSox,
    dryRun,
    releaseVersion,
  );

  if (useResourceSet) {
    await microsResourceSet(
      cwd,
      artefact,
      serviceName,
      fileName,
      env,
      isCi,
      isSox,
      dryRun,
      releaseVersion,
    );
  } else {
    await microsDeploy(
      cwd,
      artefact,
      serviceName,
      fileName,
      env,
      isCi,
      dryRun,
      releaseVersion,
    );
  }
};
