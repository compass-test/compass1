import meow from 'meow';
import main from './main';
import chalk from 'chalk';

import { CliFlags } from './types';

export async function run() {
  const cli = meow(
    `
Usage
  $ npx @atlassian/code-evolution-issue-reporter [options]

Options
  --eslintOutputFile, -e Points to output file of eslint generated with "json" format
  --config, -c Issue reporter config path.
  --path, -p Path which will be scanned.
  --help Help me 😱
`,
    {
      flags: {
        eslintOutputFile: {
          type: 'string',
          alias: 'e',
        },
        configPath: {
          type: 'string',
          alias: 'c',
        },
      },
    },
  );
  const { eslintOutputFile, configPath } = cli.flags as CliFlags;
  main(eslintOutputFile, configPath).catch((e) => {
    console.error(chalk.red(e));
    process.exit(1);
  });
}
