import yargs from 'yargs';

import program from './main';

export async function run() {
  const argvsParse = yargs
    .usage('Usage: $0 [options]')
    .option('c', {
      alias: 'config',
      desc: 'Path to config file',
      type: 'string',
    })
    .option('l', {
      alias: 'logger',
      desc: 'Path to custom logging function',
      type: 'string',
    })
    .option('d', {
      alias: 'directory',
      desc: 'Path to directory to scan',
      type: 'string',
    })
    .option('t', {
      alias: 'targets',
      type: 'string',
      desc: 'Regex of target packages to track',
    })
    .option('i', {
      alias: 'ignore',
      type: 'string',
      desc: 'Regex of files to ignore',
    }).argv;

  program.main(argvsParse);
}
