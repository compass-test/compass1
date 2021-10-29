import { defaults, RequestPromise, RequestRetryOptions } from 'requestretry';
import { logger } from './logger';
import { RequestAPI, RequiredUriUrl } from 'request';
import parseLinkHeader from 'parse-link-header';

interface SentryMember {
  email: string;
  id: string;
}

interface SentryTeam {
  name: string;
  id: string;
}

interface SentryIssue {
  id: string;
}

interface SentryEvent {
  id: string;
}

interface SentryOwner {
  type: string;
  id: string;
  name: string;
}

interface SentryPagination {
  next: {
    cursor: string;
    results: 'true' | 'false';
  };
}

interface SentryIssues {
  hasMore: boolean;
  nextCursor: string;
  issues: SentryIssue[];
}

interface SentryApiClientOptions {
  sentryUrl: string;
  sentryOrg: string;
  sentryAuthToken: string;
  rateLimitingDelay?: number;
}

// Used to prevent getting rate limited by Sentry
const sleep = async (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export class SentryApiClient {
  memberLookupCache: Map<string, string>;
  sentryUrl: string;
  sentryOrg: string;
  sentryRequest: RequestAPI<
    RequestPromise,
    RequestRetryOptions,
    RequiredUriUrl
  >;
  rateLimitingDelay: number;

  constructor({
    sentryUrl,
    sentryOrg,
    sentryAuthToken,
    rateLimitingDelay = 100,
  }: SentryApiClientOptions) {
    this.memberLookupCache = new Map();
    this.sentryUrl = sentryUrl;
    this.sentryOrg = sentryOrg;
    this.sentryRequest = defaults({
      headers: {
        Accept: 'application/json',
      },
      auth: {
        bearer: sentryAuthToken,
      },
      json: true,
      maxAttempts: 3,
      retryDelay: 1000,
    });
    this.rateLimitingDelay = rateLimitingDelay;
  }

  async getTeamMembers(teamName: string): Promise<SentryMember[] | null> {
    const endpoint = `${this.sentryUrl}/api/0/teams/${
      this.sentryOrg
    }/${encodeURIComponent(teamName)}/members/`;

    const response = await this.sentryRequest.get(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode === 404) {
      return null; // team not found
    }
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code retrieving team members for ${teamName}, but got ${response.statusCode}`,
      );
    }

    return response.body as SentryMember[];
  }

  async addTeamMember(teamName: string, memberId: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/organizations/${
      this.sentryOrg
    }/members/${encodeURIComponent(memberId)}/teams/${encodeURIComponent(
      teamName,
    )}/`;

    logger.debug(`Adding user id ${memberId} to ${teamName} via ${endpoint}`);

    const response = await this.sentryRequest.post(endpoint);
    await sleep(this.rateLimitingDelay);

    // 201 is added, 204 is exists
    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code adding member ${memberId} to team ${teamName}, but got ${response.statusCode}`,
      );
    }
  }

  async removeTeamMember(teamName: string, memberId: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/organizations/${
      this.sentryOrg
    }/members/${encodeURIComponent(memberId)}/teams/${encodeURIComponent(
      teamName,
    )}/`;

    logger.debug(
      `Removing user id ${memberId} from ${teamName} via ${endpoint}`,
    );

    const response = await this.sentryRequest.delete(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code removing member ${memberId} from team ${teamName}, but got ${response.statusCode}`,
      );
    }
  }

  async getMemberId(memberEmail: string): Promise<string | null> {
    if (this.memberLookupCache.has(memberEmail)) {
      logger.debug(`Returning id for ${memberEmail} from cache`);
      return this.memberLookupCache.get(memberEmail) as string;
    }

    logger.debug(`Getting id for ${memberEmail}`);
    const endpoint = `${this.sentryUrl}/api/0/organizations/${
      this.sentryOrg
    }/members/?query=${encodeURIComponent(memberEmail)}`;

    const response = await this.sentryRequest.get(endpoint);
    await sleep(this.rateLimitingDelay);
    const members = response.body;

    if (members.length > 1) {
      throw new Error(
        `Only expected to find one result in search for ${memberEmail}, but found ${members.length}`,
      );
    } else if (members.length === 0) {
      return null;
    }

    const memberId = members[0].id;
    this.memberLookupCache.set(memberEmail, memberId);
    return memberId;
  }

  async createTeam(teamName: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/organizations/${this.sentryOrg}/teams/`;
    logger.debug(`Creating team ${teamName} via ${endpoint}`);

    const response = await this.sentryRequest.post(endpoint, {
      body: { slug: teamName },
    });
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when creating team ${teamName} but got ${response.statusCode}`,
      );
    }
  }

  async setOwnershipRules(
    projectName: string,
    ownershipContent: string,
  ): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/ownership/`;

    logger.debug(`Setting ownership for ${projectName} via ${endpoint}`);

    const response = await this.sentryRequest.put(endpoint, {
      body: { raw: ownershipContent },
    });
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when updating ownership rules for ${projectName}, but got ${
          response.statusCode
        }: ${JSON.stringify(response.body, null, 2)}`,
      );
    }
  }

  async addTeamToProject(projectName: string, teamName: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/teams/${encodeURIComponent(
      teamName,
    )}/`;

    logger.debug(`Adding team ${teamName} to project ${projectName}`);

    const response = await this.sentryRequest.post(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when adding team ${teamName} to ${projectName}, but got ${response.statusCode}`,
      );
    }
  }

  async getProjectTeams(projectName: string): Promise<SentryTeam[]> {
    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/teams/`;

    const response = await this.sentryRequest.get(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when getting teams for project ${projectName}, but got ${response.statusCode}`,
      );
    }
    return response.body;
  }

  async deleteTeam(teamName: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/teams/${
      this.sentryOrg
    }/${encodeURIComponent(teamName)}/`;

    logger.info(`Deleting team ${teamName} from organisation`);

    const response = await this.sentryRequest.delete(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code deleting team ${teamName}, but got ${response.statusCode}`,
      );
    }
  }

  async getIssues(
    projectName: string,
    filterByUnassigned: boolean = true,
    filterByTimesSeen: number = 5,
    cursor: string = '',
  ): Promise<SentryIssues> {
    const queryFilters = [];
    if (filterByUnassigned) {
      queryFilters.push('is:unassigned');
    }
    if (filterByTimesSeen > 0) {
      queryFilters.push(`timesSeen:>${filterByTimesSeen}`);
    }

    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/issues/?query=${encodeURIComponent(
      queryFilters.join(' '),
    )}&cursor=${encodeURIComponent(cursor)}`;

    const response = await this.sentryRequest.get(endpoint);

    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when getting issues for project ${projectName}, but got ${response.statusCode}`,
      );
    }

    const { next } = (parseLinkHeader(
      response.headers.link,
    ) as unknown) as SentryPagination;

    const result = {
      issues: response.body,
      hasMore: next.results === 'true',
      nextCursor: next.cursor,
    };

    return result;
  }

  async getUnresolvedIssues(
    projectName: string,
    teamName: string,
    cursor: string = '',
  ): Promise<SentryIssues> {
    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/issues/?query=${encodeURIComponent(
      `is:unresolved assigned:#${teamName}`,
    )}&cursor=${encodeURIComponent(cursor)}`;

    const response = await this.sentryRequest.get(endpoint);

    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when getting issues for project ${projectName}, but got ${response.statusCode}`,
      );
    }

    const { next } = (parseLinkHeader(
      response.headers.link,
    ) as unknown) as SentryPagination;

    const result = {
      issues: response.body,
      hasMore: next.results === 'true',
      nextCursor: next.cursor,
    };

    return result;
  }

  async getLatestEvent(issueId: string): Promise<SentryEvent> {
    const endpoint = `${this.sentryUrl}/api/0/issues/${issueId}/events/latest/`;

    const response = await this.sentryRequest.get(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when getting latest event for issue ${issueId}, but got ${response.statusCode}`,
      );
    }
    return response.body;
  }

  async getSuggestedOwner(
    projectName: string,
    eventId: string,
  ): Promise<SentryOwner | null> {
    const endpoint = `${this.sentryUrl}/api/0/projects/${
      this.sentryOrg
    }/${encodeURIComponent(projectName)}/events/${eventId}/owners/`;

    const response = await this.sentryRequest.get(endpoint);
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when getting owners for event ${eventId}, but got ${response.statusCode}`,
      );
    }

    if (!response.body || !response.body.owners || !response.body.owners[0]) {
      return null;
    }

    return response.body.owners[0];
  }

  async assignIssueToTeam(issueId: string, teamId: string): Promise<void> {
    const endpoint = `${this.sentryUrl}/api/0/issues/${issueId}/`;

    const response = await this.sentryRequest.put(endpoint, {
      body: { assignedTo: `team:${teamId}` },
    });
    await sleep(this.rateLimitingDelay);

    if (response.statusCode < 200 || response.statusCode >= 300) {
      throw new Error(
        `Expected 2xx status code when assigning issue ${issueId} to team ${teamId}, but got ${response.statusCode}`,
      );
    }
  }

  async assignSuggestedOwnerToIssue(
    projectName: string,
    issueId: string,
  ): Promise<string | null> {
    const latestEvent = await this.getLatestEvent(issueId);
    const owner = await this.getSuggestedOwner(projectName, latestEvent.id);
    if (owner) {
      await this.assignIssueToTeam(issueId, owner.id);
      return owner.name;
    } else {
      return null;
    }
  }

  async getIssueCountForTeam(
    projectName: string,
    teamName: string,
  ): Promise<number> {
    let hasMore = true;
    let cursor = '';
    let count = 0;
    while (hasMore) {
      const result = await this.getUnresolvedIssues(
        projectName,
        teamName,
        cursor,
      );
      hasMore = result.hasMore;
      cursor = result.nextCursor;

      count += result.issues.length;
    }
    return count;
  }
}
