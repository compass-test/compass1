import { SearchResults } from '../../confluence-search-results/confluence-search-results';
import {
  createPageBlogAttachmentResults,
  createPeopleResults,
  createSpaceResponse,
} from '../../../__tests__/__fixtures__/mock-search-results';

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
  pageBlogResults = 1,
  spaceResults = 1,
  peopleResults = 1,
) => ({
  items: {
    isLoading: false,
    results: createPageBlogAttachmentResults(pageBlogResults),
  },
  spaces: {
    isLoading: false,
    results: createSpaceResponse(spaceResults),
  },
  people: {
    isLoading: false,
    results: createPeopleResults(peopleResults),
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
    const fetchedPagesLength = 20;
    const fetchedSpacesLength = 30;
    const fetchedPeopleLength = 40;

    describe('for passed result set', () => {
      it('should give the count of fetchedResults', () => {
        const returnedObject = SearchResults.getFetchedResultsCount({
          isPreQuery: false,
          ...baseProps,
          ...createResults(
            fetchedPagesLength,
            fetchedSpacesLength,
            fetchedPeopleLength,
          ),
        });

        expect(returnedObject.totalCount).toEqual(
          fetchedPagesLength + fetchedSpacesLength + fetchedPeopleLength,
        );
      });
    });
  });
});
