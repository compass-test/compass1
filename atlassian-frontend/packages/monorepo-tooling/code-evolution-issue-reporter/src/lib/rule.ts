import { getHashLabelForRepoAndRule, ISSUE_HASH_PREFIX } from './label';
import { getRepositoryUrl } from './util/repository';
import { Issue } from './issue';

import type { RuleType, RuleResult, FileResult } from '../types';
import type { Config } from './config';
import type { Version3Models } from 'jira.js';
import type { JiraClient, UpdateIssue } from './api/jira';

type IssueBean = Version3Models.IssueBean;
type ToUpdate = {
  issue: Issue;
  issueBean: IssueBean;
};

export class Rule {
  private issuesPromise?: Promise<Issue[]>;
  private existingIssues?: Promise<IssueBean[]>;
  private ruleHash: string;

  private classifiedIssues?: {
    toCreate: Issue[];
    toUpdate: ToUpdate[];
    toClose: IssueBean[];
  };

  constructor(
    private rule: RuleType,
    private fileResults: FileResult[],
    private jiraClient: JiraClient,
    private config: Config,
  ) {
    this.ruleHash = getHashLabelForRepoAndRule(
      rule.ruleName,
      getRepositoryUrl(),
    );

    // start loading issue related meta data on creation
    this.preload();
  }

  private preload() {
    // create an Issue for each assignee scope combination
    this.issuesPromise = this.getIssuesForAssigneeAndScope();
    this.existingIssues = this.getExistingJiraIssues();
  }

  private async getExistingJiraIssues(): Promise<IssueBean[]> {
    return this.jiraClient.findIssuesByLabels(
      [this.ruleHash],
      this.config.getProjectKey(),
    );
  }

  private async getIssuesForAssigneeAndScope(): Promise<Issue[]> {
    const result: RuleResult[] = [];

    for (const fileResult of this.fileResults) {
      const assignee = await this.config.getAssigneeForFile(fileResult.name);
      const packageData = await this.config.getPackageDataForFile(
        fileResult.name,
      );
      const reporterResultWithMeta = result.find(
        (element) =>
          element.assignee === assignee && element.scope === packageData.name,
      );

      if (!reporterResultWithMeta) {
        result.push({
          assignee,
          scope: packageData.name,
          team: packageData.team,
          fileResults: [fileResult],
        });
      } else {
        reporterResultWithMeta.fileResults.push(fileResult);
      }
    }

    return result.map(
      ({ fileResults, assignee, scope, team }) =>
        new Issue(this.jiraClient, fileResults, scope, assignee, team),
    );
  }

  private getIssueHashLabel(issue: IssueBean) {
    return issue.fields.labels.find((label) =>
      label.startsWith(ISSUE_HASH_PREFIX),
    );
  }

  private async classifyIssues(existingIssues: IssueBean[], issues: Issue[]) {
    if (this.classifiedIssues) {
      return this.classifiedIssues;
    }

    const toClose = [];
    const toCreate = [];
    const toUpdate: ToUpdate[] = [];

    const issueHashes = await this.getIssueHashes();
    const existingIssueMap = new Map<string, IssueBean>();

    // itereate over existing issues
    for (const issue of existingIssues) {
      const issueHashLabel = this.getIssueHashLabel(issue);

      // fill up an existing issue hash register to see which tickets we need to create or update
      if (issueHashLabel) {
        existingIssueMap.set(issueHashLabel, issue);
      }

      // check for fixable issues:
      // Issues were we either do not find an issue hashlabel or the issueHash from the existing issue does
      // not exist in the local issues can be closed.
      if (!issueHashLabel || !issueHashes.has(issueHashLabel)) {
        toClose.push(issue);
      }
    }

    for (const issue of issues) {
      const issueHash = issue.getIssueHash();
      // There is no existing issue with this hash - we need to create an issue
      if (!existingIssueMap.has(issueHash)) {
        toCreate.push(issue);
      }
      // An issue already exists - we need to update it.
      // NOTE:  There is not always a reason to update - nothing with the issue may have changed.
      //        However, this is not trivial to determine, therefore brute force updating every time is simpler.
      else {
        const issueBean = existingIssueMap.get(issueHash);

        if (!issueBean) {
          continue;
        }

        toUpdate.push({ issue, issueBean });
      }
    }

    this.classifiedIssues = {
      toClose,
      toCreate,
      toUpdate,
    };

    return this.classifiedIssues;
  }

