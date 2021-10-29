import { renderHook } from '@testing-library/react-hooks';
import { useOpsgenieURLGenerators } from '../url-generators';

describe('Opsgenie URL generators', () => {
  let originalLocation: Location;
  let arg = {
    cloudId: 'jdog',
  };
  const mockLocation = (hostname: string) => {
    window.location.hostname = hostname;
  };

  beforeEach(() => {
    originalLocation = window.location;

    // @ts-ignore
    delete window.location;
    window.location = { ...originalLocation };
    mockLocation('somesite.atlassian.net');
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  describe('View all link', () => {
    it('Generates a url to view all and uses the query', () => {
      const { result } = renderHook(() =>
        useOpsgenieURLGenerators(arg).viewAllLinkGenerator('test'),
      );

      const url = result.current;

      expect(url).toEqual(
        '/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/jdog?query=test',
      );
    });

    it('Appends host if passed', () => {
      const { result } = renderHook(() =>
        useOpsgenieURLGenerators({
          ...arg,
          hostUrl: 'http//host',
        }).viewAllLinkGenerator('test'),
      );
      const url = result.current;

      expect(url).toEqual(
        'http//host/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/jdog?query=test',
      );
    });
  });

  describe('No Results screen', () => {
    it('Generates a url for the no results screen', () => {
      const { result } = renderHook(() =>
        useOpsgenieURLGenerators(arg).urlGeneratorForNoResultsScreen('test'),
      );
      const url = result.current;

      expect(url).toEqual(
        '/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/jdog?query=test',
      );
    });

    it('Appends host if passed', () => {
      const { result } = renderHook(() =>
        useOpsgenieURLGenerators({
          ...arg,
          hostUrl: 'http//host',
        }).urlGeneratorForNoResultsScreen('test'),
      );
      const url = result.current;

      expect(url).toEqual(
        'http//host/gateway/api/xpsearch-aggregator/redirect/advanced/opsgenie/jdog?query=test',
      );
    });
  });
});
