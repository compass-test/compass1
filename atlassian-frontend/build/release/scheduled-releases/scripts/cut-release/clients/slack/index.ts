import { BaseClient } from '../base';
import {
  SLACK_API_URL,
  SLACK_CHANNEL_URL,
  SLACK_NOTIFICATION_MESSAGE,
  SLACK_USERNAME,
} from './constants';
import { generateBlock, generateTeamBlock } from './message-blocks';
import {
  AuthorMetadataItem,
  AuthorMetadata,
  PullRequestTeamMetadata,
  TeamMetadata,
} from '../../../getPrsInRelease';
import { SlackChannel } from './types';

export class SlackClient extends BaseClient {
  public async createChannel(releaseName: string) {
    const channelName = `bump-editor-${releaseName}`;
    const endpoint = `${SLACK_API_URL}/conversations.create`;
    const options = this.getOptions('POST', {
      name: `bump-editor-${releaseName}`,
    });
    const response = await this.request(endpoint, options);
    if (response.error === 'name_taken') {
      return {
        id: channelName,
        url: `${SLACK_CHANNEL_URL}/${channelName}`,
      };
    } else {
      const channelId = response.channel.id;
      return {
        id: channelId,
        url: `${SLACK_CHANNEL_URL}/${channelId}`,
      };
    }
  }

  public async lookupUsers(emails: string[]) {
    return await Promise.all(emails.map(email => this.lookupUser(email)));
  }
  public async lookupUser(email: string) {
    const endpoint = `${SLACK_API_URL}/users.lookupByEmail?email=${email}`;
    const options = this.getOptions('GET');
    const { user } = await this.request(endpoint, options);
    if (!user) {
      throw new Error(`Can't find user: ${email}`);
    }
    return { id: user.id, name: user.name };
  }

  public async inviteUsers(
    channel: SlackChannel,
    authorsMetadata: AuthorMetadata,
  ) {
    const authors = Object.keys(authorsMetadata);
    const users = await Promise.all(
      authors.map(async author => {
        try {
          return await this.lookupUser(author);
        } catch (err) {
          console.error(err);
          return undefined;
        }
      }),
    );
    const usersFound = users.filter(user => user !== undefined);
    const endpoint = `${SLACK_API_URL}/conversations.invite`;
    const options = this.getOptions('POST', {
      channel: channel.id,
      users: usersFound.map(user => user!.id).join(','),
    });
    return await this.request(endpoint, options);
  }
  public async inviteUser(userId: string, channelId: string) {
    const endpoint = `${SLACK_API_URL}/conversations.invite`;
    const options = this.getOptions('POST', {
      channel: channelId,
      user: userId,
    });
    return await this.request(endpoint, options);
  }

  public async messageUsers(
    releaseName: string,
    channel: SlackChannel,
    authorsMetadata: AuthorMetadata,
  ) {
    const authors = Object.keys(authorsMetadata);
    return await Promise.all(
      authors.map(async author => {
        try {
          const user = await this.lookupUser(author);
          await this.messageUser(
            user.id,
            releaseName,
            channel.url,
            authorsMetadata[author],
          );
          return user;
        } catch (err) {
          console.error(err);
          return undefined;
        }
      }),
    );
  }
  public async messageUser(
    userId: string,
    releaseName: string,
    releaseChannelUrl: string,
    items: AuthorMetadataItem[],
  ) {
    const blocks = generateBlock(releaseName, releaseChannelUrl, items);
    const endpoint = `${SLACK_API_URL}/chat.postMessage`;
    const options = this.getOptions('POST', {
      channel: userId,
      text: SLACK_NOTIFICATION_MESSAGE,
      username: SLACK_USERNAME,
      blocks,
    });
    return await this.request(endpoint, options);
  }

  public async messageTeams(
    currentRelease: string,
    channel: SlackChannel,
    teams: TeamMetadata,
  ) {
    const teamNames = Object.keys(teams);
    return await Promise.all(
      teamNames.map(async teamName => {
        try {
          return await this.messageTeam(
            currentRelease,
            channel.url,
            teamName,
            teams[teamName],
          );
        } catch (err) {
          console.error(err);
          return undefined;
        }
      }),
    );
  }
  public async messageTeam(
    currentRelease: string,
    releaseChannelUrl: string,
    teamName: string,
    team: PullRequestTeamMetadata,
  ) {
    const blocks = generateTeamBlock(
      currentRelease,
      teamName,
      releaseChannelUrl,
      team.pullRequests,
    );
    const endpoint = `${SLACK_API_URL}/chat.postMessage`;
    const options = this.getOptions('POST', {
      channel: team.channel,
      text: SLACK_NOTIFICATION_MESSAGE,
      username: SLACK_USERNAME,
      blocks,
    });
    return await this.request(endpoint, options);
  }
}
