import { exec } from '../io/io';
import type { Test, Verbosity } from '../types';

/**
 * Invoke a codemod to run the desired transformer against a test file.
 *
 * Example stdout response from jscodeshift:
 *
 * All done.
 * Results:
 * 0 errors
 * 0 unmodified
 * 2 skipped
 * 1 ok
 * Time elapsed: 00.000 seconds
 */
export default async function executeCodemodCommand(
  test: Test,
  comment: string,
  transformer: string,
  verbosity: Verbosity = 'none',
) {
  const { ancestorLabels, testName, path } = test;
  let filePath = path;
  if (filePath.startsWith('/')) {
    filePath = filePath.substr(1);
  }
  const escapedTest = `'${testName.split("'").join("'\\''")}'`;
  const escapedComment = `'${comment.split("'").join("\\'")}'`;
  const escapedAncestorLables = `'${ancestorLabels.split("'").join("\\'")}'`;
  const options = [
    `--comment=${escapedComment}`,
    `--testName=${escapedTest}`,
    `--ancestorLabels=${escapedAncestorLables}`,
    '--parser ts',
    '--extensions ts,tsx,js,jsx',
    `--transform ${transformer}`,
  ];
  const command = `npx jscodeshift ${options.join(' ')} ${filePath}`;
  if (verbosity !== 'none') {
    console.log('Execute command:\n\t', command);
  }

  try {
    const { stdout, stderr } = await exec(command);

    if (stderr) {
      throw new Error(stderr);
    }
    if (stdout) {
      // Trim results to only the numerical output (e.g. "0 errors", "1 ok")
      const results = stdout
        .split('\n')
        // The output is colorised so we discard the special character prefix and suffixes.
        .map(s => {
          return s
            .trim()
            .replace(/[^0-9a-zA-Z ]/g, '')
            .replace(/[0-9]{2}m/g, '');
        })
        .filter(s => {
          const count = Number.parseInt(s.substr(0));
          return Number.isInteger(count) && count > 0;
        });
      if (verbosity !== 'none') {
        console.log(
          verbosity === 'high'
            ? stdout
            : `Modifications: ${results.join(', ')}`,
        );
      }

      const didSkipTest = results.some(s => s.includes('ok'));
      if (!didSkipTest) {
        console.warn(`Codemod failed to skip: ${filePath}`);
      }
      return didSkipTest;
    }
    return false;
  } catch (error) {
    console.error('exec error:', error);
    throw error;
  }
}
