import { setup, analyticTest, beforeAndAfterTestSetup } from '../setup';

describe('analytics - experiment loaded', () => {
  beforeAndAfterTestSetup();

  analyticTest(
    'experiment loaded should be fired on component loaded',
    async () => {
      const { getFiredEvents } = await setup();

      const events = getFiredEvents('experiment loaded');
      expect(events).toHaveLength(1);
      expect(events[0]).toEqual({
        action: 'loaded',
        actionSubject: 'experiment',
        source: 'searchDialog',
        eventType: 'operational',
        nonPrivacySafeAttributes: {},
        attributes: {
          abTest: {
            abTestId: 'default',
            controlId: 'default',
            experimentId: 'nav-v3',
          },
          filters: undefined,
          frontend: '@atlassian/product-search-dialog@__BUILD_VERSION__',
          experimentRequestDuration: expect.any(Number),
          isMultiProduct: false,
        },
      });
    },
  );
});
