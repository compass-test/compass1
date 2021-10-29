import {
  interleaveCGAndRecentResults,
  getPeopleFilterOptions,
} from '../filter-pane-populate-options';
import {
  MAX_CG_RESULTS,
  CollaborationGraphClient,
} from '../../../common/clients/collaboration-graph-client/collaboration-graph-client';
import { UserDetails } from '../../../common/user-context/user-context';
import { CollaborationGraphClientConfig } from '../../../common/clients/collaboration-graph-client/collaboration-graph-types';
import {
  ConfluenceSearchClient,
  ConfluenceSearchClientConfig,
} from '../../../confluence/clients/confluence-search-client';
import { SiteFilterOption } from '../../../confluence/filter-context/filter-context';

jest.mock(
  '../../../common/clients/collaboration-graph-client/collaboration-graph-client',
  () => {
    const mockCollabGraphClient = {
      getUsers: jest.fn(),
    };
    return {
      CollaborationGraphClient: jest.fn(() => mockCollabGraphClient),
      MAX_CG_RESULTS: jest.requireActual(
        '../../../common/clients/collaboration-graph-client/collaboration-graph-client',
      ).MAX_CG_RESULTS,
    };
  },
);

jest.mock('../../../confluence/clients/confluence-search-client', () => {
  const mockConfluenceSearchClient = {
    getRecentPeople: jest.fn(),
  };
  return { ConfluenceSearchClient: jest.fn(() => mockConfluenceSearchClient) };
});

describe('FilterPanePopulateOptions', () => {
  describe('interleaveCGAndRecentResults', () => {
    describe('for COLLABORATION_GRAPH result length equal to max', () => {
      it('should not invoke recent options', async () => {
        expect.assertions(2);
        const collabGraphOptions = new Array(MAX_CG_RESULTS).fill(0);
        const recentFetchMock = jest.fn();
        const returnedOptions = await interleaveCGAndRecentResults(
          collabGraphOptions,
          recentFetchMock,
          (number) => number.toString(),
        );

        expect(returnedOptions).toEqual(collabGraphOptions);
        expect(recentFetchMock).not.toHaveBeenCalled();
      });
    });

    describe('for COLLABORATION_GRAPH result length less than max', () => {
      it('should return recent options after deduping', async () => {
        expect.assertions(2);
        const collabGraphOptions = new Array(MAX_CG_RESULTS - 5).fill(0);
        const recentOptions = new Array(1).fill(4);
        const recentFetchMock = jest.fn(() => Promise.resolve(recentOptions));
        const returnedOptions = await interleaveCGAndRecentResults(
          collabGraphOptions,
          recentFetchMock,
          (number) => number.toString(),
        );

        expect(returnedOptions).toEqual([0, 4]);
        expect(recentFetchMock).toHaveBeenCalled();
      });

      it('should return COLLABORATION_GRAPH options for recent options throwing exception', async () => {
        expect.assertions(2);
        const collabGraphOptions = new Array(MAX_CG_RESULTS - 5).fill(0);
        const recentFetchMock = jest.fn(() => Promise.reject('haha'));
        const returnedOptions = await interleaveCGAndRecentResults(
          collabGraphOptions,
          recentFetchMock,
          (number) => number.toString(),
        );

        expect(returnedOptions).toEqual(collabGraphOptions);
        expect(recentFetchMock).toHaveBeenCalled();
      });
    });
  });

  describe('getPeopleFilterOptions', () => {
    const user: UserDetails = {
      id: '12345',
      name: 'Some User',
      email: 'some_user@atlassian.com',
      avatarUrl: 'path/to/avatar',
      hasSoftwareAccess: true,
    };
    const isMultiSite = false;
    const collabGraphConfig: CollaborationGraphClientConfig = {
      isMultiSite,
      cloudId: '12345',
      collaborationGraphUrl: 'some/url/path',
      sites: [],
    };
    const searchClientConfig: ConfluenceSearchClientConfig = {
      isUserAnonymous: false,
      isCollaborationGraphEnabled: true,
      url: 'some/url/path',
      cloudId: '12345',
      siteMasterList: [],
    };
    const searchSessionId = '12345';
    const isAnonymousUser = true;
    const availableSiteFilters: SiteFilterOption[] = [];
    const collabGraphClient = new CollaborationGraphClient(collabGraphConfig);
    const searchClient = new ConfluenceSearchClient(
      searchClientConfig,
      collabGraphClient,
    );

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns an empty array if user is anonymous', async () => {
      expect.assertions(1);
      const peopleFilterOptions = await getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      );
      expect(peopleFilterOptions.length).toEqual(0);
    });

    it('returns an array with user first if the user is not anonymous - isMultiSite=true', async () => {
      expect.assertions(4);
      const isMultiSite = true;
      const isAnonymousUser = false;
      const peopleFilterOptions = await getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      );
      expect(peopleFilterOptions.length).toEqual(1);
      expect(peopleFilterOptions[0].id).toEqual(user.id);
      expect(collabGraphClient.getUsers).toHaveBeenCalledTimes(1);
      expect(collabGraphClient.getUsers).toHaveBeenCalledWith(
        availableSiteFilters,
      );
    });

    it('returns an array with user first if the user is not anonymous - isMultiSite=false', async () => {
      expect.assertions(5);
      const isMultiSite = false;
      const isAnonymousUser = false;
      const peopleFilterOptions = await getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      );
      expect(peopleFilterOptions.length).toEqual(1);
      expect(peopleFilterOptions[0].id).toEqual(user.id);
      expect(collabGraphClient.getUsers).toHaveBeenCalledTimes(1);
      expect(searchClient.getRecentPeople).toHaveBeenCalledTimes(1);
      expect(searchClient.getRecentPeople).toHaveBeenCalledWith(
        {
          sessionId: searchSessionId,
          referrerId: null,
        },
        [],
      );
    });

    it('returns the array without the user if the user is not well defined - isMultiSite=true', async () => {
      expect.assertions(3);
      const isMultiSite = true;
      const isAnonymousUser = false;
      const user: UserDetails = {
        id: '',
        name: '',
        email: '',
        avatarUrl: '',
        hasSoftwareAccess: true,
      };
      const peopleFilterOptions = await getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      );
      expect(peopleFilterOptions.length).toEqual(0);
      expect(collabGraphClient.getUsers).toHaveBeenCalledTimes(1);
      expect(collabGraphClient.getUsers).toHaveBeenCalledWith(
        availableSiteFilters,
      );
    });

    it('returns the array without the user if the user is not well defined - isMultiSite=false', async () => {
      expect.assertions(4);
      const isMultiSite = false;
      const isAnonymousUser = false;
      const user: UserDetails = {
        id: '',
        name: '',
        email: '',
        avatarUrl: '',
        hasSoftwareAccess: true,
      };
      const peopleFilterOptions = await getPeopleFilterOptions(
        user,
        availableSiteFilters,
        isMultiSite,
        searchClient,
        searchSessionId,
        collabGraphClient,
        isAnonymousUser,
      );
      expect(peopleFilterOptions.length).toEqual(0);
      expect(collabGraphClient.getUsers).toHaveBeenCalledTimes(1);
      expect(searchClient.getRecentPeople).toHaveBeenCalledTimes(1);
      expect(searchClient.getRecentPeople).toHaveBeenCalledWith(
        {
          sessionId: searchSessionId,
          referrerId: null,
        },
        [],
      );
    });
  });
});
