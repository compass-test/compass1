import meow from 'meow';
import chalk from 'chalk';

import { generateDeclarations } from './index';

const HELP_MSG = `
    ${chalk.yellow.bold('Usage: flow-cli [generate] [options]')}

      ${chalk.green('Examples')}
        ${chalk.bold('$ yarn run flow-cli generate')}
            ${chalk.yellow(
              '--source',
            )}  ./node_modules/@atlaskit/analytics-next/dist/esm/index.d.ts
            ${chalk.yellow(
              '--destination',
            )}  ./src/packages/platform/repo-tools/flowtype/src/definitions/@atlaskit/analytics-next/index.js.flow
            ${chalk.yellow(
              '--extraDeclarations',
            )}  ./src/packages/platform/repo-tools/flowtype/src/flow-cli/extra-declarations
            ${chalk.yellow(
              '--config',
            )}  ./src/packages/platform/repo-tools/flowtype/src/flow-cli/config.json
            ${chalk.yellow('--debugFiles')}  ./packages/jira/flow-cli/.debug

        ${chalk.bold('$ yarn run flow-cli generate')}
            ${chalk.yellow(
              '-S',
            )}  ./node_modules/@atlaskit/analytics-next/dist/esm/index.d.ts
            ${chalk.yellow(
              '-T',
            )}  ./src/packages/platform/repo-tools/flowtype/src/definitions/@atlaskit/analytics-next/index.js.flow
            ${chalk.yellow(
              '-E',
            )}  ./src/packages/platform/repo-tools/flowtype/src/flow-cli/extra-declarations
            ${chalk.yellow(
              '-C',
            )}  ./src/packages/platform/repo-tools/flowtype/src/flow-cli/config.json
            ${chalk.yellow('-D')}  ./packages/jira/flow-cli/.debug

      ${chalk.green('Options')}
        ${chalk.yellow('--source')} folder which contains custom declarations
        ${chalk.yellow('--target')} folder which contains custom declarations
        ${chalk.yellow(
          '--extraDeclarations',
        )} project specific extra declaration overwrites (optional)
        ${chalk.yellow('--config')} project specific extra config (optional)
        ${chalk.yellow(
          '--debugFiles',
        )} if provided additional files will be written for debug purposes (optional)
`;

export async function run() {
  const cli = meow(HELP_MSG, {
    flags: {
      source: {
        type: 'string',
        alias: 'S',
      },
      target: {
        type: 'string',
        alias: 'T',
      },
      extraDeclarations: {
        type: 'string',
        alias: 'E',
      },
      config: {
        type: 'string',
        alias: 'C',
      },
      debugFiles: {
        type: 'string',
        alias: 'D',
      },
    },
  });

  const [command] = cli.input;

  if (command === 'generate') {
    if (!cli.flags.source) {
      console.error(chalk.red('Must pass source file path'));
      process.exit(1);
    }
    if (!cli.flags.target) {
      console.error(chalk.red('Must pass destination file path'));
      process.exit(1);
    }
    return generateDeclarations(
      cli.flags.source,
      cli.flags.target,
      cli.flags.extraDeclarations,
      cli.flags.config,
      cli.flags.debugFiles,
    ).catch((e) => {
      console.error(cli.help);
      console.error(chalk.red(e.message));
      process.exit(1);
    });
  }

  return Promise.resolve(console.log(cli.help));
}
