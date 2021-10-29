import fetchMock from 'fetch-mock/es5/client';
import { Scope } from '@atlassian/product-search-dialog/search-client';

import SearchResource from '../SearchResource';
import confluencePageBlogMock from '../__fixtures__/confluence-page-blog.json';
import emptyConfluencePageBlogMock from '../__fixtures__/empty-confluence-page-blog.json';
import jiraIssueMock from '../__fixtures__/jira-issue.json';
import emptyJiraIssueMock from '../__fixtures__/empty-jira-issue.json';

const searchUrl = '/gateway/api/xpsearch-aggregator/quicksearch/v1';
const cloudId = 'DUMMY-158c8204-ff3b-47c2-adbb-a0906ccc722b';

describe('SearchResource', () => {
  afterEach(fetchMock.restore);

  it('should throw error if unsupported Scope is passed in', () => {
    expect(() => {
      new SearchResource(cloudId, Scope.ConfluencePageBlogAttachment);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Unsupported scope - confluence.page,blogpost,attachment"`,
    );
  });

  it('should return "" as default Ari if the information cannot correctly compose an Ari', async () => {
    const provider = new SearchResource(
      'broken-cloud-id',
      Scope.ConfluencePageBlog,
    );
    fetchMock.mock({
      matcher: searchUrl,
      response: confluencePageBlogMock,
      name: 'quick-search',
    });

    const result = await provider.quickSearch('abc', 5);

    expect(result).toMatchSnapshot();
  });

  it('should search for Scope.ConfluencePageBlog', async () => {
    const provider = new SearchResource(cloudId, Scope.ConfluencePageBlog);
    fetchMock.mock({
      matcher: searchUrl,
      response: confluencePageBlogMock,
      name: 'quick-search',
    });

    const result = await provider.quickSearch('abc', 5);

    expect(result).toMatchSnapshot();
  });

  it('should handle empty result for Scope.ConfluencePageBlog', async () => {
    const provider = new SearchResource(cloudId, Scope.ConfluencePageBlog);
    fetchMock.mock({
      matcher: searchUrl,
      response: emptyConfluencePageBlogMock,
      name: 'quick-search',
    });

    const result = await provider.quickSearch('abc', 5);

    expect(result).toMatchInlineSnapshot(`Array []`);
  });

  it('should search for Scope.JiraIssue', async () => {
    const provider = new SearchResource(cloudId, Scope.JiraIssue);
    fetchMock.mock({
      matcher: searchUrl,
      response: jiraIssueMock,
      name: 'quick-search',
    });

    const result = await provider.quickSearch('abc', 5);

    expect(result).toMatchSnapshot();
  });

  it('should handle empty result for Scope.JiraIssue', async () => {
    const provider = new SearchResource(cloudId, Scope.JiraIssue);
    fetchMock.mock({
      matcher: searchUrl,
      response: emptyJiraIssueMock,
      name: 'quick-search',
    });

    const result = await provider.quickSearch('abc', 5);

    expect(result).toMatchInlineSnapshot(`Array []`);
  });

  it('should throw error in quick search if Scope is not supported', async () => {
    const provider = new SearchResource(cloudId, Scope.JiraIssue);
    fetchMock.mock({
      matcher: searchUrl,
      response: jiraIssueMock,
      name: 'quick-search',
    });

    const bindedQuickSearch = provider.quickSearch.bind({
      ...provider,
      scope: 'nothing',
    });

    expect(bindedQuickSearch('abc', 5)).rejects.toMatchInlineSnapshot(
      `[Error: Unsupported scope - nothing]`,
    );
  });
});
