import commandLineCommands from 'command-line-commands';
import commandLineUsage from 'command-line-usage';
import path from 'path';
import globby from 'globby';

function generateUsage(ciCommands: CICommands) {
  return commandLineUsage([
    {
      header: 'Atlassian Frontend CI',
      content: 'Entrypoint for all CI scripts in Atlassian Frontend 🔥',
    },
    {
      header: 'Commands',
      content: Object.values(ciCommands).map(({ name, description }) => ({
        name,
        summary: description,
      })),
    },
  ]);
}

type CICommandRunFn = (opts: { argv: Array<string> }) => Promise<void>;

export type CICommand = {
  name: string;
  description: string;
  run: CICommandRunFn;
};

export type CICommands = {
  [name: string]: CICommand;
};

async function getCommands(): Promise<CICommands> {
  const scriptsDir = path.join(__dirname, 'scripts');
  const scripts = await globby('*.ts', { cwd: scriptsDir });
  const commands: CICommands = {};

  for (const script of scripts) {
    const name = script.replace(/.ts$/, '');
    const { run, description } = require(`${scriptsDir}/${script}`);
    commands[name] = {
      name,
      run,
      description,
    };
  }

  return commands;
}

export async function main() {
  const commands = await getCommands();
  const validCommands = Object.keys(commands);
  const usage = generateUsage(commands);

  try {
    const { command, argv } = commandLineCommands([null, ...validCommands]);
    if (!command) {
      console.error(usage);
      process.exit(1);
    }

    return commands[command].run({ argv });
  } catch (err) {
    if (err && err.name && err.name === 'INVALID_COMMAND') {
      console.error('Invalid command');
    } else {
      console.error(err);
    }
    console.error(usage);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
