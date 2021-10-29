jest.mock('tti-polyfill');
jest.mock('web-vitals');

import { getFirstConsistentlyInteractive } from 'tti-polyfill';
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

import { webVitalsObserver } from '../../web-vitals-observer';

type WebVitalsCallback = ({
  name,
  value,
}: {
  name: string;
  value: number;
}) => void;

describe('web vitals observer', () => {
  const mockWebVitalsFx = (
    {
      name,
      value,
    }: {
      name: string;
      value: number;
    },
    resolveDelay = 0,
  ) => {
    return (fx: WebVitalsCallback) =>
      setTimeout(() => fx({ name, value }), resolveDelay);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sets ttci, ttfb, fid, fcp, lcp, and cls', async () => {
    (getFirstConsistentlyInteractive as any).mockImplementation(() =>
      Promise.resolve(1),
    );
    (getTTFB as any).mockImplementation(
      mockWebVitalsFx({ name: 'TTFB', value: 2.01 }),
    );

    (getFID as any).mockImplementation(
      mockWebVitalsFx({ name: 'FID', value: 3 }),
    );
    (getFCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'FCP', value: 4 }),
    );
    (getLCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'LCP', value: 5 }),
    );
    (getCLS as any).mockImplementation(
      mockWebVitalsFx({ name: 'CLS', value: 0.11 }),
    );
    webVitalsObserver.start();
    await webVitalsObserver.ttciDetermined;
    await webVitalsObserver.webVitalsDetermined;
    expect(await webVitalsObserver.data).toMatchObject({
      'metric:ttci': 1,
      'metric:ttfb': 2,
      'metric:fid': 3,
      'metric:fcp': 4,
      'metric:lcp': 5,
      'metric:cls': 0.11,
    });
  });

  test('sets ttci, ttfb, fid, fcp, lcp, and cls and handles rounding', async () => {
    (getFirstConsistentlyInteractive as any).mockImplementation(() =>
      Promise.resolve(1),
    );
    (getTTFB as any).mockImplementation(
      mockWebVitalsFx({ name: 'TTFB', value: 2.22 }),
    );

    (getFID as any).mockImplementation(
      mockWebVitalsFx({ name: 'FID', value: 3.33 }),
    );
    (getFCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'FCP', value: 4.44 }),
    );
    (getLCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'LCP', value: 5.52 }),
    );
    (getCLS as any).mockImplementation(
      mockWebVitalsFx({ name: 'CLS', value: 0.25555 }),
    );
    webVitalsObserver.start();
    await webVitalsObserver.ttciDetermined;
    await webVitalsObserver.webVitalsDetermined;
    expect(await webVitalsObserver.data).toMatchObject({
      'metric:ttci': 1,
      'metric:ttfb': 2,
      'metric:fid': 3,
      'metric:fcp': 4,
      'metric:lcp': 6,
      'metric:cls': 0.26,
    });
  });

  test('handles ttci failure gracefully', async () => {
    // according to the docs:
    // If no TTI value can be found, or if the browser doesn't support all the APIs required to detect TTI, the promise resolves to null.
    (getFirstConsistentlyInteractive as any).mockImplementation(() =>
      Promise.resolve(null),
    );
    (getTTFB as any).mockImplementation(
      mockWebVitalsFx({ name: 'TTFB', value: 2 }),
    );
    (getFID as any).mockImplementation(
      mockWebVitalsFx({ name: 'FID', value: 3 }),
    );
    (getFCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'FCP', value: 4 }),
    );
    (getLCP as any).mockImplementation(
      mockWebVitalsFx({ name: 'LCP', value: 5 }),
    );
    (getCLS as any).mockImplementation(
      mockWebVitalsFx({ name: 'CLS', value: 0.778 }),
    );
    webVitalsObserver.start();
    await webVitalsObserver.ttciDetermined;
    await webVitalsObserver.webVitalsDetermined;
    expect(await webVitalsObserver.data).toMatchObject({
      'metric:ttci': null,
      'metric:ttfb': 2,
      'metric:fid': 3,
      'metric:fcp': 4,
      'metric:lcp': 5,
      'metric:cls': 0.78,
    });
  });
});
