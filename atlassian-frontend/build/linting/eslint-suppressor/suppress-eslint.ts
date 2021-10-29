/**
 * Auto disable existing eslint violations for a specific rule to allow the rule to be turned on for future code changes\
 *
 * Usage: ts-node local/auto-disable-eslint.ts <rule> <eslint-result-path>
 */

import fs, { promises as fsp } from 'fs';
import path from 'path';
import { EslintResult } from './types';

export async function suppressEslint(
  eslintResults: EslintResult[],
  rule: string,
  comment?: string,
) {
  const disableComment = `// eslint-disable-next-line ${rule}`;
  const comments = comment ? [comment, disableComment] : [disableComment];

  let totalSuppressions = 0;
  for (const result of eslintResults) {
    const ruleViolations = result.messages
      .filter(violation => violation.ruleId === rule)
      // Reverse the entries so we can add comments without having to shift line numbers
      .reverse();
    const numViolations = ruleViolations.length;
    if (numViolations > 0) {
      const sourceLines = result.source.split('\n');
      for (const violation of ruleViolations) {
        sourceLines.splice(violation.line - 1, 0, ...comments);
      }
      await fsp.writeFile(result.filePath, sourceLines.join('\n'));
      console.log(
        `Added ${numViolations} rule suppression${
          numViolations > 1 ? 's' : ''
        } to ${path.relative(process.cwd(), result.filePath)}`,
      );
    }
    totalSuppressions += numViolations;
  }

  console.log(
    `Added a total of ${totalSuppressions} eslint rule suppressions for ${rule}`,
  );
}

if (require.main === module) {
  const [eslintResultPath, rule, comment] = process.argv.slice(2);
  if (!rule || !eslintResultPath) {
    console.error(
      'Usage: suppress-eslint.ts <eslint-result-path> <rule> [comment]',
    );
    process.exit(1);
  }

  const eslintResultFile = fs.readFileSync(eslintResultPath, 'utf8');

  const eslintResults: EslintResult[] = JSON.parse(eslintResultFile);

  suppressEslint(eslintResults, rule, comment).catch(e => {
    console.error(e);
    process.exit(1);
  });
}
