const path = require('path');
const meow = require('meow');
const spawndamnit = require('spawndamnit');

const {
  getPackagesInfo,
  TOOL_NAME_TO_FILTERS,
} = require('@atlaskit/build-utils/tools-old');

const {
  getChangedPackages,
  getChangedPackagesWithDependents,
} = require('@atlaskit/build-utils/packages-old');

/**
 * This is a helper script to return whether or not a certain tool should be run.
 * It works by returning a zero code if a tool should be run, so that the normal usage becomes:
 *
 * `node build/legacy/ci-scripts/run.tool.if.changed.js toolName -- yarn toolName`.
 */

const cli = meow(
  `
    Usage
      $ node build/legacy/ci-scripts/run.tool.if.changed.js toolName -- yarn toolName

    Options

      --dependents='direct'          Include "direct" dependent packages.

    Examples
      $ node build/legacy/ci-scripts/run.tool.if.changed.js eslint -- yarn eslint

      $ node build/legacy/ci-scripts/run.tool.if.changed.js eslint --dependents='direct' -- yarn eslint
  `,
  {
    description:
      'This is a helper script to return whether or not a certain tool should be run. It works by returning a zero code if a tool should be run',
    flags: {
      dependents: {
        type: 'string',
      },
    },
  },
);

const root = path.resolve(__dirname, '..', '..', '..');

const runToolIfChanged = async flags => {
  // `BITBUCKET_BRANCH` is an env variable BB pipelines setup BUT it is undefined when used in a custom build.
  const { BITBUCKET_BRANCH } = process.env;

  const cwd = process.cwd();

  const args = process.argv.slice(2);

  const dashdashIndex = args.indexOf('--');

  const command = args.slice(dashdashIndex + 1);

  const toolNames = args
    .slice(0, dashdashIndex)
    .filter(arg => !arg.startsWith('--'));

  const filters = toolNames.map(toolName => {
    const filterFn = TOOL_NAME_TO_FILTERS[toolName];

    if (!filterFn) {
      console.error(
        `Invalid tool name: "${toolName}" (${Object.keys(
          TOOL_NAME_TO_FILTERS,
        ).join(', ')})`,
      );
      process.exit(1);
    }

    return filterFn;
  });

  // getChangedPackages only works when in the root
  process.chdir(root);

  const [packages, changedPackages] = await Promise.all([
    getPackagesInfo(root),
    getChangedPackages(BITBUCKET_BRANCH),
  ]);

  let changedPackageDirs = changedPackages.map(pkg => pkg.dir);

  // Packages that are dependent on the changed packages.
  // If dependencies flag is passed, CHANGED_PACKAGES will return packages that are dependent on the changed packages.
  if (flags.dependents) {
    changedPackageDirs = await getChangedPackagesWithDependents(
      changedPackages,
      flags.dependents,
    );
    // The function `getChangedPackagesWithDependents` function returns relative package path not the full path.
    changedPackageDirs = changedPackageDirs.map(pkg => path.join(root, pkg));
  }

  filters.push(pkg => changedPackageDirs.includes(pkg.dir));

  const matched = !!packages.find(pkg => filters.every(filter => filter(pkg)));

  if (!matched) {
    process.exit(0);
  }

  // change back to the original working directory before executing the command
  process.chdir(cwd);

  try {
    const res = await spawndamnit(command[0], command.slice(1), {
      stdio: 'inherit',
      tty: (process.stdout && process.stdout.isTTY) || false,
    });

    process.exit(res.code);
  } catch (err) {
    if (err instanceof spawndamnit.ChildProcessError) {
      process.exit(err.code);
    } else {
      process.exit(1);
    }
  }
};

runToolIfChanged(cli.flags).catch(e => {
  console.error(e);
  process.exit(1);
});
