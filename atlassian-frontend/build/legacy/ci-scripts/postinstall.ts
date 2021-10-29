/**
 * Postinstall script
 *
 * Links specific internal packages to the root
 */
import chalk from 'chalk';
import child_process from 'child_process';
import util from 'util';
import * as bolt from 'bolt';
import fs from 'fs';
import path from 'path';
import {
  shouldUpdateIntellijImlFile,
  updateIntellijImlFile,
} from './intellij-ignore-node-modules';

const exec = util.promisify(child_process.exec);

/**
 * Packages required to be resolveable in root
 */
const packagesToLink = [
  '@atlassian/code-evolution-issue-reporter',
  // For stricter
  '@atlassian/frontend-techstack',
  '@repo/internal-techstack',
  '@atlassian/techstack-runtime',
  '@atlassian/eslint-plugin-tangerine',
  '@repo/eslint-plugin-internal',
  '@atlassian/stricter-plugin-tangerine',
  '@atlassian/eslint-resolver-plugin-tangerine',
  '@repo/stricter-plugin-rules',
  '@atlaskit/eslint-plugin-design-system',
  '@atlassian/stricter-plugin-techstack',
  // For eslintrc.js
  '@atlaskit/build-utils',
  '@atlassian/atlassian-frontend-prettier-config',
  // For .storybook/webpack.config.js
  '@atlaskit/multi-entry-tools',
];

function linkExists(filepath: string) {
  try {
    // Use lstatSync to stat the link itself and not the file it refers to
    fs.lstatSync(filepath);
    return true;
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false;
    }
    throw e;
  }
}

async function main({ cwd = process.cwd() } = {}) {
  const project = await bolt.getProject({ cwd });
  const workspaces = await bolt.getWorkspaces({ cwd });

  const workspacesToLink = workspaces.filter(pkg =>
    packagesToLink.includes(pkg.name),
  );

  for (const workspace of workspacesToLink) {
    const symlinkPath = path.join(
      project.dir,
      'node_modules',
      workspace.config.name,
    );
    const symlinkPathParts = symlinkPath.split(path.sep);
    const symlinkDir = symlinkPathParts.slice(0, -1).join(path.sep);
    if (linkExists(symlinkPath)) {
      await exec(`rm -rf ${symlinkPath}`);
    }
    if (!fs.existsSync(symlinkDir)) {
      await exec(`mkdir ${symlinkDir}`, {
        cwd: project.dir,
      });
    }
    await exec(`ln -s ${workspace.dir} ${symlinkPath}`, {
      cwd: project.dir,
    });
  }

  const linkedPackageNames = workspacesToLink.map(pkg => pkg.name).join(' ');

  console.log(`Successfully linked ${linkedPackageNames} to the project root`);

  if (await shouldUpdateIntellijImlFile()) {
    await updateIntellijImlFile();
  }
}

if (require.main === module) {
  main().catch(e => {
    console.error(chalk.red('Post install script failed'));
    console.error(e);
    process.exit(1);
  });
}
