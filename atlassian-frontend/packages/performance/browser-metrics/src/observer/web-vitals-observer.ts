type MetricResult = { [key: string]: any };
type WebVitalsResponse = {
  name: string;
  value: number;
};

class WebVitalsObserver {
  ttciDetermined: Promise<void> | undefined;
  webVitalsDetermined: Promise<void> | undefined;

  data: MetricResult = {
    'metric:ttci': null,
    'metric:ttfb': null,
    'metric:fid': null,
    'metric:fcp': null,
    'metric:lcp': null,
    'metric:cls': null,
  };

  start() {
    this.ttciDetermined = this.registerTTCI();
    this.webVitalsDetermined = this.registerWebVitals();
  }

  private async registerWebVitals() {
    try {
      const { getCLS, getFCP, getFID, getLCP, getTTFB } = await import(
        /* webpackChunkName: "web-vitals" */
        'web-vitals'
      );
      await Promise.all(
        [getTTFB, getFID, getFCP, getLCP, getCLS].map(
          (fx) =>
            new Promise((resolve) => {
              fx(({ name, value }: WebVitalsResponse) => {
                // round FCP, FID, LCP, TTFB to nearest integer.
                // CLS is rounded to two decimal places.
                const metricName = name.toLowerCase();
                const metricValue =
                  metricName === 'cls'
                    ? parseFloat(value.toFixed(2))
                    : Math.round(value);
                this.data[`metric:${metricName}`] = metricValue;
                resolve();
              });
            }),
        ),
      );
    } catch (e) {}
  }

  private async registerTTCI() {
    try {
      const ttiPolyfill = await import(
        /* webpackChunkName: "tti-polyfill" */
        'tti-polyfill'
      );
      await ttiPolyfill.getFirstConsistentlyInteractive().then((value) => {
        // according to the docs:
        // If no TTI value can be found, or if the browser doesn't support all the APIs required to detect TTI,
        // the promise resolves to null.
        this.data['metric:ttci'] =
          typeof value === 'number' ? Math.round(value) : value;
        return true;
      });
    } catch (e) {}
  }
}

export const webVitalsObserver = new WebVitalsObserver();
