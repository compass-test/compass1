import { bitbucketURLGenerators } from '../url-generators';

describe('Bitbucket URL generators', () => {
  let originalLocation: Location;

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

  describe('Code Search', () => {
    it('Generates a url for code search', () => {
      const url = bitbucketURLGenerators().codeSearchUrlGenerator('test');

      expect(url).toEqual('https://bitbucket.org/search?q=test');
    });

    it('URL Encodes params for code search', () => {
      const url = bitbucketURLGenerators().codeSearchUrlGenerator(
        'http://test',
      );

      expect(url).toEqual('https://bitbucket.org/search?q=http%3A%2F%2Ftest');
    });

    it('Generates the right URL when empty string is passed', () => {
      const url = bitbucketURLGenerators().codeSearchUrlGenerator('');

      expect(url).toEqual('https://bitbucket.org/search');
    });
  });

  describe('View all link', () => {
    it('Generates a url to view all', () => {
      const url = bitbucketURLGenerators().viewAllLinkGenerator('test');

      expect(url).toEqual(
        'https://bitbucket.org/dashboard/repositories?search=test',
      );
    });

    it('URL Encodes params for code search', () => {
      const url = bitbucketURLGenerators().viewAllLinkGenerator('http://test');

      expect(url).toEqual(
        'https://bitbucket.org/dashboard/repositories?search=http%3A%2F%2Ftest',
      );
    });
  });

  describe('No Results screen', () => {
    it('Generates a url for the no results screen', () => {
      const url = bitbucketURLGenerators().urlGeneratorForNoResultsScreen(
        'test',
      );

      expect(url).toEqual(
        'https://bitbucket.org/dashboard/repositories?search=test',
      );
    });

    it('URL Encodes params for the no results screen url', () => {
      const url = bitbucketURLGenerators().urlGeneratorForNoResultsScreen(
        'http://test',
      );

      expect(url).toEqual(
        'https://bitbucket.org/dashboard/repositories?search=http%3A%2F%2Ftest',
      );
    });

    it('Generates the right URL when no url is passed', () => {
      const url = bitbucketURLGenerators().urlGeneratorForNoResultsScreen('');

      expect(url).toEqual('https://bitbucket.org/dashboard/repositories');
    });
  });

  it('can override methods', () => {
    const {
      codeSearchUrlGenerator,
      viewAllLinkGenerator,
      urlGeneratorForNoResultsScreen,
    } = bitbucketURLGenerators({
      codeSearchUrlGenerator: () => 'url-generator',
      viewAllLinkGenerator: () => 'view-all-link-generator',
      urlGeneratorForNoResultsScreen: () => 'no-results-screen-generator',
    });

    expect(codeSearchUrlGenerator('')).toEqual('url-generator');
    expect(viewAllLinkGenerator('')).toEqual('view-all-link-generator');
    expect(urlGeneratorForNoResultsScreen('')).toEqual(
      'no-results-screen-generator',
    );
  });

  describe('Staging URLs', () => {
    it('generates the right urls in localhost', () => {
      mockLocation('localhost:12345');
      const {
        codeSearchUrlGenerator,
        viewAllLinkGenerator,
        urlGeneratorForNoResultsScreen,
      } = bitbucketURLGenerators();

      expect(codeSearchUrlGenerator('test')).toEqual(
        'https://staging.bb-inf.net/search?q=test',
      );
      expect(viewAllLinkGenerator('test')).toEqual(
        'https://staging.bb-inf.net/dashboard/repositories?search=test',
      );
      expect(urlGeneratorForNoResultsScreen('test')).toEqual(
        'https://staging.bb-inf.net/dashboard/repositories?search=test',
      );
    });

    it('generates the right urls in staging', () => {
      mockLocation('somesite.jira-dev.com');
      const {
        codeSearchUrlGenerator,
        viewAllLinkGenerator,
        urlGeneratorForNoResultsScreen,
      } = bitbucketURLGenerators();

      expect(codeSearchUrlGenerator('test')).toEqual(
        'https://staging.bb-inf.net/search?q=test',
      );
      expect(viewAllLinkGenerator('test')).toEqual(
        'https://staging.bb-inf.net/dashboard/repositories?search=test',
      );
      expect(urlGeneratorForNoResultsScreen('test')).toEqual(
        'https://staging.bb-inf.net/dashboard/repositories?search=test',
      );
    });
  });
});
