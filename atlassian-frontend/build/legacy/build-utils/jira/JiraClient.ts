import axios, { AxiosBasicCredentials, AxiosInstance } from 'axios';
import { createReadStream, statSync } from 'fs';
import FormData from 'form-data';
import {
  AddIssueAttachementResponse,
  CreateIssueResponse,
  Issue,
  IssueDetails,
  PaginatedIssues,
  ProjectDetails,
} from './types';

export type IssueSearchOpts = {
  jql: string;
  fields?: string[];
};

export class JiraClient {
  instanceUrl?: string;

  axiosInstance: AxiosInstance;
  log: typeof console.log;

  constructor({
    auth,
    instance,
  }: {
    auth: AxiosBasicCredentials;
    instance: string;
  }) {
    this.instanceUrl = `https://${instance}.atlassian.net`;
    this.axiosInstance = axios.create({
      baseURL: `${this.instanceUrl}/rest/api/3`,
      auth,
    });
    if (process.env.DEBUG === 'TRUE') {
      this.log = console.log;
    } else {
      this.log = () => {};
    }
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-issueidorkey-get
   */
  async getIssue(issueKey: string) {
    this.log('Fetching issue: ', issueKey);
    const response = await this.axiosInstance.get<Issue>(`/issue/${issueKey}`);
    return response.data;
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-search-get
   */
  async searchIssues(opts: IssueSearchOpts) {
    this.log('Searching for issues', opts);
    const response = await this.axiosInstance.post<PaginatedIssues>(
      '/search',
      opts,
    );
    return response.data;
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-rest-api-3-project-projectidorkey-get
   */
  async getProjectDetails(projectKey: string) {
    this.log('Fetching project: ', projectKey);
    const response = await this.axiosInstance.get<ProjectDetails>(
      `/project/${projectKey}`,
    );
    return response.data;
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-rest-api-3-issue-post
   */
  async createIssue<ADFType>(bodyData: IssueDetails<ADFType>) {
    this.log('Creating issue', bodyData);
    const response = await this.axiosInstance.post<CreateIssueResponse>(
      '/issue',
      bodyData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const { key } = response.data;
    return {
      browseUrl: `${this.instanceUrl}/browse/${key}`,
      ...response.data,
    };
  }

  /**
   * @see https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments/#api-rest-api-3-issue-issueidorkey-attachments-post
   *
   * The name of the multipart/form-data parameter that contains the attachments must be `file`.
   */
  async addIssueAttachement(issueId: string, filePaths: string[]) {
    this.log(
      `Adding attachement${
        filePaths.length > 1 ? 's' : ''
      } to ${issueId}: ${filePaths.join(', ')}`,
    );
    const form = new FormData();
    for (let path of filePaths) {
      const { size: fileSizeInBytes } = statSync(path);
      const file = createReadStream(path);
      form.append('file', file, { knownLength: fileSizeInBytes });
    }
    const response = await this.axiosInstance.post<AddIssueAttachementResponse>(
      `/issue/${issueId}/attachments`,
      form,
      {
        headers: form.getHeaders({
          Accept: 'application/json',
          'X-Atlassian-Token': 'no-check',
        }),
      },
    );
    return response.data;
  }
}