  private async findIssuesToClose(
    existingIssues: IssueBean[],
    issues: Issue[],
  ): Promise<IssueBean[]> {
    const { toClose } = await this.classifyIssues(existingIssues, issues);
    return toClose;
  }

  private async findIssuesToCreate(
    existingIssues: IssueBean[],
    issues: Issue[],
  ): Promise<Issue[]> {
    const { toCreate } = await this.classifyIssues(existingIssues, issues);
    return toCreate;
  }

  private async findIssuesToUpdate(
    existingIssues: IssueBean[],
    issues: Issue[],
  ): Promise<ToUpdate[]> {
    const { toUpdate } = await this.classifyIssues(existingIssues, issues);
    return toUpdate;
  }

  private async getIssueHashes(): Promise<Set<string>> {
    const issues = await this.issuesPromise;

    const issueHashes = issues?.map((issue) => issue.getIssueHash());

    return new Set(issueHashes || []);
  }

  public async createIssues() {
    const issues = await this.issuesPromise;
    const existingIssues = await this.existingIssues;

    if (!existingIssues) {
      return;
    }

    if (!issues) {
      return;
    }

    const issuesToCreate = await this.findIssuesToCreate(
      existingIssues,
      issues,
    );

    if (issuesToCreate.length === 0) {
      console.log(
        `No issues need to be created for rule ${this.rule.ruleName}. Skipping...`,
      );
      return;
    }

    const projectKey = this.config.getProjectKey();
    const issueType = this.config.getIssueType();

    const issueData = await Promise.all(
      issuesToCreate.map(
        async (issue) =>
          await issue.toApiCreationPayload(
            projectKey,
            issueType,
            this.rule.title,
            this.rule.description,
            this.rule.ruleName,
            this.rule.helpLink,
            this.ruleHash,
          ),
      ),
    );
    try {
      await this.jiraClient.createIssues(issueData);
    } catch (e) {
      console.error(`Failed to create issues! ${(e as Error).message}`);
    }
  }

  public async closeIssues() {
    const existingIssues = await this.existingIssues;
    const issues = await this.issuesPromise;

    if (!existingIssues) {
      return;
    }

    if (!issues) {
      return;
    }

    const issuesToClose = await this.findIssuesToClose(existingIssues, issues);

    if (issuesToClose.length === 0) {
      console.log(
        `No closable issues found for ${this.rule.ruleName}, Skipping...`,
      );
      return;
    }

    try {
      await this.jiraClient.closeIssues(issuesToClose.map((issue) => issue.id));
    } catch (error) {
      throw new Error(`Unable to close issue: ${error}`);
    }
  }

  /**
   * updateIssues
   */
  public async updateIssues() {
    const issues = await this.issuesPromise;
    const existingIssues = await this.existingIssues;

    if (!existingIssues) {
      return;
    }

    if (!issues) {
      return;
    }

    const issuesToUpdate = await this.findIssuesToUpdate(
      existingIssues,
      issues,
    );

    if (issuesToUpdate.length === 0) {
      console.log(
        `No issues need to be updated for rule ${this.rule.ruleName}. Skipping...`,
      );
      return;
    }

    const projectKey = this.config.getProjectKey();
    const issueType = this.config.getIssueType();

    const issueData = await Promise.all(
      issuesToUpdate.map(async ({ issue, issueBean }) => {
        const data = {
          key: issueBean.key,
          fields: await issue.toApiUpdatePayload(
            projectKey,
            issueType,
            this.rule.title,
            this.rule.description,
            this.rule.ruleName,
            this.rule.helpLink,
            this.ruleHash,
            issueBean,
          ),
        };

        return data;
      }),
    );

    // TODO: FIX ME... ...eventually -  jira.js and our internal ADF renderer dont agree on some types 🤷‍♀️
    await this.jiraClient.updateIssues((issueData as unknown) as UpdateIssue[]);
  }
}
