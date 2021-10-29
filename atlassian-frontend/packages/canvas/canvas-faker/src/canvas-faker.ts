import fs from 'fs';
import path from 'path';
import yargs from 'yargs';
import { generateDocument } from './generate-document';

const cli = yargs
  .strict()
  .option('canvasSize', {
    type: 'number',
    default: 3000,
  })
  .option('nodeSize', {
    type: 'number',
    default: 100,
  })
  .option('nodeCount', {
    type: 'number',
    default: 2000,
  })
  .option('seed', {
    type: 'number',
    default: 1,
  })
  .option('config', {
    type: 'string',
  })
  .option('name', {
    type: 'string',
  })
  .option('cwd', {
    type: 'string',
    default: process.cwd(),
  })
  .option('outDir', {
    type: 'string',
  })
  .option('outPath', {
    type: 'string',
  });

type Flags = typeof cli.argv;

async function main(flags: Flags) {
  const configPath = flags.config
    ? path.resolve(flags.cwd, flags.config)
    : undefined;
  const maybeConfig = configPath ? require(configPath) : undefined;
  const config = Array.isArray(maybeConfig) ? maybeConfig : [maybeConfig];

  const tasks = flags.config
    ? config.map(c => ({
        ...c,
        ...flags,
        outPath:
          c.outPath ??
          path.resolve(flags.cwd, flags.outDir ?? '', `${c.name}.json`),
      }))
    : [flags];

  await Promise.all(
    tasks.map(async task => {
      const document = generateDocument(task);
      const outName = task.outPath ?? `${task.name}.json`;
      const outPath = path.resolve(task.cwd, task.outDir ?? '', outName);
      await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
      await fs.promises.writeFile(
        outPath,
        JSON.stringify(document, null, '  '),
      );
    }),
  );
}

main(cli.argv).catch(err => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});
