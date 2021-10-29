import commandLineCommands from 'command-line-commands';
import commandLineUsage from 'command-line-usage';
import commandLineArgs from 'command-line-args';

import { commands, Options } from '../src';

const usage = commandLineUsage([
  {
    header: 'Commands',
    content: Object.keys(commands),
  },
]);

const flags = [
  { name: 'dev', type: Boolean },
  { name: 'dryRun', type: Boolean },
];

async function run() {
  try {
    const { command, argv } = commandLineCommands([
      null,
      ...Object.keys(commands),
    ]);
    if (!command) {
      console.error(usage);
      // Always exit successfully to allow subsequent after-script commands to run
      process.exit(0);
    }

    const options = commandLineArgs(flags, { argv }) as Options;
    return commands[command]({ argv, options });
  } catch (err) {
    if (err && err.name && err.name === 'INVALID_COMMAND') {
      console.error('Invalid command');
    } else {
      console.error(err);
    }
    console.error(usage);
    // Always exit successfully to allow subsequent after-script commands to run
    process.exit(0);
  }
}

if (require.main === module) {
  run().catch(console.error);
}
