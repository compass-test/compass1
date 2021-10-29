import yargs from 'yargs';
import { getConfluenceTokens } from '../get-confluence-tokens';

type Result<T> = [Error, null] | [null, T];

const cli = yargs
  .option('username', { type: 'string', demandOption: true })
  .option('password', { type: 'string', demandOption: true })
  .option('pretty', { type: 'boolean' })
  .option('url', { type: 'string', demandOption: true }).argv;

async function main(): Promise<Result<string>> {
  const tokenResult = await getConfluenceTokens({
    username: cli.username,
    password: cli.password,
    url: cli.url,
  });

  if (tokenResult[0] !== null) {
    return tokenResult;
  }

  const [, { session, xsrf }] = tokenResult;

  const output = cli.pretty
    ? [`cloud.session.token: ${session}`, `atl.xsrf.token: ${xsrf}`].join('\n')
    : [session, xsrf].join(':');

  return [null, output];
}

main()
  .then(([err, result]: Result<string>) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      process.exit(1);
    }

    if (result) {
      // eslint-disable-next-line no-console
      console.log(result);
      process.exit(0);
    }
  })
  .catch((error: Error) => {
    setImmediate(() => {
      throw error;
    });
  });
