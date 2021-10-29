import { getHashLabelForAssigneeAndScope } from './label';
import { descriptionToADF, extractTextFromList } from './util/adf';

import type { BulletListDefinition, DocNode } from '@atlaskit/adf-schema';
import type { Version3Models } from 'jira.js';
import type { JiraClient } from './api/jira';
import type { FileResult } from '../types';

type UserData = Version3Models.User;

export class Issue {
  private issueHash: string;
  private userData?: Promise<UserData | undefined>;
  private files: Set<string>;

  constructor(
    private jiraClient: JiraClient,
    private fileResults: FileResult[],
    private scope: string,
    private assignee: string,
    private team: string,
  ) {
    this.files = new Set(fileResults.map(({ name }) => name));
    this.issueHash = getHashLabelForAssigneeAndScope(assignee, scope);
    this.preloadUserData();
  }

  private preloadUserData() {
    this.userData = this.jiraClient.getUserData(this.assignee);
  }

  /**
   * getAcountId
   */
  public async getAccountId() {
    const userData = await this.userData;

    return userData?.accountId;
  }

  /**
   * getIssueHash
   */
  public getIssueHash() {
    return this.issueHash;
  }

  private getDescription(
    description: string,
    ruleName: string,
    helpLink: string,
  ) {
    return descriptionToADF({
      description,
      ruleName,
      helpLink,
      offendingFiles: this.fileResults,
    });
  }

  private updateDescription(
    description: string,
    ruleName: string,
    helpLink: string,
    existingIssue: Version3Models.IssueBean,
  ) {
    const bulletListsInDescription =
      (existingIssue.fields.description?.content.filter(
        (item) => item.type === 'bulletList',
      ) as BulletListDefinition[]) ?? [];
    // we expect the first list to be that of offending files
    // and the second one to be that of fixed files
    const [
      previouslyOffendingFiles = [],
      previouslyFixedFiles = [],
    ] = bulletListsInDescription.map(extractTextFromList);

    // take all files fixed and offending and remove all those that are still offending.
    // we need to merge both "offending" and "fixed" files - as a previously "fixed" file might turn into an offending again.
    const newlyFixedFiles: string[] = [
      ...previouslyOffendingFiles,
      ...previouslyFixedFiles,
    ].filter((file) => !this.files.has(file));

    return descriptionToADF({
      description,
      ruleName,
      helpLink,
      offendingFiles: this.fileResults,
      fixedFiles: newlyFixedFiles,
    });
  }

  public async toApiCreationPayload(
    projectKey: string,
    issueType: string,
    title: string,
    description: string,
    ruleName: string,
    helpLink: string,
    ruleLabel: string,
  ) {
    const accountId = await this.getAccountId();

    return {
      update: {},
      fields: this.getFieldPayload(
        title,
        issueType,
        projectKey,
        accountId,
        this.getDescription(description, ruleName, helpLink),
        ruleLabel,
      ),
    };
  }

  public async toApiUpdatePayload(
    projectKey: string,
    issueType: string,
    title: string,
    description: string,
    ruleName: string,
    helpLink: string,
    ruleLabel: string,
    issueBean: Version3Models.IssueBean,
  ) {
    const accountId = await this.getAccountId();

    return this.getFieldPayload(
      title,
      issueType,
      projectKey,
      accountId,
      this.updateDescription(description, ruleName, helpLink, issueBean),
      ruleLabel,
    );
  }

  private getFieldPayload(
    title: string,
    issueType: string,
    projectKey: string,
    accountId: string | undefined,
    description: DocNode,
    ruleLabel: string,
  ) {
    description.content = description.content!;
    return {
      summary: `${title} in "${this.scope}"`,
      issuetype: {
        name: issueType,
      },
      project: {
        key: projectKey,
      },
      assignee: {
        accountId: accountId,
      },
      customfield_45339: this.team,
      customfield_45340: this.scope,
      description,
      labels: [this.issueHash, ruleLabel],
    };
  }
}
