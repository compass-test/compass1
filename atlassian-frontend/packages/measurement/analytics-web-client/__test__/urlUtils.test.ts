import urlParamExtractor from '../src/urlUtils';

describe('urlUtil', () => {
  let replaceFn: any;

  beforeEach(() => {
    replaceFn = jest.fn();
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href:
          'http://localhost/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&foo=bar',
        hash: '',
      },
    });

    Object.defineProperty(window, 'history', {
      writable: true,
      value: {
        replaceState: replaceFn,
      },
    });
  });

  test('should only capture given param URL', () => {
    expect(
      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.')),
    ).toEqual({
      'awc.test': '3e26efea-4a79-4673-9d7f-d14860155be4',
    });
  });

  test('should match & remove multiple matching parameters', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href:
          'http://localhost/hello?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&awc.fun=potato&foo=bar',
        hash: '',
      },
    });
    expect(
      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.')),
    ).toEqual({
      'awc.test': '3e26efea-4a79-4673-9d7f-d14860155be4',
      'awc.fun': 'potato',
    });
    expect(replaceFn).toHaveBeenCalledWith(
      {},
      '',
      'http://localhost/hello?foo=bar',
    );
  });

  test('should handle empty URL', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://localhost/',
      },
    });
    expect(
      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.')),
    ).toEqual({});
    expect(replaceFn).toHaveBeenCalledTimes(0);
  });

  test('should handle URL with no trailing slash', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href:
          'http://testsite.net/pop/bob?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&awc.fun=potato&foo=bar',
        hash: '',
      },
    });
    urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'));
    expect(replaceFn).toHaveBeenCalledWith(
      {},
      '',
      'http://testsite.net/pop/bob?foo=bar',
    );
  });

  test('should handle URL with trailing slash', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href:
          'http://testsite.net/pop/bob/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4&awc.fun=potato&foo=bar',
        hash: '',
      },
    });

    urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'));
    expect(replaceFn).toHaveBeenCalledWith(
      {},
      '',
      'http://testsite.net/pop/bob/?foo=bar',
    );
  });

  test('should handle no parameter match', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href: 'http://testsite.net/path/?foo=bar',
      },
    });
    expect(
      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.')),
    ).toEqual({});
    expect(replaceFn).toHaveBeenCalledTimes(0);
  });

  test('should handle capturing parameters from URLs with a dot and a path', () => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        href:
          'http://testsite.net/path/dashboard.jspa?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4',
        hash: '',
      },
    });
    urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'));
    expect(replaceFn).toHaveBeenCalledWith(
      {},
      '',
      'http://testsite.net/path/dashboard.jspa',
    );
  });

  describe('fragment hash handling', () => {
    test('should preserve fragment when parsing URL without trailing slash', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href:
            'http://testsite.net/path/dashboard.jspa?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4',
          hash: '#frag12&otherfrag',
        },
      });

      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'));

      expect(replaceFn).toHaveBeenCalledWith(
        {},
        '',
        'http://testsite.net/path/dashboard.jspa#frag12&otherfrag',
      );
    });

    test('should preserve fragment when parsing URL with trailing slash', () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: {
          href:
            'http://testsite.net/path/page/?awc.test=3e26efea-4a79-4673-9d7f-d14860155be4',
          hash: '#frag12&otherfrag',
        },
      });
      urlParamExtractor((_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'));

      expect(replaceFn).toHaveBeenCalledWith(
        {},
        '',
        'http://testsite.net/path/page/#frag12&otherfrag',
      );
    });

    test('should use custom history replace function when specified', () => {
      Object.defineProperty(window.location, 'hash', {
        writable: true,
        value: '#frag12&otherfrag',
      });
      const customReplaceFn = jest.fn();
      urlParamExtractor(
        (_: any, taskSessionName: any) => taskSessionName.startsWith('awc.'),
        customReplaceFn,
      );

      expect(replaceFn).toHaveBeenCalledTimes(0);

      expect(customReplaceFn).toHaveBeenCalledWith(
        'http://localhost/?foo=bar#frag12&otherfrag',
      );
    });
  });
});
