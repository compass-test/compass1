import { Version3 } from 'jira.js';
import type { Version3Models } from 'jira.js';

interface IssueData {
  issueId: string;
  labels: string[];
}

export interface UpdateIssue {
  key: string;
  fields: Partial<Version3Models.Fields>;
}

export class JiraClient {
  private instance: Version3.Version3Client;

  constructor(host: string) {
    this.instance = new Version3.Version3Client({
      host: host,
      telemetry: false,
      authentication: {
        basic: {
          email: process.env.BOT_UIP_ENG_HEALTH_USER!,
          apiToken: process.env.BOT_UIP_ENG_HEALTH_TOKEN!,
        },
      },
    });
  }

  public async closeIssues(issueIds: string[]): Promise<void> {
    const issuesClosedPromise = issueIds.map(async (issueId) => {
      try {
        const transitionData = await this.instance.issues.getTransitions({
          issueIdOrKey: issueId,
        });
        const doneTransition = transitionData.transitions?.find(
          (transition) => transition.name === 'Done',
        );
        await this.instance.issues.doTransition({
          issueIdOrKey: issueId,
          transition: {
            id: doneTransition?.id,
          },
        });
      } catch (error) {
        console.log('Unable to close issue', error);
      }

      const issuesClosed = await Promise.all(issuesClosedPromise);
      console.log(`Closed ${issuesClosed.length} issues`);
    });
  }

  public async createIssues(
    issues: Version3.Version3Models.IssueUpdateDetails[],
  ) {
    try {
      await this.instance.issues.createIssues({
        issueUpdates: issues,
      });
      console.log(`Created ${issues.length} issues`);
    } catch (error) {
      throw new Error(
        `Unable to create issue with ${JSON.stringify(error.response.data)}`,
      );
    }
  }

  public async updateIssue(
    issueIdOrKey: string,
    fields: Partial<Version3Models.Fields>,
  ) {
    try {
      // This is good for debugging to understand what fields can be added/updated.
      // const editable = await this.instance.issues.getEditIssueMeta({
      //   issueIdOrKey,
      // });
      await this.instance.issues.editIssue({
        issueIdOrKey,
        fields,
      });
      console.log(`Updated issue with key ${issueIdOrKey}`);
    } catch (error) {
      throw new Error(
        `Unable to update issue with ${JSON.stringify(error.response.data)}`,
      );
    }
  }

  public async updateIssues(issues: UpdateIssue[]) {
    for (const { key, fields } of issues) {
      await this.updateIssue(key, fields);
    }
  }

  public async updateIssuesWithLabels(issueData: IssueData[]) {
    const updatedIssuesPromises = issueData.map(async ({ issueId, labels }) => {
      const issue = await this.instance.issues.getIssue({
        issueIdOrKey: issueId,
      });

      const oldLabels = issue.fields.labels;
      const newLabels = oldLabels.concat(labels);

      await this.instance.issues.editIssue({
        issueIdOrKey: issueId,
        fields: {
          labels: newLabels,
        },
      });
    });
    const issuesUpdated = await Promise.all(updatedIssuesPromises);
    console.log(`Updated ${issuesUpdated.length} issues`);
  }

  public async getUserData(assignee: string) {
    try {
      const user = await this.instance.userSearch.findUsers({
        query: `${assignee}@atlassian.com`,
      });

      return user && user[0];
    } catch (error) {
      console.error(error.response.data);
    }
  }

  public async findIssuesByLabels(
    labels: string[],
    project: string,
  ): Promise<Version3.Version3Models.IssueBean[]> {
    const stringifiedLabels = labels
      .map((label) => JSON.stringify(label))
      .join(',');

    const searchResult = await this.instance.issueSearch.searchForIssuesUsingJql(
      {
        jql: `project = "${project}" and statusCategory in ("New", "In Progress") and labels in (${stringifiedLabels})`,
      },
    );

    return searchResult.issues || [];
  }
}
