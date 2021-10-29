import { URL } from 'url';

import type { DocNode } from '@atlaskit/adf-schema';
import { IssueDetails, JiraClient } from '@atlaskit/build-utils/jira';

import { determineJiraProjectForFilePath } from '../package-metadata/json-parsing';
import type { JiraTicket, Test } from '../types';
import { analyticsClient, getAnalyticsPayload } from '../utils/analytics';
import { getAxiosErrorMessage } from '../utils/axios';

import fetchProjectDetails, {
  DEFAULT_JIRA_AUTH,
} from './fetch-project-details';
import getDescription from './skipped-test-description-adf';

/**
 * This MVP only supports PF instance as we lack auth tokens for other instances.
 *
 * An Auth Service is proposed to counteract this limitation:
 * @see https://hello.atlassian.net/wiki/spaces/AFP/pages/900561409/RFC+Coordination+of+work+across+package+owners#Proposal%3A-Move-follow-up-actions-to-Jira
 */
const PRODUCT_FABRIC_INSTANCE_KEY = 'product-fabric';

/**
 * This MVP only supports PF instance so we create tickets within PF's SKIP project
 * as a fallback for teams usign alternate instances.
 */
const PRODUCT_FABRIC_FALLBACK_PROJECT_KEY = 'SKIP';

const jiraClients = new Map<string, JiraClient>([
  [
    PRODUCT_FABRIC_INSTANCE_KEY,
    new JiraClient({
      auth: DEFAULT_JIRA_AUTH,
      instance: PRODUCT_FABRIC_INSTANCE_KEY,
    }),
  ],
]);

export async function createUnskipJiraTicket(
  test: Test,
  attachmentPath?: string,
  sessionUrl?: string,
): Promise<JiraTicket> {
  const {
    SKIP_TESTS_SET_TICKET_ASSIGNEE,
    SKIP_TESTS_SET_TICKET_DUE_DATE,
    DRY_RUN,
  } = process.env;
  const jiraProjectUrl = await determineJiraProjectForFilePath(test);
  const isDryRun = DRY_RUN === 'true';

  let jiraInstance = PRODUCT_FABRIC_INSTANCE_KEY;
  let projectKey = PRODUCT_FABRIC_FALLBACK_PROJECT_KEY;

  if (jiraProjectUrl) {
    // Read team's jira instance
    const instance = new URL(jiraProjectUrl).hostname.split('.').shift()!;
    const isProductFabric = instance === PRODUCT_FABRIC_INSTANCE_KEY;

    if (isDryRun) {
      // When dry run is enabled, we use the SKIP project to avoid spamming the real project for test runs
      console.info(
        `Dry run mode: Jira ticket created in "SKIP" project instead of intended "${projectKey}" project.`,
      );
    }
    if (!isProductFabric) {
      // We only support product-fabric at this stage, so we create a fallback ticket in the SKIP project
      // for teams to link to when they create their own equivalent backlog tickets.
      console.warn(
        `Instance (${instance}) isn't supported yet. Jira ticket created in SKIP project on product-fabric.`,
      );
    }
    if (isProductFabric && !isDryRun) {
      // Use team's project
      projectKey = jiraProjectUrl.split('/').pop()!;
    }
  }

  const { assignee, projectId, issueId } = await fetchProjectDetails(
    jiraInstance,
    projectKey,
  );

  const payload: IssueDetails<DocNode> = {
    fields: {
      summary: `Restore skipped test: ${test.path}`,
      description: getDescription(test, sessionUrl),
      project: {
        id: projectId,
      },
      issuetype: {
        id: issueId,
      },
      labels: ['af-skipped-inconsistent-test'].concat(
        isDryRun ? ['dry-run'] : [],
      ),
    },
  };

  if (SKIP_TESTS_SET_TICKET_DUE_DATE === 'true') {
    // TODO: Validate whether we can check whether this property is available on the project
    // before sending it through, as projects without it configured throw an error instead
    // of gracefully ignoring it.
    // https://product-fabric.atlassian.net/browse/MONO-253
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 30);
    payload.fields.duedate = dueDate.toISOString().slice(0, 10);
  }

  if (SKIP_TESTS_SET_TICKET_ASSIGNEE === 'true') {
    // TODO: Validate whether we can read project metadata to determine whether it's a single
    // or multi team project.
    // https://product-fabric.atlassian.net/browse/MONO-132

    // This assignee is typically a team lead, however some projects are shared by multiple
    // teams. In that situation it's usually a head of department, which isn't ideal because
    // they're not an appropriate assignee for skipped test triaging.
    payload.fields.assignee = {
      id: assignee.accountId,
    };
  }

  const client = jiraClients.get(jiraInstance);
  if (!client) {
    throw new Error(`Missing Jira client for instance: ${jiraInstance}`);
  }

  let ticket: JiraTicket;

  try {
    const { key, browseUrl } = await client.createIssue<DocNode>(payload);
    ticket = {
      key,
      browseUrl,
      assignee: assignee.name,
    };
    console.log('Created restoration ticket:', ticket.browseUrl);
  } catch (error) {
    // Intercept Axios errors to avoid the auth credentials being printed during error output
    // e.g. if we pass through an invalid payload in the request.
    const message =
      getAxiosErrorMessage(error.response) || error.message || error;

    analyticsClient.sendEvent(
      getAnalyticsPayload(test, 'create_ticket_failed'),
    );

    throw new Error(`Failed to create Jira ticket.\n\t${message}`);
  }

  if (attachmentPath) {
    // Optional attachment
    ticket.attachment = await attachFileToJiraTicket(
      client,
      ticket.key,
      attachmentPath,
    );
  }

  return ticket;
}

async function attachFileToJiraTicket(
  client: JiraClient,
  ticketKey: string,
  filePath: string,
) {
  try {
    const result = await client.addIssueAttachement(ticketKey, [filePath]);
    const { filename } = result[0];
    console.log('\tWith attachment: ', filename);
    return filename;
  } catch (error) {
    // Intercept Axios errors to avoid the auth credentials being printed during error output
    // Failed attachments aren't a blocker so we gracefully ignore them
    console.error(
      getAxiosErrorMessage(error.response) || error.message || error,
    );
  }
}
