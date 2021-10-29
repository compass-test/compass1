import { SearchResults } from '../../confluence-search-results/confluence-search-results';
import {
  createPeopleTeamsResult,
  createServiceResults,
} from '../../../__tests__/__fixtures__/mock-search-results';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => null,
}));

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
});

afterAll(() => {
  // eslint-disable-next-line
  (console.error as any).mockRestore();
  // eslint-disable-next-line
  (console.warn as any).mockRestore();
});

const createResults = (
  servicesResults = 1,
  libsAppsMoreResults = 1,
  peopleTeamsResults = 1,
) => ({
  items: {
    isLoading: false,
    results: null,
  },
  spaces: {
    isLoading: false,
    results: null,
  },
  people: {
    isLoading: false,
    results: null,
  },
  services: {
    isLoading: false,
    results: createServiceResults(
      servicesResults,
      CompassComponentType.SERVICE,
    ),
  },
  libsAppsMore: {
    isLoading: false,
    results: createServiceResults(
      libsAppsMoreResults,
      CompassComponentType.OTHER,
    ),
  },
  peopleTeams: {
    isLoading: false,
    results: createPeopleTeamsResult(peopleTeamsResults),
  },
});

let baseProps: any;

beforeEach(() => {
  baseProps = {
    query: 'query',
  };
});

describe('<SearchResults />', () => {
  describe('getFetchedResultCount', () => {
    const fetchedServicesLength = 20;
    const fetchedLibsAppsMoreLength = 30;
    const fetchedPeopleLength = 3;

    describe('for passed result set', () => {
      it('should give the count of fetchedResults', () => {
        const returnedObject = SearchResults.getFetchedResultsCount({
          isPreQuery: false,
          ...baseProps,
          ...createResults(
            fetchedServicesLength,
            fetchedLibsAppsMoreLength,
            fetchedPeopleLength,
          ),
        });

        expect(returnedObject.totalCount).toEqual(
          fetchedServicesLength +
            fetchedLibsAppsMoreLength +
            fetchedPeopleLength,
        );
      });
    });
  });
});
