import fse from 'fs-extra';
import meow from 'meow';
import fetch from 'node-fetch';
import { PrMetadata } from './getPrsInRelease';

type Auth = {
  username: string;
  password: string;
};

const requiredMetadataFields = ['jiraUrl', 'jiraTicket', 'link'] as const;

type RequiredPrMetaData = Pick<
  PrMetadata,
  typeof requiredMetadataFields[number]
>;

function validateAuth(auth: Partial<Auth>): auth is Auth {
  return auth && auth.username != null && auth.password != null;
}

async function labelJiraIssueWithRelease(
  jiraAuth: Auth,
  releaseName: string,
  issueId: string,
  instanceUrl: string | null,
) {
  const token = Buffer.from(
    `${jiraAuth.username}:${jiraAuth.password}`,
  ).toString('base64');

  const data = {
    update: {
      labels: [{ add: `release-${releaseName}` }],
    },
  };

  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
  };

  if (!instanceUrl) {
    instanceUrl = 'product-fabric.atlassian.net';
  }

  let apiUrl = ` https://${instanceUrl}/rest/api/2/issue/${issueId}`;

  const response = await fetch(apiUrl, options);

  if (response.ok) {
    console.log(`Issue: ${issueId} labeled with 'release-${releaseName}'`);
  } else {
    console.log(response);
  }
}

function validatePrMetadata(prs: any): asserts prs is RequiredPrMetaData[] {
  if (!Array.isArray(prs)) {
    throw Error(`Pr metadata must be an array, received ${typeof prs}`);
  } else if (prs.length === 0) {
    throw Error(`Pr metadata must be a non-empty array, received []`);
  }

  const keys = Object.keys(prs[0]);
  const errorMessages = requiredMetadataFields
    .filter(field => !keys.includes(field))
    .map(field => `Missing "${field}" field`);

  if (errorMessages.length) {
    throw Error(`Invalid pr metadata:\n${errorMessages.join('\n')}`);
  }
}

type Options = {
  projectKey?: string;
};

export default async function main(
  releaseName: string,
  prMetadata: string | PrMetadata[],
  jiraAuth: Auth,
  options: Options,
) {
  const { projectKey } = options;
  if (!releaseName || !prMetadata) {
    throw Error('Missing release name and/or prMetadata');
  }

  const prs =
    typeof prMetadata === 'string'
      ? (await fse.readJSON(prMetadata)).pullRequests
      : prMetadata;

  validatePrMetadata(prs);

  const jiraTickets = new Set();

  const filteredPrs = prs.filter(pr => {
    if (!pr.jiraTicket || jiraTickets.has(pr.jiraTicket)) {
      return false;
    }
    jiraTickets.add(pr.jiraTicket);
    if (projectKey) {
      return pr.jiraTicket.toLowerCase().includes(projectKey.toLowerCase());
    }
    return true;
  });

  const re = new RegExp('//([^/]*)');

  await Promise.all(
    filteredPrs.map(async pr => {
      let instanceUrl = null;
      if (pr.jiraUrl && pr.jiraUrl !== pr.link) {
        let jiraUrlRegex = re.exec(pr.jiraUrl);
        if (jiraUrlRegex && jiraUrlRegex.length > 0) {
          instanceUrl = jiraUrlRegex[1];
        }
      }
      if (pr.jiraTicket) {
        await labelJiraIssueWithRelease(
          jiraAuth,
          releaseName,
          pr.jiraTicket,
          instanceUrl,
        );
      }
    }),
  );
}

if (require.main === module) {
  const cli = meow(
    `
    Labels jira issues associated with PRs merged into a specific release

    Usage: yarn label-issues <release-name> <pr-metadata-path> [--project <PROJKEY>]
    where release-name is the name of your release and pr-metadata-path is

    Environment Variables:
     - JIRA_USERNAME (required): Jira username to auth against jira's REST API - this should be an *email address*
     - JIRA_PASSWORD (required): Jira api token to auth against jira's REST API - generated from https://id.atlassian.com/manage-profile/security/api-tokens

    Options:
     --project A project key that limits jira issue updates to those belonging to the project
`,
    {
      description:
        'Labels jira issues associated with PRs merged into a specific release',
      flags: {
        project: {
          type: 'string',
        },
      },
    },
  );

  const options: Options = {
    projectKey: cli.flags.project,
  };

  const jiraAuth = {
    username: process.env.JIRA_USERNAME,
    password: process.env.JIRA_PASSWORD,
  };
  if (!validateAuth(jiraAuth)) {
    console.error(
      'Missing $JIRA_USERNAME or $JIRA_PASSWORD environment variables',
    );
    process.exit(1);
    // Throw here to signal to typescript that control flow stops
    throw Error();
  }
  main(cli.input[0], cli.input[1], jiraAuth, options).catch((e: Error) => {
    console.error(e);
    process.exit(1);
  });
}
