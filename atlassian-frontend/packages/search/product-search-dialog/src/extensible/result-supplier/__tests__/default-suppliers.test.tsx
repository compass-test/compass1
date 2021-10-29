import {
  AggregatorClient,
  ScopedAggregatorResponse,
} from '../../../common/clients';
import { Product } from '../../product-router';
import { createSearchSupplier } from '../default-suppliers';

let mockProduct: Product;

jest.mock('../../product-router', () => ({
  useProductContext: () => ({
    getProduct: jest.fn(() => mockProduct),
  }),
}));

enum TestScope {
  Scope1 = 'test-scope-1',
  Scope2 = 'test-scope-2',
}

interface TestResponse extends ScopedAggregatorResponse<TestScope> {}

const mockResults: { [id: string]: TestResponse } = {
  [TestScope.Scope1]: {
    id: TestScope.Scope1,
  },
  [TestScope.Scope2]: {
    id: TestScope.Scope2,
  },
};

const mockContext = { sessionId: '', referrerId: '' };
const mockExperience = 'test-experience';

const mockSection1 = {
  id: 'test-scope-1',
  title: 'Test scope 1',
};

const mockSection2 = {
  id: 'test-scope-2',
  title: 'Test scope 2',
};

describe('default client suppliers', () => {
  describe('searching', () => {
    let mockSearch = jest.fn();
    const getMockAggregatorClient = () =>
      (({
        search: mockSearch,
      } as any) as AggregatorClient<TestResponse, any>);

    const getMockSearch = (mockResultProps: any = {}) =>
      jest.fn(() =>
        Promise.resolve({
          response: {
            retrieveScope: (id: string) => ({
              ...mockResults[id],
              ...mockResultProps,
            }),
            rawData: {
              scopes: Object.values(mockResults).map((result) => ({
                ...result,
                ...mockResultProps,
              })),
            },
          },
        }),
      );

    beforeEach(() => {
      mockSearch = getMockSearch();
    });

    it('calls the result mapper for each scope with preference to aggregator size', async () => {
      const mockResultMapper = jest.fn(() => [
        {
          title: 'test',
          id: 'id',
          meta: 'meta',
          url: 'url',
          iconUrl: 'icon',
        },
      ]);

      mockSearch = getMockSearch({ size: 100 });
      const searchfn = createSearchSupplier<TestResponse, any>(
        getMockAggregatorClient(),
        [
          {
            ...mockSection1,
            scope: TestScope.Scope1,
            resultMapper: mockResultMapper,
          },
          {
            ...mockSection2,
            scope: TestScope.Scope2,
            resultMapper: mockResultMapper,
          },
        ],
        mockContext,
        mockExperience,
      );

      const response = await searchfn({
        query: 'test',
        sectionIds: ['test-scope-1', 'test-scope-2'],
      });
      expect(mockSearch).toHaveBeenCalledWith({
        context: mockContext,
        experience: mockExperience,
        modelParams: [],
        query: 'test',
        scopes: ['test-scope-1', 'test-scope-2'],
      });

      expect(mockResultMapper).toHaveBeenCalledWith({
        id: TestScope.Scope1,
        size: 100,
      });
      expect(mockResultMapper).toHaveBeenCalledWith({
        id: TestScope.Scope2,
        size: 100,
      });
      expect(response.size).toEqual(200);
    });

    it('calls the result mapper for each scope without size', async () => {
      const mockResultMapper = jest.fn(() => [
        {
          title: 'test',
          id: 'id',
          meta: 'meta',
          url: 'url',
          iconUrl: 'icon',
        },
      ]);
      const searchfn = createSearchSupplier<TestResponse, any>(
        getMockAggregatorClient(),
        [
          {
            ...mockSection1,
            scope: TestScope.Scope1,
            resultMapper: mockResultMapper,
          },
          {
            ...mockSection2,
            scope: TestScope.Scope2,
            resultMapper: mockResultMapper,
          },
        ],
        mockContext,
        mockExperience,
      );

      const response = await searchfn({
        query: 'test',
        sectionIds: ['test-scope-1', 'test-scope-2'],
      });
      expect(mockSearch).toHaveBeenCalledWith({
        context: mockContext,
        experience: mockExperience,
        modelParams: [],
        query: 'test',
        scopes: ['test-scope-1', 'test-scope-2'],
      });

      expect(mockResultMapper).toHaveBeenCalledWith({
        id: TestScope.Scope1,
      });
      expect(mockResultMapper).toHaveBeenCalledWith({
        id: TestScope.Scope2,
      });
      expect(response.size).toEqual(undefined);
    });

    it('throws if the scope isnt in the response body', async () => {
      mockSearch = jest.fn(() =>
        Promise.resolve({
          response: {
            retrieveScope: () => null,
            rawData: {
              scopes: [],
            },
          },
        }),
      );

      const mockResultMapper = jest.fn();
      const searchfn = createSearchSupplier<TestResponse, any>(
        getMockAggregatorClient(),
        [
          {
            ...mockSection1,
            scope: TestScope.Scope1,
            resultMapper: mockResultMapper,
          },
        ],
        mockContext,
        mockExperience,
      );

      try {
        await searchfn({
          query: 'test',
          sectionIds: ['test-scope-1', 'test-scope-2'],
        });
        fail('Expected exception');
      } catch (e) {
        expect(e.message).toEqual(
          'Scope test-scope-1 was not found in the response, despite being requested',
        );
      }
    });

    it('only supplies enabled sections', async () => {
      const mockResultMapper = jest.fn();
      const searchfn = createSearchSupplier<TestResponse, any>(
        getMockAggregatorClient(),
        [
          {
            ...mockSection1,
            scope: TestScope.Scope1,
            resultMapper: mockResultMapper,
          },
          {
            ...mockSection2,
            scope: TestScope.Scope2,
            resultMapper: mockResultMapper,
          },
        ],
        mockContext,
        mockExperience,
      );

      const response = await searchfn({
        query: 'test',
        sectionIds: ['test-scope-1'],
      });
      expect(mockSearch).toHaveBeenCalledWith({
        context: mockContext,
        experience: mockExperience,
        modelParams: [],
        query: 'test',
        scopes: ['test-scope-1'],
      });

      expect(mockResultMapper).toHaveBeenCalledWith({
        id: TestScope.Scope1,
      });
      expect(mockResultMapper).not.toHaveBeenCalledWith({
        id: TestScope.Scope2,
      });
      expect(response).toEqual({
        sections: [
          {
            id: 'test-scope-1',
            searchResults: [],
            title: 'Test scope 1',
            size: undefined,
          },
        ],
        size: undefined,
      });
    });
  });
});
