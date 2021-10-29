import fse from 'fs-extra';
import { promises as fsp } from 'fs';
import path from 'path';

// We want to save the artifact in `webdriver-runner`.
const cwd = process.cwd();
const buildDirectory = path.parse(cwd).dir;
const rootDirectory = path.parse(buildDirectory).dir;

// We default to `0` in case it is `undefined`.
const step = process.env.BITBUCKET_PARALLEL_STEP || '0';
const { CI } = process.env;

// Artifact directory path where we save browserstack urls into a file.
const integrationTestsArtifactsPath = path.join(
  rootDirectory,
  'integration_tests_artifacts',
);

async function createArtifactFolder() {
  try {
    await fse.mkdirp(integrationTestsArtifactsPath);
  } catch (err) {
    console.error(err);
  }
}

export async function generateArtifacts(fileContent: string) {
  // We don't want to generate the artifacts locally.
  if (CI) {
    await createArtifactFolder();
    await fsp.writeFile(
      path.join(
        integrationTestsArtifactsPath,
        `${step}_integration_tests_results.json`,
      ),
      fileContent,
    );
  }
}
