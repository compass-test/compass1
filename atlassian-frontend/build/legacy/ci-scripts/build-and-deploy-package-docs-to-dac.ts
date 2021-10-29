import yargs from 'yargs';
import { readFileSync } from 'fs';
import { spawn, SpawnOptions } from 'child_process';

enum TypeDocStatus {
  INSTALLED_AND_CONFIGURED = 'INSTALLED_AND_CONFIGURED',
  INSTALLED_IN_DEPENDENCIES = 'INSTALLED_IN_DEPENDENCIES',
  INSTALLED_IN_BUT_NOT_CONFIGURED = 'INSTALLED_IN_BUT_NOT_CONFIGURED',
  NOT_INSTALLED = 'NOT_INSTALLED',
}

const spawnProcess = (command: string, options?: SpawnOptions) => {
  const DEFAULT_OPTIONS: SpawnOptions = { shell: true, stdio: 'inherit' };
  return new Promise((resolve, reject) => {
    const process = spawn(command, options || DEFAULT_OPTIONS);
    process.once('exit', (code, signal) => {
      if (code === 0) {
        resolve(signal);
      } else {
        reject(signal);
      }
    });
  });
};

const generateTypedocDocs = async () =>
  await spawnProcess('bolt install && yarn typedoc');

const detectTypeDoc = (
  packageJson: any,
  packageDirectory: string,
): TypeDocStatus => {
  if (packageJson.dependencies['typedoc']) {
    console.warn(
      'Typedoc installed in dependencies instead of devDependencies, this will cause stricter errors.',
    );
    return TypeDocStatus.INSTALLED_IN_DEPENDENCIES;
  }

  let typeDocJson;

  // Error case is handled below, ignore any errors from this file read
  try {
    typeDocJson = readFileSync(`./typedoc.json`, 'UTF-8');
  } catch {}

  if (packageJson.devDependencies['typedoc'] && typeDocJson) {
    return TypeDocStatus.INSTALLED_AND_CONFIGURED;
  } else if (packageJson.devDependencies['typedoc']) {
    console.warn(
      'Typedoc is installed but not configured, remember to add a typedoc.json to the root of your package.',
    );
    return TypeDocStatus.INSTALLED_IN_BUT_NOT_CONFIGURED;
  }

  console.warn('Typedoc is not installed in this package.');
  return TypeDocStatus.NOT_INSTALLED;
};

// This is basically a recreation of the yml file here https://developer.atlassian.com/platform/writing-toolkit/queuing-documentation-for-publication/ within code
const publishDacDocs = async (docsPackageDirectory: string) => {
  const BITBUCKET_BUILD_NUMBER = process.env.BITBUCKET_BUILD_NUMBER || '2';
  const newVersion = `0.${BITBUCKET_BUILD_NUMBER}.0`;
  // Dive into the docs package after generation to release it to DAC
  process.chdir(docsPackageDirectory);

  await spawnProcess(`yarn install`);
  await spawnProcess(`yarn publish --new-version=${newVersion}`);
};

const main = async (packageDirectory: string, isDryRun: boolean) => {
  try {
    process.chdir(packageDirectory);
    const packageJson = JSON.parse(readFileSync('./package.json', 'UTF-8'));
    const docsDirectory = packageJson.dacDocsDirectory;
    // Only run if there is a dacDocsDirectory defined in package.json
    if (docsDirectory) {
      const typeDocStatus = detectTypeDoc(packageJson, packageDirectory);
      // Only run typodoc generation if typedoc is detected correctly
      if (typeDocStatus === TypeDocStatus.INSTALLED_AND_CONFIGURED) {
        console.info('Typedoc detected, running typedoc generation');
        // Generate the docs from the package if typedoc
        await generateTypedocDocs();
      } else {
        console.info('Typedoc generation skipped.');
      }

      if (!isDryRun) {
        await publishDacDocs(docsDirectory);
      } else {
        console.info('dryRun detected, skipping publish step');
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const { packageDirectory, dryRun } = yargs.options({
  packageDirectory: { type: 'string', default: '' },
  dryRun: { type: 'boolean', default: false },
}).argv;

if (require.main === module) {
  main(packageDirectory, dryRun).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
