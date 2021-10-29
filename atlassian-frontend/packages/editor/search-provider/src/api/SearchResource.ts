import {
  createClient,
  SearchClient,
  Scope,
  PageBlogResponse,
  IssueResponse,
} from '@atlassian/product-search-dialog/search-client';
import {
  SearchProvider,
  QuickSearchResult,
  LinkContentType,
} from '@atlaskit/editor-common/provider-factory';
import { ResourceIdentifier, AriConstructorType } from '@atlassian/cs-ari';

const ANALYTICS_IDENTIFIER = 'editor-quick-search';

export default class SearchResource implements SearchProvider {
  private client: SearchClient;
  private scope: Scope;
  private cloudId: string;

  constructor(cloudId: string, scope: Scope, aggregatorUrl?: string) {
    switch (scope) {
      case Scope.ConfluencePageBlog:
      case Scope.JiraIssue:
        break;
      default:
        throw new Error(`Unsupported scope - ${scope}`);
    }
    this.scope = scope;
    this.cloudId = cloudId;

    const config = {
      cloudId,
      aggregatorUrl,
    };
    this.client = createClient(config);
  }

  private getAriString(opt: AriConstructorType): string {
    try {
      return new ResourceIdentifier(opt).toString();
    } catch (e) {
      return '';
    }
  }

  private confluencePageBlogResponseTransformer(
    response: PageBlogResponse | null,
  ): QuickSearchResult[] {
    if (!response) {
      return [];
    }

    return response.results.map((item) => ({
      title: item.title,
      // The `item.url` is only the relative path so we need to prefix the `item.baseUrl`
      url: item.baseUrl + item.url,
      container: item.container.title,
      contentType: this.mapToContentType(item.content && item.content.type),
      updatedTimestamp: item.lastModified,
      objectId: this.getAriString({
        resourceOwner: 'confluence',
        cloudId: this.cloudId,
        resourceType: 'content',
        resourceId: item.content && item.content.id,
      }),
    }));
  }

  private jiraIssueResponseTransformer(
    response: IssueResponse | null,
  ): QuickSearchResult[] {
    if (!response) {
      return [];
    }

    return response.results.map((item) => ({
      title: item.name,
      // The `item.url` here for Jira Issue is the absolute url
      url: item.url,
      container:
        (item.attributes.container && item.attributes.container.title) || '',
      contentType: this.mapToContentType(
        item.attributes['@type'],
        item.attributes.issueTypeName,
      ),
      updatedTimestamp: item.attributes.updated,
      objectId: this.getAriString({
        resourceOwner: 'jira',
        cloudId: this.cloudId,
        resourceType: 'issue',
        resourceId: item.id,
      }),
    }));
  }

  private mapToContentType(
    type?: 'page' | 'blogpost' | 'issue' | string,
    subType?: string,
  ): LinkContentType {
    switch (type) {
      case 'issue':
        switch (subType) {
          case 'Bug':
            return 'jira.issue.bug';
          case 'Story':
            return 'jira.issue.story';
          case 'Task':
            return 'jira.issue.task';
          default:
            return 'jira.issue';
        }
      case 'page':
        return 'confluence.page';
      case 'blogpost':
        return 'confluence.blogpost';
      default:
        return 'default';
    }
  }

  async quickSearch(
    query: string,
    limit: number,
  ): Promise<QuickSearchResult[]> {
    const result = await this.client.search({
      query,
      scopes: [this.scope],
      analytics: {
        identifier: ANALYTICS_IDENTIFIER,
      },
      resultLimit: limit,
    });

    switch (this.scope) {
      case Scope.ConfluencePageBlog: {
        const scopeResult = result.response.retrieveScope(this.scope);
        return this.confluencePageBlogResponseTransformer(scopeResult);
      }
      case Scope.JiraIssue: {
        const scopeResult = result.response.retrieveScope(this.scope);
        return this.jiraIssueResponseTransformer(scopeResult);
      }
      default:
        throw new Error(`Unsupported scope - ${this.scope}`);
    }
  }
}
