import fs from 'fs';
import { JestResultSummary } from './types';
import { suppressEslint } from './suppress-eslint';

async function suppressJestEslint(
  jestResults: JestResultSummary,
  rule: string,
  comment?: string,
) {
  if (jestResults.success) {
    console.log('Jest reported success, no need for suppression');
    return;
  }

  const failedJestTests = jestResults.testResults.filter(
    test => test.status === 'failed',
  );
  const failedLintResults = failedJestTests
    .map(test => {
      try {
        return JSON.parse(test.message);
      } catch (e) {
        console.log(
          `Could not parse lint output for ${test.name} - must be valid json`,
        );
        return null;
      }
    })
    .filter(Boolean)
    // Flatten each lint result into a single array
    .reduce((acc, cur) => [...acc, ...cur], []);

  await suppressEslint(failedLintResults, rule, comment);
}

if (require.main === module) {
  const [jestResultPath, rule, comment] = process.argv.slice(2);
  if (!rule || !jestResultPath) {
    console.error(
      'suppress-jest-eslint.ts <jest-result-path> <rule> [comment]',
    );
    process.exit(1);
  }
  const jestResultFile = fs.readFileSync(jestResultPath, 'utf8');

  const jestResults: JestResultSummary = JSON.parse(jestResultFile);

  suppressJestEslint(jestResults, rule, comment).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
