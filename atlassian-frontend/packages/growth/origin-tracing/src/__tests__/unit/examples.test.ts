/**
 * This file contains examples used in documentation:
 * https://extranet.atlassian.com/display/PGT/How+to+use+Origin+Tracing
 *
 * If you change any of these tests, remember to update that docs page.
 */
import uuid from 'uuid/v4';
import OriginTracer from '../../origin-tracer';

jest.mock('uuid/v4');

describe('OriginTracer', () => {
  let fireAnalyticsEvent: jest.Mock;
  let location: Location;
  let history: History;

  beforeEach(() => {
    (uuid as jest.Mock).mockReturnValue('7db2f7fb-2155-4bea-9158-afa790d06a2b');
    fireAnalyticsEvent = jest.fn();
    location = { href: '' } as Location;

    history = ({
      replaceState(
        stateObj: { [key: string]: any },
        title: string,
        newHref: string,
      ) {
        location.href = newHref;
      },
    } as unknown) as History;
  });

  describe('Use cases', () => {
    let fetch: jest.Mock;
    let shareLinkInput: Partial<HTMLInputElement>;

    beforeEach(() => {
      fetch = jest.fn();
      shareLinkInput = {};
    });

    test('Journey begins: A share/invite action happens', () => {
      shareLinkInput.value = 'https://growth.jira-dev.com/browse/KERBAL-353';

      // 1. Generate a new ID.
      const origin = new OriginTracer({ product: 'jira' });

      // 2. Fire an event.
      fireAnalyticsEvent('jira.issueShare.shareButton.click', {
        ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
      });

      // 3a. Add atlOrigin to your share link
      shareLinkInput.value = origin.addToUrl(shareLinkInput.value);

      // 3b. Post atlOrigin to the server so that it can be added to email URLs
      const postData = {
        atlOrigin: origin.encode(),
        otherData: 42,
      };
      fetch('jira-dev.com', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      expect(fireAnalyticsEvent).toHaveBeenLastCalledWith(
        'jira.issueShare.shareButton.click',
        {
          originProduct: 'jira',
          originIdGenerated: '7db2f7fb21554bea9158afa790d06a2b',
          originLibrary: expect.any(String),
        },
      );
      expect(shareLinkInput.value).toBe(
        'https://growth.jira-dev.com/browse/KERBAL-353?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
      );
      expect(fetch).toHaveBeenLastCalledWith(
        'jira-dev.com',
        expect.objectContaining({
          body:
            '{"atlOrigin":"eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9","otherData":42}',
        }),
      );
    });

    test('Journey ends: the user lands into the target product', () => {
      location.href =
        'https://growth.jira-dev.com/browse/KERBAL-353?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9';

      // 1. Read origin from the URL
      const origin = OriginTracer.fromUrl(location.href);

      // 2. If origin was present...
      if (!origin.isEmpty()) {
        // 2a. Emit an event
        fireAnalyticsEvent('jira.page.with-atl-origin.viewed', {
          someData: 42,
          ...origin.toAnalyticsAttributes(),
        });

        // 2b. Remove altOrigin from the URL
        history.replaceState({}, '', OriginTracer.removeFromUrl(location.href));
      }

      expect(fireAnalyticsEvent).toHaveBeenLastCalledWith(
        'jira.page.with-atl-origin.viewed',
        {
          originProduct: 'jira',
          originId: '7db2f7fb21554bea9158afa790d06a2b',
          originLibrary: expect.any(String),
          someData: 42,
        },
      );
      expect(location.href).toEqual(
        'https://growth.jira-dev.com/browse/KERBAL-353',
      );
    });
  });

  describe('Generating a unique tracing ID', () => {
    test('Letting the constructor generate ID automatically', () => {
      const origin = new OriginTracer({ product: 'jira' });
      expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
    });

    test('Generating ID manually and passing to the constructor', () => {
      const originId = OriginTracer.generateId();

      expect(originId).toBe('7db2f7fb21554bea9158afa790d06a2b');

      const origin = new OriginTracer({ id: originId, product: 'jira' });
      expect(origin.id).toBe(originId);
    });
  });

  test('Adding tracing information to a URL', () => {
    location.href = 'https://id.stg.internal.atlassian.com/login';

    const origin = new OriginTracer({ product: 'jira' });
    location.href = origin.addToUrl(location.href);

    expect(location.href).toBe(
      'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
    );
  });

  test('Removing tracing information from a URL', () => {
    location.href =
      'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9';

    location.href = OriginTracer.removeFromUrl(location.href);
    expect(location.href).toBe('https://id.stg.internal.atlassian.com/login');
  });

  describe('Reading tracing information from a URL', () => {
    test('When origin info is valid', () => {
      location.href =
        'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9';

      const origin = OriginTracer.fromUrl(location.href);

      expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
      expect(origin.product).toBe('jira');

      expect(origin.isValid()).toBe(true);
      expect(origin.isEmpty()).toBe(false);
    });

    test('When origin info is not present', () => {
      location.href = 'https://id.stg.internal.atlassian.com/login';

      const origin = OriginTracer.fromUrl(location.href);

      expect(origin.id).toBe(null);
      expect(origin.product).toBe(null);

      expect(origin.isValid()).toBe(false);
      expect(origin.isEmpty()).toBe(true);
    });

    test('When origin info is malformed', () => {
      location.href =
        'https://id.stg.internal.atlassian.com/login?atlOrigin=$@!@malformed!!!';

      const origin = OriginTracer.fromUrl(location.href);

      expect(origin.id).toBe(null);
      expect(origin.product).toBe(null);

      expect(origin.isValid()).toBe(false);
      expect(origin.isEmpty()).toBe(false);
    });

    test('When the whole url is malformed', () => {
      location.href = 'malformedurl!!!';

      const origin = OriginTracer.fromUrl(location.href);

      expect(origin.id).toBe(null);
      expect(origin.product).toBe(null);

      expect(origin.isValid()).toBe(false);
      expect(origin.isEmpty()).toBe(true);
    });

    test('When the URL contains origin with a NanoID', () => {
      location.href =
        'https://id.stg.internal.atlassian.com/login?atlOrigin=eyJpIjoiVWFrZ2JfSjVtOWctMEpETWJjSnFMSiIsInAiOiJqIn0';

      const origin = OriginTracer.fromUrl(location.href);

      expect(origin.id).toBe('Uakgb_J5m9g-0JDMbcJqLJ');
      expect(origin.product).toBe('jira');

      expect(origin.isValid()).toBe(true);
      expect(origin.isEmpty()).toBe(false);
    });
  });

  test('Encoding tracing information into a string', () => {
    const origin = new OriginTracer({ product: 'jira' });
    const encoded = origin.encode();

    expect(encoded).toBe(
      'eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
    );

    // URL-encoding doesn't affect the value
    expect(encodeURIComponent(encoded)).toBe(encoded);

    // Implementation details
    expect(atob(encoded)).toBe(
      '{"i":"7db2f7fb21554bea9158afa790d06a2b","p":"j"}',
    );
    expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
    expect(origin.product).toBe('jira');
  });

  test('Decoding tracing information from a string', () => {
    const origin = OriginTracer.decode(
      'eyJpIjoiN2RiMmY3ZmIyMTU1NGJlYTkxNThhZmE3OTBkMDZhMmIiLCJwIjoiaiJ9',
    );

    expect(origin.id).toBe('7db2f7fb21554bea9158afa790d06a2b');
    expect(origin.product).toBe('jira');
  });

  describe('Analytics', () => {
    let origin: OriginTracer;

    beforeEach(() => {
      origin = new OriginTracer({ product: 'jira' });
    });

    test('adding attributes to an event', () => {
      fireAnalyticsEvent('jira.sharePage.closed', {
        someData: 42,
        ...origin.toAnalyticsAttributes(),
      });

      expect(fireAnalyticsEvent).toHaveBeenLastCalledWith(
        'jira.sharePage.closed',
        {
          someData: 42,
          originId: '7db2f7fb21554bea9158afa790d06a2b',
          originProduct: 'jira',
          originLibrary: expect.any(String),
        },
      );
    });

    test('passing hasGeneratedId for events that generated the ID', () => {
      fireAnalyticsEvent('jira.issueShare.shareButton.click', {
        someData: 42,
        ...origin.toAnalyticsAttributes({ hasGeneratedId: true }),
      });

      expect(fireAnalyticsEvent).toHaveBeenLastCalledWith(
        'jira.issueShare.shareButton.click',
        {
          someData: 42,
          originIdGenerated: '7db2f7fb21554bea9158afa790d06a2b',
          originProduct: 'jira',
          originLibrary: expect.any(String),
        },
      );
    });

    test('marking attributes as safe strings', () => {
      const safeString = jest
        .fn()
        .mockImplementation((s: string) => `__SAFE(${s})`);

      fireAnalyticsEvent('jira.sharePage.closed', {
        someData: 42,
        ...origin.toAnalyticsAttributes({
          transformValue: (value) =>
            typeof value === 'string' ? safeString(value) : value,
        }),
      });

      expect(fireAnalyticsEvent).toHaveBeenLastCalledWith(
        'jira.sharePage.closed',
        {
          someData: 42,
          originId: '__SAFE(7db2f7fb21554bea9158afa790d06a2b)',
          originProduct: '__SAFE(jira)',
          originLibrary: expect.any(String),
        },
      );
    });
  });
});
