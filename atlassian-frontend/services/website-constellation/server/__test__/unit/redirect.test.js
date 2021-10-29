const { getRedirectURL, createResponse } = require('../../redirect');

const mockRedirects = [
  ['/guidelines/products/components/avatars', '/components/avatars'],
  [
    '/guidelines/products/components/tables',
    'https://atlaskit.atlassian.com/packages/design-system/dynamic-table',
  ],
];

jest.mock('../../constants/redirect-urls.js', () => {
  return [
    ['/guidelines/products/components/avatars', '/components/avatars'],
    [
      '/guidelines/products/components/tables',
      'https://atlaskit.atlassian.com/packages/design-system/dynamic-table',
    ],
  ];
});

describe('getRedirectURL', () => {
  it('should return undefined if no path is passed in', () => {
    expect(getRedirectURL(null)).toBe(undefined);
  });

  it('should return undefined if no redirect url exists for the passed in path', () => {
    expect(getRedirectURL('/')).toBe(undefined);
  });

  it('should return the specified redirectURL if one exists', () => {
    expect(getRedirectURL('/guidelines/products/components/avatars')).toBe(
      mockRedirects[0][1],
    );
  });

  it('should strip a trailing slash and return the specified redirectURL if one exists', () => {
    expect(getRedirectURL('/guidelines/products/components/avatars/')).toBe(
      mockRedirects[0][1],
    );
  });
});

describe('createResponse', () => {
  it('should return the passed request if no redirectUri exists', () => {
    const request = {
      status: '200',
      uri: '/',
    };
    const response = createResponse(request);
    expect(response).toBe(request);
    expect(response.uri).toBe(request.uri);
  });

  it('should return a response with the redirect path specified in the Location header if a redirect is found', () => {
    const request = {
      status: '200',
      uri: '/guidelines/products/components/tables',
    };
    const response = createResponse(request);
    expect(response).not.toBe(request);
    expect(response.headers.location[0].value).toBe(
      'https://atlaskit.atlassian.com/packages/design-system/dynamic-table',
    );
  });
});
