export interface BaseRule {
  ruleName: string;
  type: 'eslint' | 'regex';
  title: string;
  description: string;
  helpLink: string;
}

export interface RegexRule extends BaseRule {
  fileGlob: string;
  match: string[];
}

export interface EslintRule extends BaseRule {
  reportedMessage?: string;
}

export interface EslintRuleMessage {
  ruleId: string;
  severity: number;
  message: string;
  line: number;
  column: number;
  nodeType: string;
  messageId: string;
  endLine: number;
  endColumn: number;
}

interface EslintDeprecatedRule {
  ruleId: string;
  replacedBy: string[];
}

export interface EslintFileReport {
  filePath: string;
  messages: EslintRuleMessage[];
  errorCount: number;
  warningCount: number;
  fixableErrorCount: number;
  fixableWarningCount: number;
  source: string;
  usedDeprecatedRules: EslintDeprecatedRule[];
}

export type RuleType = EslintRule | RegexRule;

type LineRange = {
  from: number;
  to: number;
};

export type FileResult = {
  name: string;
  lines: LineRange[];
};

export interface RuleResult {
  scope: string;
  assignee: string;
  team: string;
  fileResults: FileResult[];
}

export interface ReporterResultWithMeta {
  rule: RuleType;
  result: RuleResult[];
}

export interface ScannerResult {
  rule: RuleType;
  files: FileResult[];
}

export function isRegexRule(rule: EslintRule | RegexRule): rule is RegexRule {
  return rule.type === 'regex';
}

export function isEslintRule(rule: EslintRule | RegexRule): rule is EslintRule {
  return rule.type === 'eslint';
}

export type CliFlags = {
  eslintOutputFile?: string;
  configPath?: string;
};
