import path from 'path';

import { CONFIG_NAME } from '../constants';
import { getRepositoryRoot } from './util/repository';
import { isEslintRule, isRegexRule } from '../types';

import type { RuleType, EslintRule, RegexRule } from '../types';

export interface JiraConfig {
  host: string;
  projectKey: string;
  issueType: string;
}

interface PackageData {
  name: string;
  team: string;
}

export interface ConfigType {
  jira: JiraConfig;
  getAssigneeForFile: (filePath: string) => Promise<string>;
  getPackageDataForFile: (filePath: string) => Promise<PackageData>;
  rules: RuleType[];
}

export class Config {
  private constructor(private config: ConfigType) {}

  /**
   * getEslintRules
   */
  public getEslintRules() {
    return this.config.rules.filter<EslintRule>(isEslintRule);
  }

  /**
   * getRegexRules
   */
  public getRegexRules() {
    return this.config.rules.filter<RegexRule>(isRegexRule);
  }

  /**
   * getProjectKey
   */
  public getProjectKey() {
    return this.config.jira.projectKey;
  }

  /**
   * getHost
   */
  public getHost() {
    return this.config.jira.host;
  }

  /**
   * getAssigneeForFile
   */
  public getAssigneeForFile(file: string) {
    return this.config.getAssigneeForFile(file);
  }

  /**
   * getPackageDataForFile
   */
  public getPackageDataForFile(file: string) {
    return this.config.getPackageDataForFile(file);
  }

  /**
   * getIssueType
   */
  public getIssueType() {
    return this.config.jira.issueType;
  }

  public static async loadFromPath(configPath: string) {
    console.log(`Loading config from provided config path ${configPath}`);
    // eslint-disable-next-line import/dynamic-import-chunkname
    return new Config(await import(configPath));
  }

  public static async loadFromRepository() {
    return Config.loadFromPath(path.resolve(getRepositoryRoot(), CONFIG_NAME));
  }
}
