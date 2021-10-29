import { getAssigneeOptions } from '../filter-pane-populate-options';
import { JiraSearchClient } from '../../../clients/jira-search-client';
import { createSiteFilters } from '../../../../__tests__/__fixtures__/mock-filters';
import CancellablePromise from '../../../../utils/cancellable-promise';
import { createPeopleResults } from '../../../../__tests__/__fixtures__/mock-jira-results';

const searchResults = createPeopleResults(5);
const mockSearchPeople = CancellablePromise.from(
  Promise.resolve(searchResults),
);
const recentResults = createPeopleResults(5);
const mockGetRecentPeople = CancellablePromise.from(
  Promise.resolve(recentResults),
);
jest.mock('../../../clients/jira-search-client', () => {
  const mockSearchClient = {
    searchPeople: jest.fn().mockImplementation(() => mockSearchPeople),
    getRecentPeople: jest.fn().mockImplementation(() => mockGetRecentPeople),
  };
  return { JiraSearchClient: jest.fn(() => mockSearchClient) };
});

describe('getAssigneeOptions', () => {
  const sites = createSiteFilters(4);
  const config = {
    isUserAnonymous: false,
    recentIssuesSupplier: jest.fn(),
    siteUrl: 'https://www.website-number-one',
    siteMasterList: sites,
    cloudId: 'someid',
    url: 'https://www.another-url',
  };
  const sessionId = 'sessionId';
  const searchClient = new JiraSearchClient(config);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns recent assignee's when no sites selected", async () => {
    const assignees = await getAssigneeOptions(
      searchClient,
      sessionId,
      sites,
      [],
    );
    expect(searchClient.getRecentPeople).toHaveBeenCalledTimes(1);
    expect(searchClient.getRecentPeople).toHaveBeenCalledWith(
      { sessionId, referrerId: null },
      sites,
    );
    expect(assignees.map((a) => a.id)).toEqual(
      recentResults.items.map((a) => a.attributes.userId),
    );
  });

  it('returns assignees dependant on the selected sites', async () => {
    const selectedSites = sites.slice(0, 2);
    selectedSites.forEach((site) => (site.isChecked = true));
    const assignees = await getAssigneeOptions(
      searchClient,
      sessionId,
      sites,
      selectedSites,
    );
    expect(searchClient.searchPeople).toHaveBeenCalledTimes(1);
    expect(searchClient.searchPeople).toHaveBeenCalledWith(
      '',
      { sessionId, referrerId: null },
      selectedSites,
    );
    expect(assignees.map((a) => a.id)).toEqual(
      searchResults.items.map((a) => a.attributes.userId),
    );
  });
});
