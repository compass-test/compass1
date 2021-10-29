import path from 'path';
import chalk from 'chalk';
import spawndamnit from 'spawndamnit';
import deployLambda from './deploy-lambda';

const helpMessage = chalk`
{bold USAGE}
  $ npx micros-support [command] [args]

{bold COMMANDS}
  {yellow deploy-lambda}    Deploy a lambda to micros
  {yellow install-atlas}    Install the atlas CLI
  {yellow start-nanos}      Spin up nanos
`;

const args = process.argv.slice(2);
const command = args.shift();

const exec = (scriptName: string) =>
  spawndamnit(
    'sh',
    [path.relative(process.cwd(), `${__dirname}/${scriptName}.sh`), ...args],
    {
      stdio: 'inherit',
    },
  );

export async function run() {
  switch (command) {
    case 'deploy-lambda':
      return deployLambda();
    case 'install-atlas':
      return exec('install-atlas');
    case 'start-nanos':
      return exec('start-nanos');
    default:
      console.log(helpMessage);
  }
}
