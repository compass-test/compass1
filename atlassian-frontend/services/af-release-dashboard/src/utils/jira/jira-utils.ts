import { validateEnvVars as checkEnvironmentVariables } from '@atlaskit/build-utils/guards';
import axios, { AxiosInstance } from 'axios';
import {
  FabDodgemTicket,
  GetJiraIssueChangelogs,
  GetJiraIssueResponse,
  JiraIssue,
  JiraIssueChangelog,
  ReleaseChange,
} from './types';
import { ReleaseEntity, ReleaseStatus } from '../../db/entities/Release';
import { safeLowerTrim } from '../../server/utils';
import { ReleaseRequestPayload } from '../../ui/interfaces/release-request-payload';

const PRODUCT_FABRIC_BASE_URL = 'https://product-fabric.atlassian.net';
const monthsString = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Transform Jira status into the respective DB Enum
 * @param jiraStatus
 */
function jiraStatusToDBStatus(jiraStatus: string): ReleaseStatus | null {
  switch (jiraStatus) {
    case 'Planned':
      return ReleaseStatus.planned;
    case 'Development':
      return ReleaseStatus.development;
    case 'Stabilising':
      return ReleaseStatus.stabilising;
    case 'Released to NPM':
      return ReleaseStatus['released-to-npm'];
    case 'Adopted by one product':
      return ReleaseStatus['adopted-by-one-product'];
    case 'Adopted by all products':
      return ReleaseStatus['adopted-by-all-products'];
    default:
      return null;
  }
}

/**
 * Transform into the related date field in the database
 * @param jiraStatus
 */
function jiraStatusToDBDateField(jiraStatus: string) {
  // Not casting to a type, as createReleaseChange is doing the keyof check
  switch (jiraStatus) {
    case 'Planned':
      return 'plannedDate';
    case 'Development':
      return 'developmentDate';
    case 'Stabilising':
      return 'stabilizingDate';
    case 'Released to NPM':
      return 'releaseToNPMDate';
    case 'Adopted by one product':
      return 'adoptedByOneProductDate';
    case 'Adopted by all products':
      return 'adoptedByAllProductDate';
    default:
      return null;
  }
}

/**
 * Apply all the release changes to create a partial release
 * @param jiraKey
 * @param changes
 */
function createPartialRelease(
  jiraKey: string,
  changes: ReleaseChange[],
): Partial<ReleaseRequestPayload> {
  const releaseEntity: Partial<ReleaseRequestPayload> = {
    jiraTicket: jiraKey,
  };

  for (const change of changes) {
    if (change.value === null) {
      delete releaseEntity[change.fieldName];
      continue;
    }
    releaseEntity[change.fieldName] = change.value as any;
  }

  return releaseEntity;
}

/**
 *
 * @param dateString - Jira date string format DD/MMM/YY
 */
function parseJiraDate(dateString: string) {
  const [day, monthString, year] = dateString.split('/');
  const month = monthsString.indexOf(monthString);

  return new Date(
    2000 + Number.parseInt(year, 10),
    month,
    Number.parseInt(day),
  );
}

/**
 * Helper function to assure correct keys and values of a ReleaseEntity field.
 * @param key
 * @param value
 */
function createReleaseChange<T extends keyof ReleaseEntity>(
  key: T,
  value: ReleaseRequestPayload[T] | null,
): ReleaseChange {
  return {
    fieldName: key,
    value,
  };
}

/**
 * Jira utils helper class to:
 *  - Communicate with Jira API
 *  - Data manipulation of Jira Issues/Changelogs¬
 */
export class JiraUtils {
  private static instance: AxiosInstance | undefined;
  private static jiraTicketRegex = new RegExp(`^\\d{4}Q\\d - ([a-zA-Z]*)$`);

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    checkEnvironmentVariables(process.env, ['JIRA_USER', 'JIRA_PASSWORD']);

    this.instance = axios.create({
      baseURL: PRODUCT_FABRIC_BASE_URL,
      auth: {
        username: process.env.JIRA_USER,
        password: process.env.JIRA_PASSWORD,
      },
    });
    return this.instance;
  }

  static isReleaseTicket(issue: JiraIssue): Boolean {
    return JiraUtils.jiraTicketRegex.test(issue.fields.summary);
  }

  static toFabDodgemTicket = (issue: JiraIssue): FabDodgemTicket => {
    return {
      id: issue.id,
      key: issue.key,
      summary: issue.fields.summary,
      releaseName: safeLowerTrim(
        JiraUtils.jiraTicketRegex.exec(issue.fields.summary)![1],
      ),
    };
  };

  static async getFabDodgemTickets() {
    const { data: response } = await this.getInstance().get<
      GetJiraIssueResponse
    >(`/rest/api/3/search?jql=project="FABDODGEM"`);

    return response.issues
      .filter(this.isReleaseTicket)
      .map<FabDodgemTicket>(this.toFabDodgemTicket);
  }

  static createPartialReleaseFromChangelogs(
    jiraKey: string,
    changelogs: JiraIssueChangelog[],
  ) {
    return createPartialRelease(
      jiraKey,
      changelogs
        .map<ReleaseChange[]>((value) =>
          value.items
            .map<ReleaseChange | ReleaseChange[] | undefined>((item) => {
              switch (item.field) {
                case 'Start date':
                  return createReleaseChange(
                    'startDate',
                    parseJiraDate(item.toString!).toISOString(),
                  );
                case 'RC cut date':
                  return createReleaseChange(
                    'cutDate',
                    item.toString
                      ? parseJiraDate(item.toString!).toISOString()
                      : null,
                  );
                case 'status':
                  const changes = [
                    createReleaseChange(
                      'status',
                      jiraStatusToDBStatus(item.toString ?? ''),
                    ),
                  ];
                  const dateField = jiraStatusToDBDateField(
                    item.toString ?? '',
                  );
                  if (dateField) {
                    changes.push(
                      createReleaseChange(
                        dateField,
                        value.created
                          ? new Date(value.created).toISOString()
                          : new Date().toISOString(),
                      ),
                    );
                  }
                  return changes;
                case 'Release page':
                  return createReleaseChange('releasePage', item.toString);

                case 'duedate':
                  return createReleaseChange(
                    'dueDate',
                    item.toString
                      ? new Date(item.toString).toISOString()
                      : null,
                  );
                case 'Stabilising':
                  return createReleaseChange(
                    'stabilizingStatus',
                    item.toString,
                  );
                case 'Date released':
                  return createReleaseChange(
                    'releaseDate',
                    parseJiraDate(item.toString!).toISOString(),
                  );

                case 'Released products':
                  if (!item.toString) {
                    return undefined;
                  }

                  return [
                    createReleaseChange(
                      'isInJira',
                      item.toString.indexOf('Jira') !== -1,
                    ),
                    createReleaseChange(
                      'isInConfluence',
                      item.toString.indexOf('Confluence') !== -1,
                    ),
                    createReleaseChange(
                      'isInBitbucket',
                      item.toString.indexOf('Bitbucket') !== -1,
                    ),
                  ];
                default:
                  return undefined;
              }
            })
            .filter(
              (change): change is ReleaseChange | ReleaseChange[] =>
                change !== undefined,
            )
            .flat(1),
        )
        .flat(1),
    );
  }

  static async getFabDodgemTicketReleaseChanges(
    key: string,
  ): Promise<Partial<ReleaseRequestPayload>> {
    const { data: response } = await this.getInstance().get<
      GetJiraIssueChangelogs
    >(`rest/api/3/issue/${key}/changelog`);

    return this.createPartialReleaseFromChangelogs(key, response.values);
  }
}
