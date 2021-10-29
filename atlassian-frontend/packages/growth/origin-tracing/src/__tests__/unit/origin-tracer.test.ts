import uuid from 'uuid/v4';
import OriginTracer from '../../origin-tracer';

const mockPackageVersion = process.env._PACKAGE_VERSION_;
jest.mock('uuid/v4');

const mockUuid = '7db2f7fb-2155-4bea-9158-afa790d06a2b';
const mockId = '7db2f7fb21554bea9158afa790d06a2b';
const otherId = 'b60c8f44ef604cc0a92ec2bcdcea5105';
const encodedIdJira =
  'eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9';
const encodedIdConfluence =
  'eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiYyJ9';

const originLibrary = `origin-tracing.js@${mockPackageVersion}`;

describe('OriginTracer', () => {
  let spiesToRestore: jest.SpyInstance[] = [];

  const restoreAfter = (spy: jest.SpyInstance) => spiesToRestore.push(spy);

  beforeEach(() => {
    (uuid as jest.Mock).mockReturnValue(mockUuid);
  });

  afterEach(() => {
    spiesToRestore.forEach((spy) => spy.mockRestore());
    spiesToRestore = [];
  });

  describe('.id', () => {
    test('is automatically generated', () => {
      restoreAfter(
        jest.spyOn(OriginTracer, 'generateId').mockReturnValue(mockId),
      );
      const origin = new OriginTracer({ product: 'jira' });
      expect(origin.id).toBe(mockId);
    });

    test('can be passed to the constructor', () => {
      const origin = new OriginTracer({ id: otherId, product: 'jira' });
      expect(origin.id).toBe(otherId);
    });
  });

  describe('.product', () => {
    test('should be passed to the constructor', () => {
      const origin = new OriginTracer({ product: 'confluence' });
      expect(origin.product).toBe('confluence');
    });
  });

  describe('generateId()', () => {
    test('delegates to the UUID library, and returns its generated value without dashes', () => {
      expect(uuid).toBeCalled();
      expect(OriginTracer.generateId()).toEqual(mockId);
    });
  });

  describe('encoding', () => {
    test('encodes and decodes tracing data', () => {
      const encoded = new OriginTracer({ product: 'confluence' }).encode();
      expect(typeof encoded).toBe('string');
      expect(encoded).toEqual(encodedIdConfluence);

      const decoded = OriginTracer.decode(encoded);
      expect(decoded).toEqual({
        id: mockId,
        product: 'confluence',
      });
    });

    test('additional URL-escaping is unnecessary', () => {
      const origin = new OriginTracer({ product: 'confluence' });
      const originalEncoded = origin.encode();
      const afterEncodeURI = encodeURIComponent(originalEncoded);
      expect(afterEncodeURI).toBe(originalEncoded);
    });
  });

  describe('fromUrl()', () => {
    let origin: OriginTracer;

    beforeEach(() => {
      origin = new OriginTracer({ product: 'jira' });
    });

    test('returns an OriginTracer instance', () => {
      const tracedUrl = `http://test.atlassian.com?atlOrigin=${encodedIdJira}`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(parsed);
    });

    test('returns a Null Object if URL did not have the param', () => {
      const tracedUrl = 'http://test.atlassian.com';

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed instanceof OriginTracer).toBe(true);
      expect(parsed.isValid()).toBe(false);
      expect(parsed.isEmpty()).toBe(true);
      expect(parsed.isMalformed()).toBe(false);
    });

    test('returns a Malformed Object if URL had the param but could not be decoded', () => {
      const invalidValue = 'invalid!!value';
      const tracedUrl = `http://test.atlassian.com?atlOrigin=${invalidValue}`;

      const parsed = OriginTracer.fromUrl(tracedUrl);
      restoreAfter(
        jest.spyOn(OriginTracer, 'decode').mockImplementation(() => {
          throw new TypeError();
        }),
      );

      expect(parsed instanceof OriginTracer).toBe(true);
      expect(parsed.isValid()).toBe(false);
      expect(parsed.isEmpty()).toBe(false);
      expect(parsed.isMalformed()).toBe(true);
      expect(parsed.toAnalyticsAttributes()).toEqual({
        originMalformed: true,
        originLibrary,
      });
    });

    test('handles other parameters', () => {
      const tracedUrl = `http://test.atlassian.com?atlOrigin=${encodedIdJira}&foo=bar`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(origin);
    });

    test('handles other parameters + hash', () => {
      const tracedUrl = `http://test.atlassian.com?foo=bar&atlOrigin=${encodedIdJira}#quux`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(origin);
    });

    test('handles multiple parameters with the same key', () => {
      const tracedUrl = `http://test.atlassian.com?foo=bar&foo=baz&atlOrigin=${encodedIdJira}`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(origin);
    });

    test('handles other parameters with escaped value', () => {
      const tracedUrl = `http://test.atlassian.com?cql=title+%7E+test+OR+text+%7E+test+AND+type+IN+%28page%2C+blogpost%29&atlOrigin=${encodedIdJira}`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(origin);
    });

    test('handles other parameters with unicode', () => {
      const tracedUrl = `http://test.atlassian.com?sometext=\u1703\u1712\u1708\u1714&atlOrigin=${encodedIdJira}`;

      const parsed = OriginTracer.fromUrl(tracedUrl);

      expect(parsed).toEqual(origin);
    });
  });

  describe('addToUrl()', () => {
    let origin: OriginTracer;

    beforeEach(() => {
      origin = new OriginTracer({ product: 'jira' });
      jest.spyOn(origin, 'encode').mockReturnValue('TRACING_STRING');
    });

    test('adds a param to a URL that does not have any params', () => {
      const originalUrl = 'http://atlassian.com';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(origin.encode).toHaveBeenCalledTimes(1);
      expect(tracedUrl).toEqual(
        'http://atlassian.com?atlOrigin=TRACING_STRING',
      );
    });

    test('handles other parameters', () => {
      const originalUrl = 'http://atlassian.com?foo=bar';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl).toEqual(
        'http://atlassian.com?foo=bar&atlOrigin=TRACING_STRING',
      );
    });

    test('handles hash alone', () => {
      const originalUrl = 'http://atlassian.com#quux';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl).toEqual(
        'http://atlassian.com?atlOrigin=TRACING_STRING#quux',
      );
    });

    test('handles other parameters + hash', () => {
      const originalUrl = 'http://atlassian.com?foo=bar#quux';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl).toEqual(
        'http://atlassian.com?foo=bar&atlOrigin=TRACING_STRING#quux',
      );
    });

    test('handles multiple parameters with the same key', () => {
      const originalUrl = 'http://test.atlassian.com?foo=bar&foo=baz';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl.replace(/&atlOrigin=.*$/, '')).toEqual(originalUrl);
    });

    test('handles other parameters with escaped value', () => {
      const originalUrl =
        'http://test.atlassian.com?cql=title+%7E+test+OR+text+%7E+test+AND+type+IN+%28page%2C+blogpost%29';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl.replace(/&atlOrigin=.*$/, '')).toEqual(originalUrl);
    });

    test('handles other parameters with unicode', () => {
      const baseUrl = 'http://test.atlassian.com?sometext=';
      const unicode = '\u1703\u1712\u1708\u1714';
      const escapedUnicode = '%E1%9C%83%E1%9C%92%E1%9C%88%E1%9C%94';

      const tracedUrl = origin.addToUrl(`${baseUrl}${unicode}`);

      expect(tracedUrl.replace(/&atlOrigin=.*$/, '')).toEqual(
        `${baseUrl}${escapedUnicode}`,
      );
    });

    test('overrides existing origin', () => {
      const originalUrl =
        'http://atlassian.com?foo=bar&atlOrigin=OLD_TRACING_STRING';

      const tracedUrl = origin.addToUrl(originalUrl);

      expect(tracedUrl).toEqual(
        'http://atlassian.com?foo=bar&atlOrigin=TRACING_STRING',
      );
    });
  });

  describe('removeFromUrl()', () => {
    let origin: OriginTracer;

    beforeEach(() => {
      origin = new OriginTracer({ product: 'jira' });
    });

    test('returns a url without the tracing parameter', () => {
      const originalUrl = 'http://test.atlassian.com';
      const tracedUrl = `http://test.atlassian.com?atlOrigin=${encodedIdJira}`;

      expect(OriginTracer.removeFromUrl(tracedUrl)).toBe(originalUrl);
    });

    test('handles other parameters', () => {
      const originalUrl = 'http://test.atlassian.com?foo=bar';
      const tracedUrl = `http://test.atlassian.com?foo=bar&atlOrigin=${encodedIdJira}`;

      expect(OriginTracer.removeFromUrl(tracedUrl)).toBe(originalUrl);
    });

    test('handles other parameters + hash', () => {
      const originalUrl = 'http://test.atlassian.com?foo=bar#quux';
      const tracedUrl = `http://test.atlassian.com?atlOrigin=${encodedIdJira}&foo=bar#quux`;

      expect(OriginTracer.removeFromUrl(tracedUrl)).toBe(originalUrl);
    });

    test('handles multiple parameters with the same key', () => {
      const originalUrl = 'http://test.atlassian.com?foo=bar&foo=baz';
      const tracedUrl = `http://test.atlassian.com?foo=bar&foo=baz&atlOrigin=${encodedIdJira}`;

      expect(OriginTracer.removeFromUrl(tracedUrl)).toEqual(originalUrl);
    });

    test('handles other parameters with escaped value', () => {
      const originalUrl =
        'http://test.atlassian.com?cql=title+%7E+test+OR+text+%7E+test+AND+type+IN+%28page%2C+blogpost%29';
      const tracedUrl = origin.addToUrl(originalUrl);

      expect(OriginTracer.removeFromUrl(tracedUrl)).toEqual(originalUrl);
    });

    test('handles other parameters with unicode', () => {
      const baseUrl = 'http://test.atlassian.com?sometext=';
      const unicode = '\u1703\u1712\u1708\u1714';
      const escapedUnicode = '%E1%9C%83%E1%9C%92%E1%9C%88%E1%9C%94';

      const tracedUrl = origin.addToUrl(`${baseUrl}${unicode}`);

      expect(OriginTracer.removeFromUrl(tracedUrl)).toEqual(
        `${baseUrl}${escapedUnicode}`,
      );
    });

    test('does nothing if tracing was not present in the URL', () => {
      const untracedUrl = 'http://test.atlassian.com';

      expect(OriginTracer.removeFromUrl(untracedUrl)).toBe(untracedUrl);
    });
  });

  describe('toAnalyticsAttributes()', () => {
    let origin: OriginTracer;

    beforeEach(() => {
      origin = new OriginTracer({ product: 'jira' });
    });

    test('returns a plain object that can be used as event attributes', () => {
      expect(origin.toAnalyticsAttributes()).toEqual({
        originId: mockId,
        originProduct: 'jira',
        originLibrary,
      });
    });

    test('allows to mark the Id as generated', () => {
      const attrs = origin.toAnalyticsAttributes({
        hasGeneratedId: true,
      });
      expect(attrs).toEqual({
        originIdGenerated: mockId,
        originProduct: 'jira',
        originLibrary,
      });
    });

    test('allows to transform attribute values', () => {
      const attrs = origin.toAnalyticsAttributes({
        transformValue: (value) => `__SAFE(${value})`,
      });
      expect(attrs).toEqual({
        originId: `__SAFE(${mockId})`,
        originProduct: '__SAFE(jira)',
        originLibrary,
      });
    });
  });

  // Regression test: KERBAL-409 (This was an actual bug)
  test('does not replace window.location', () => {
    const mockWindowLocation = ({
      toString: () => 'http://atlassian.com',
      replace: jest.fn(),
    } as unknown) as Location;
    const origin = new OriginTracer({ product: 'jira' });
    origin.addToUrl(mockWindowLocation);
    OriginTracer.fromUrl(mockWindowLocation);
    OriginTracer.removeFromUrl(mockWindowLocation);

    expect(mockWindowLocation.replace).not.toHaveBeenCalled();
  });

  describe('constructor argument errors', () => {
    test('whole object argument missing', () => {
      // @ts-ignore
      expect(() => new OriginTracer()).toThrow(TypeError);
    });

    test('product missing', () => {
      expect(() => new OriginTracer({ id: OriginTracer.generateId() })).toThrow(
        TypeError,
      );
    });

    test('product too long', () => {
      expect(() => new OriginTracer({ product: 'a'.repeat(50) })).toThrow(
        TypeError,
      );
    });

    test('id invalid', () => {
      expect(() => new OriginTracer({ id: '!@#%', product: 'jira' })).toThrow(
        TypeError,
      );
    });

    test('id too long', () => {
      expect(
        () => new OriginTracer({ id: '0'.repeat(50), product: 'jira' }),
      ).toThrow(TypeError);
    });
  });

  test('accepts NanoIDs', () => {
    const sampleNanoID = 'V1StGXR8_Z5jdHi6B-myT';
    let origin: OriginTracer;
    expect(() => {
      origin = new OriginTracer({
        id: 'V1StGXR8_Z5jdHi6B-myT',
        product: 'jira',
      });
    }).not.toThrow();
    expect(origin!.id).toEqual(sampleNanoID);
    expect(origin!.toAnalyticsAttributes()).toEqual(
      expect.objectContaining({
        originId: sampleNanoID,
        originProduct: 'jira',
      }),
    );
  });

  test('accepts harmless mock IDs', () => {
    expect(
      () => new OriginTracer({ id: 'mockAtlOrigin', product: 'jira' }),
    ).not.toThrow(TypeError);
  });
});
