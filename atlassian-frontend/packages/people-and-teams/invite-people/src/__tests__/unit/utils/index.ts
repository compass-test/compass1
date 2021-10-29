import {
  getLandingPathByProduct,
  getProductTitleFromAri,
  normalizeJiraSubProduct,
  extractDomainFromEmail,
  getUniqueEmailDomains,
  ResultStatus,
  waitForAllPromises,
  getDirectAccessLocation,
  resolveCohort,
} from '../../../utils';
const fakeResourceAri =
  'ari:cloud:confluence::site/0125594b-5d14-4f19-ba76-9c8840d22e99';
const invalidAri = 'ari:test/';

describe('getProductTitle', () => {
  it('should return the product title based on the resource ARI', async () => {
    expect(getProductTitleFromAri(fakeResourceAri)).toEqual('Confluence');
  });
  it('should return the product title based on the resource ARI', async () => {
    expect(getProductTitleFromAri(invalidAri)).toEqual('Atlassian');
  });
});

describe('getLandingPathByProduct', () => {
  it('should return an empty string if the first argument is unrecognised', () => {
    expect(getLandingPathByProduct('not found')).toEqual('');
  });

  it('should return `/wiki` for confluence', () => {
    expect(getLandingPathByProduct('confluence')).toEqual('/wiki');
  });
});

describe('normalizeSubProduct', () => {
  it('should add jira- to when passed a subproduct', () => {
    expect(normalizeJiraSubProduct('software')).toEqual('jira-software');
  });
});

describe('extractDomainFromEmail', () => {
  it('should properly parse domain from email', () => {
    expect(extractDomainFromEmail('test@testdomain.com')).toEqual(
      'testdomain.com',
    );
  });
  it('should return null when no domain', () => {
    expect(extractDomainFromEmail('testtestdomain.com')).toEqual(null);
  });
  it('should return the domain correctly when two @ symbols exist', () => {
    expect(extractDomainFromEmail('test@testdomain@anotherdomain.com')).toEqual(
      'anotherdomain.com',
    );
  });
  it('should return null when no domain after @', () => {
    expect(extractDomainFromEmail('test@')).toEqual(null);
  });
  it('should return null when string is empty', () => {
    expect(extractDomainFromEmail('')).toEqual(null);
  });
});

describe('getDirectAccessLocation', () => {
  it('should return jira.core-invites when provided a "jira" product', () => {
    expect(getDirectAccessLocation('jira-software')).toEqual(
      'jira.core-invites',
    );
    expect(getDirectAccessLocation('jira-core')).toEqual('jira.core-invites');
    expect(getDirectAccessLocation('jira-software')).toEqual(
      'jira.core-invites',
    );
    expect(getDirectAccessLocation('jira')).toEqual('jira.core-invites');
  });
  it('should return confluence.core-invites when provided a "confluence" product', () => {
    expect(getDirectAccessLocation('confluence')).toEqual(
      'confluence.core-invites',
    );
  });
});

describe('getUniqueEmailDomains', () => {
  it('should return a single domain', () => {
    expect(getUniqueEmailDomains(['test@domain.com'])).toEqual(
      expect.arrayContaining(['domain.com']),
    );
  });
  it('should return an empty array when no domains provided', () => {
    expect(getUniqueEmailDomains([])).toEqual(expect.arrayContaining([]));
  });
  it('should return array with only valid domains', () => {
    expect(
      getUniqueEmailDomains([
        'valid@domain.com',
        'invalid@',
        'notanemail.com',
        'test@domain@anotherdomain.com',
        '',
        'valid@anotherdomain.com',
      ]),
    ).toEqual(expect.arrayContaining(['domain.com', 'anotherdomain.com']));
  });
  it('should only return a unique set of domains', () => {
    expect(
      getUniqueEmailDomains([
        'valid@domain.com',
        'invalid@',
        'notanemail.com',
        'valid2@domain.com',
        'test@domain@anotherdomain.com',
        '',
        'valid3@domain.com',
      ]),
    ).toEqual(expect.arrayContaining(['domain.com']));
  });
});

const resolvesIn = (timeout: number, value: any) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(value), timeout);
  });

describe('waitForAllPromises', () => {
  test('should return the promise, wrapped in a object containing the status, so it can be filtered later', async () => {
    const a = Promise.resolve('a');
    const b = Promise.reject(new Error('b'));

    expect(await waitForAllPromises([a])).toEqual([
      { status: ResultStatus.FULFILLED, value: 'a' },
    ]);

    expect(await waitForAllPromises([b])).toEqual([
      { status: ResultStatus.FAILED, errorDetails: new Error('b') },
    ]);
  });

  test('should wait for all promises to resolve/reject before resolving itself', async () => {
    expect(
      await waitForAllPromises([
        Promise.resolve('a'),
        resolvesIn(30, 'b'),
        Promise.reject(new Error('c')),
      ]),
    ).toEqual([
      { status: ResultStatus.FULFILLED, value: 'a' },
      { status: ResultStatus.FULFILLED, value: 'b' },
      { status: ResultStatus.FAILED, errorDetails: new Error('c') },
    ]);
  });
});

describe('resolveCohort', () => {
  test('should return defaultCohort and add "noInviteeList" to reasons array when enableInviteeList and thirdPartyOk are both false', () => {
    expect(resolveCohort('cohort', 'defaultCohort', false, false)).toEqual([
      'defaultCohort',
      ['noInviteeList'],
    ]);
  });
  test('should return cohort and empty reasons array when enableInviteeList is true', () => {
    expect(resolveCohort('cohort', 'defaultCohort', true, false)).toEqual([
      'cohort',
      [],
    ]);
  });
  test('should return cohort and empty reasons array when thirdPartyOk is true', () => {
    expect(resolveCohort('cohort', 'defaultCohort', false, true)).toEqual([
      'cohort',
      [],
    ]);
  });
});
