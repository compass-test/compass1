import meow from 'meow';
import { startDecisionTree } from './constants';
import type { Flags } from './types';

export default async function main(packages: string[], flags: Flags) {
  const userInput = await startDecisionTree(flags);
  // eslint-disable-next-line no-console
  console.log('userInput', userInput);
}

if (require.main === module) {
  process.on('SIGINT', () => {
    // We need our own SIGINT handler since concurrently overrides the default one (and doesn't even throw)
    process.exit(2);
  });
  const cli = meow(
    `
      Usage
        $ renovate-cfg:generate
  `,
    {
      description: 'Generate renovate.json',
    },
  );
  main(cli.input, cli.flags).catch(e => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
}
