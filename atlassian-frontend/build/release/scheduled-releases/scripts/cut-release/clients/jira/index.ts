import { BaseClient } from '../base';
import {
  jiraCustomFieldMap,
  JiraTransitionMap,
  jiraTransitionMap,
  JIRA_API_URL,
} from './constants';
import { getCommentBody } from './comment-body';

export class JiraClient extends BaseClient {
  private static FIELDS = [jiraCustomFieldMap.RELEASE_RC_CUT_DATE, 'status'];

  public async transitionRelease(
    releaseName: string,
    status: JiraTransitionMap,
  ) {
    const release = await this.getReleaseIssue(releaseName);
    await this.updateIssue(release.key, status);
    return release;
  }

  public async getReleaseIssues(releaseName?: string): Promise<any> {
    const endpoint = `${JIRA_API_URL}/search`;
    const options = this.getOptions('POST', {
      jql: `project = 'FABDODGEM' ${this.getQuery(releaseName)}`,
      fields: JiraClient.FIELDS,
    });
    const response = await this.request(endpoint, options);
    return response.issues;
  }

  public async getReleaseIssue(releaseName?: string) {
    const releases = await this.getReleaseIssues(releaseName);
    if (releases.length > 1) {
      throw Error(`More than one release with text ${releaseName} found.`);
    }
    return releases[0];
  }

  public async updateIssue(
    issueKey: string,
    toStatus: keyof typeof jiraTransitionMap,
  ) {
    if (toStatus !== 'STABILISING') {
      return undefined;
    }

    return await Promise.all([
      this.updateFields(issueKey, {
        [jiraCustomFieldMap.RELEASE_RC_CUT_DATE]: new Date().toISOString(),
      }),
      this.transitionIssue(issueKey, 'STABILISING'),
    ]);
  }

  public async updateFields(issueKey: string, fields: object) {
    const endpoint = `${JIRA_API_URL}/issue/${issueKey}`;
    const options = this.getOptions('PUT', { fields });
    return this.request(endpoint, options);
  }

  public async transitionIssue(issueKey: string, toStatus: JiraTransitionMap) {
    const endpoint = `${JIRA_API_URL}/issue/${issueKey}/transitions`;
    const options = this.getOptions('POST', {
      transition: {
        id: jiraTransitionMap[toStatus],
      },
    });
    return this.request(endpoint, options);
  }

  public async addCommentToReleaseIssue(
    releaseName: string,
    channelUrl: string,
  ) {
    const release = await this.getReleaseIssue(releaseName);
    const endpoint = `${JIRA_API_URL}/issue/${release.key}/comment`;
    const options = this.getOptions('POST', {
      body: getCommentBody(releaseName, channelUrl),
    });
    return this.request(endpoint, options);
  }
  private getQuery(releaseName?: string) {
    return releaseName
      ? `AND summary ~ "${releaseName.replace('-', '*')}"`
      : 'AND status = Development';
  }
}
