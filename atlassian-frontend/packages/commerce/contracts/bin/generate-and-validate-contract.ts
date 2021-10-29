/* eslint-disable no-console */
import { job } from './generate-contract';
import { exec } from 'child_process';
import { dirname } from 'path';

(async () => {
  await job;

  console.log('validating...');
  return new Promise<void>((resolve, reject) => {
    exec(
      'yarn validate',
      {
        cwd: dirname(__dirname),
      },
      (error, stdout, err) => {
        if (error) {
          reject(error);
        }
        console.log(stdout);
        resolve();
      },
    );
  });
})().catch(err => {
  console.error(err);
  process.exit(1);
});
