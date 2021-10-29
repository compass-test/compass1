import { relativeToRepositoryRoot } from '../util/repository';

import type {
  EslintRule,
  EslintRuleMessage,
  EslintFileReport,
  ScannerResult,
  FileResult,
} from '../../types';

const addIssueForRule = (
  filePath: string,
  issue: EslintRuleMessage,
  map: Map<string, Map<string, FileResult>>,
) => {
  if (!map.has(issue.ruleId)) {
    map.set(issue.ruleId, new Map());
  }

  const fileMap = map.get(issue.ruleId)!;
  if (!fileMap.has(filePath)) {
    fileMap.set(filePath, {
      name: filePath,
      lines: [],
    });
  }

  const fileResultEntry = fileMap.get(filePath)!;
  fileResultEntry.lines.push({
    from: issue.line,
    to: issue.endLine,
  });
};

const addMessageToRule = (rule: EslintRule, message: string) => {
  rule.reportedMessage = message;
};

export const scanWithEslint = (
  eslintOutput: EslintFileReport[],
  eslintRules: EslintRule[],
): ScannerResult[] => {
  const concernedRuleNamesToRule = new Map(
    eslintRules.map((rule) => [rule.ruleName, rule]),
  );
  const resultByRule = new Map<string, Map<string, FileResult>>();
  for (const fileReport of eslintOutput) {
    if (fileReport.errorCount === 0 && fileReport.warningCount === 0) {
      continue;
    }
    const relativeFilePath = relativeToRepositoryRoot(fileReport.filePath);

    for (const message of fileReport.messages) {
      // we might not care about this rule
      if (!concernedRuleNamesToRule.has(message.ruleId)) {
        continue;
      }
      addIssueForRule(relativeFilePath, message, resultByRule);

      // TODO: this is ugly
      addMessageToRule(
        concernedRuleNamesToRule.get(message.ruleId)!,
        message.message,
      );
    }
  }

  return Array.from(resultByRule.entries()).flatMap(([rule, fileMap]) => {
    const files = [...fileMap.entries()].map(([_, entry]) => entry);

    return {
      rule: concernedRuleNamesToRule.get(rule)!,
      files,
    };
  });
};
