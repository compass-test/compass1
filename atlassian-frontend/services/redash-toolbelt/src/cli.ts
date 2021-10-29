import yargs from 'yargs';
import { clone } from './clone';

yargs
  .strict()
  .demandCommand()
  .command('clone', 'clone a dashboard', (yargs) => {
    const cli = yargs
      .example('$0 -u=<url>', 'shallow clone')
      .example('$0 -u=<url> -d', 'deep clone')
      .example('$0 -u=<url> -n', 'named clone')
      .option('url', { type: 'string', required: true, alias: 'u' })
      .option('name', { type: 'string', alias: 'n' })
      .option('deep', { type: 'boolean', alias: 'd' })
      .option('key', {
        type: 'string',
        default: process.env.REDASH_API_KEY!,
        demandOption: true,
        alias: 'k',
      })
      .demandOption(
        'key',
        '-k, --key or REDASH_API_KEY are required. Get api key at https://redash.data.internal.atlassian.com/users/me',
      );

    wrap(clone)(cli.argv);
  })
  .example('$0 clone -u=<url>', 'shallow clone')
  .example('$0 clone -u=<url> -d', 'deep clone')
  .example('$0 clone -u=<url> -n <name>', 'named clone').argv;

function wrap(fn: (...args) => Promise<Error | string>) {
  return async (...args) => {
    try {
      const result = await fn(...args);
      if (result instanceof Error) {
        console.error(result.message);
        process.exit(1);
      }
      console.log(result);
    } catch (err) {
      setTimeout(() => {
        throw err;
      });
    }
  };
}
