import { Products } from '../../product-context';
import { Site } from '../common-types';
import {
  extractSiteUrl,
  mapTenantIdToSiteUrl,
  extractSiteIdBySiteUrl,
  generatePeopleProfileUrl,
  limitToMaxSiteUsage,
} from '../multi-site-utils';

const sites: Site[] = [
  {
    product: Products.confluence,
    siteName: 'site number one',
    siteUrl: 'https://hello.atlassian.com',
    avatarUrl: 'path/to/avatar/url',
    cloudId: '1234',
  },
  {
    product: Products.confluence,
    siteName: 'site number two',
    siteUrl: 'https://start.atlassian.com',
    avatarUrl: 'path/to/nume/url',
    cloudId: '5678',
  },
  {
    product: Products.confluence,
    siteName: 'site number three',
    siteUrl: 'https://product-fabric.atlassian.com',
    avatarUrl: 'path/to/nume/url',
    cloudId: '9012',
  },
];

describe('extractSiteUrl', () => {
  it('should pass siteUrl value', () => {
    expect(extractSiteUrl({ siteUrl: 'value', sites: [] })).toEqual('value');
  });

  it('should pass siteUrl value with sites defined', () => {
    expect(
      extractSiteUrl({
        siteUrl: 'value',
        sites: [
          {
            siteName: 'something',
            avatarUrl: '',
            cloudId: 'test',
            product: Products.confluence,
            siteUrl: 'different',
          },
        ],
      }),
    ).toEqual('value');
  });

  it('should pass first site/s data', () => {
    expect(
      extractSiteUrl({
        siteUrl: '',
        sites: [
          {
            siteName: 'something',
            avatarUrl: '',
            cloudId: 'test',
            product: Products.confluence,
            siteUrl: 'different value',
          },
        ],
      }),
    ).toEqual('different value');
  });

  it('should pass empty string if none is being passed', () => {
    expect(
      extractSiteUrl({
        siteUrl: '',
        sites: [],
      }),
    ).toEqual('');
  });
});

describe('mapTenantIdToSiteUrl', () => {
  it('should pass the site url of the matching site id', () => {
    expect(mapTenantIdToSiteUrl('1234', sites)).toEqual(sites[0].siteUrl);
  });
  it('should pass the empty string on no match', () => {
    expect(mapTenantIdToSiteUrl('9999', sites)).toEqual('');
  });
});

describe('extractSiteIdBySiteUrl', () => {
  it('should return the site id of the matching site url', () => {
    const path = 'https://hello.atlassian.com/path/to/some/resource';
    expect(extractSiteIdBySiteUrl(path, sites)).toEqual('1234');
  });
  it('should return the empty string on no matches', () => {
    const path = 'https://goodbye.atlassian.com/some/other/path';
    expect(extractSiteIdBySiteUrl(path, sites)).toEqual('');
  });
  it('should return the empty string on a missing url', () => {
    expect(extractSiteIdBySiteUrl('', sites)).toEqual('');
  });
});

describe('generatePeopleProfileUrl', () => {
  describe('in multisite', () => {
    it('should return the absolute url', () => {
      expect(
        generatePeopleProfileUrl(true, 'absoluteUrl', 'accountId', 'jira'),
      ).toEqual('absoluteUrl');
    });

    it('should return the relative url if absolute url is undefined', () => {
      expect(
        generatePeopleProfileUrl(true, undefined, 'accountId', 'jira'),
      ).toEqual('/jira/people/accountId');
    });
  });

  describe('in single site', () => {
    it('should return the relative url', () => {
      expect(
        generatePeopleProfileUrl(false, 'absoluteUrl', 'accountId', 'jira'),
      ).toEqual('/jira/people/accountId');
    });

    it('should return the relative url without product', () => {
      expect(
        generatePeopleProfileUrl(false, 'absoluteUrl', 'accountId', undefined),
      ).toEqual('/people/accountId');
    });
  });
});

describe('limitToMaxSiteUsage', () => {
  it('should return the first 3 (current max) sites from the site list', () => {
    const sites = [
      { cloudId: '1' },
      { cloudId: '2' },
      { cloudId: '3' },
      { cloudId: '4' },
      { cloudId: '5' },
    ] as Site[];
    expect(limitToMaxSiteUsage(sites)).toEqual([
      { cloudId: '1' },
      { cloudId: '2' },
      { cloudId: '3' },
    ]);
  });
  it('should return the all sites if equal to 3 sites (current max)', () => {
    const sites = [
      { cloudId: '1' },
      { cloudId: '2' },
      { cloudId: '3' },
    ] as Site[];
    expect(limitToMaxSiteUsage(sites)).toEqual(sites);
  });
  it('should return the all sites if less than 3 sites (current max)', () => {
    const sites = [{ cloudId: '1' }, { cloudId: '2' }] as Site[];
    expect(limitToMaxSiteUsage(sites)).toEqual(sites);
  });
});
