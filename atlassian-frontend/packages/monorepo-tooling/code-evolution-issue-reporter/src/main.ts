import { Config } from './lib/config';
import { RegexScanner } from './lib/scanners/regex';
import { JiraClient } from './lib/api/jira';
import { scanWithEslint } from './lib/scanners/eslint';
import { loadFileAsJson } from './lib/util/io';
import { Rule } from './lib/rule';

import type {
  ScannerResult,
  RegexRule,
  EslintRule,
  EslintFileReport,
} from './types';

async function getFilesForRegexRules(
  rules: RegexRule[],
): Promise<ScannerResult[]> {
  let regexRuleResult: ScannerResult[] = [];
  for (const rule of rules) {
    const regexReporter = new RegexScanner()
      .forFilesMatchingGlob(rule.fileGlob)
      .withMatchingRules(rule.match)
      .build();

    const files = regexReporter.search();
    regexRuleResult.push({
      rule,
      files: files,
    });
  }

  return regexRuleResult;
}

const runEslintChecker = async (
  eslintOutputFile: string | undefined,
  eslintRules: EslintRule[],
): Promise<ScannerResult[]> => {
  if (!eslintOutputFile) {
    return [];
  }
  try {
    const eslintFileReports = await loadFileAsJson<EslintFileReport[]>(
      eslintOutputFile,
    );
    return scanWithEslint(eslintFileReports, eslintRules);
  } catch (e) {
    console.log(`Failed to load eslint output file.
${e}`);
    return [];
  }
};

const main = async (eslintOutputFile?: string, configPath?: string) => {
  const config = await (configPath
    ? Config.loadFromPath(configPath)
    : Config.loadFromRepository());

  const jiraClient = new JiraClient(config.getHost());

  const regexRules = config.getRegexRules();
  const eslintRules = config.getEslintRules();

  const regexRuleResult = await getFilesForRegexRules(regexRules);

  const eslintRuleResult = await runEslintChecker(
    eslintOutputFile,
    eslintRules,
  );

  const ruleResults = [...regexRuleResult, ...eslintRuleResult];

  for (const { files, rule: ruleData } of ruleResults) {
    const rule = new Rule(ruleData, files, jiraClient, config);
    await rule.closeIssues();
    await rule.createIssues();
    await rule.updateIssues();
  }
};

export default main;
