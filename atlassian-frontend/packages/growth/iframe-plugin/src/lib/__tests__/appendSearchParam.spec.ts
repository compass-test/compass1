import { appendSearchParam } from '../appendSearchParam';

describe('appendSearchParam', () => {
  const tests = [
    // src, key, value, expectedOutput
    [
      '/gpa-product-store',
      'route',
      '/confluence/',
      '/gpa-product-store?route=%2Fconfluence%2F',
    ],
    [
      '/gpa-product-store?a=1',
      'route',
      '/confluence/',
      '/gpa-product-store?a=1&route=%2Fconfluence%2F',
    ],
    [
      '/gpa-product-store?a=1&b=2',
      'route',
      '/confluence/',
      '/gpa-product-store?a=1&b=2&route=%2Fconfluence%2F',
    ],
    [
      '/gpa-product-store?a=1&b=2#someRoute',
      'route',
      '/confluence/',
      '/gpa-product-store?a=1&b=2&route=%2Fconfluence%2F#someRoute',
    ],
    [
      'http://example.com/gpa',
      'route',
      '/confluence/',
      'http://example.com/gpa?route=%2Fconfluence%2F',
    ],
    [
      'http://example.com/gpa#someRoute',
      'route',
      '/confluence/',
      'http://example.com/gpa?route=%2Fconfluence%2F#someRoute',
    ],
    [
      'http://example.com/gpa#route=someRoute&component=upflow',
      'route',
      '/confluence/',
      'http://example.com/gpa?route=%2Fconfluence%2F#route=someRoute&component=upflow',
    ],
    [
      'http://example.com/gpa?existingQuery=true#route=someRoute&component=upflow',
      'route',
      '/confluence/',
      'http://example.com/gpa?existingQuery=true&route=%2Fconfluence%2F#route=someRoute&component=upflow',
    ],
    [
      'https://up-flow-spa.staging.atl-paas.net/#/add-payment?currentEdition=free&targetEdition=standard&showPricing=false&locale=en-US&canChangeEdition=true&cloudId=0c246eb8-5fff-4c74-b5c3-8d62a34f96b6&flow=upgrade&product=confluence&touchpointId=pageRestrictionsInline',
      'route',
      'confluence',
      'https://up-flow-spa.staging.atl-paas.net/?route=confluence#/add-payment?currentEdition=free&targetEdition=standard&showPricing=false&locale=en-US&canChangeEdition=true&cloudId=0c246eb8-5fff-4c74-b5c3-8d62a34f96b6&flow=upgrade&product=confluence&touchpointId=pageRestrictionsInline',
    ],
  ];

  for (const [src, key, value, expectedOutput] of tests) {
    it(`should correctly append query param to ${src}`, () => {
      expect(appendSearchParam(src, key, value)).toBe(expectedOutput);
    });
  }
});
