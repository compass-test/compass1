import { generateContract } from '../src/contract-generator';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

// using build-info.json as generally git-ignored medium
const writeTo = resolve(__dirname, '../contract-mocks/build-info.json');
const workingDir = resolve(__dirname, '..');

const target = process.argv[process.argv.indexOf('--') + 1];

const job = (async () => {
  // eslint-disable-next-line no-console
  console.log('creating mocks for ', target);
  const mocks = await generateContract(require(`${target}/mocks`), workingDir);

  writeFileSync(
    writeTo,
    JSON.stringify(
      {
        mocks,
      },
      null,
      2,
    ),
  );
})();

export { job };
