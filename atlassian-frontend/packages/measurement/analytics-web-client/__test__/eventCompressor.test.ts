import {
  envType,
  eventType,
  originType,
  platformType,
  tenantType,
  userType,
} from '../src/analyticsWebTypes';
import { buildActionEvent, buildScreenEvent } from '../src/eventBuilder';
import EventCompressor, { CompressionRule } from '../src/eventCompressor';
import { InternalProductInfoType } from '../src/types';

declare let require: any;

const { isPlainObject } = require('../src/util/object-utils');

const DEFAULT_TAB_ID = 'c18f2dcf-cb19-4cfe-b3d0-ebf80ac2d074';
const DEFAULT_SESSION_ID = 'a2a117e7-eb46-427f-b1ec-282c71d8a689';

const DEFAULT_PRODUCT_INFO: InternalProductInfoType = {
  product: 'test',
  env: envType.LOCAL,
  origin: originType.WEB,
  platform: platformType.WEB,
  subproduct: () => 'subproduct',
  embeddedProduct: () => undefined,
};

const DEFAULT_TENANT_INFO = {
  tenantIdType: tenantType.CLOUD_ID,
  tenantId: '094a5973-8c42-4ad7-8dc8-34381f1a1470',
};

const DEFAULT_USER_INFO = {
  userIdType: userType.ATLASSIAN_ACCOUNT,
  userId: '04f90652-cd83-4c00-a2fd-e6b2366156f8',
};

const DEFAULT_ORG_INFO = {
  orgId: 'cc5a3b8f-a79a-4265-9984-e497e4b33ac0',
};

const DEFAULT_TASK_SESSIONS: any[] = [];

const DEFAULT_COMPRESSION_FUNCTION = (events: any[]) => [
  {
    eventType: 'operational',
    source: 'test',
    action: 'compressed',
    actionSubject: 'measurementEvents',
    attributes: {
      events: events.map((event) => ({
        eventType: event.eventType,
        action: event.action,
        actionSubject: event.actionSubject,
        actionSubjectId: event.actionSubjectId,
        attributes: event.attributes,
        tags: event.tags,
      })),
    },
  },
];

// Utility method used as a shortcut for creating action events with common properties
const buildTestActionEvent = (
  type: any,
  actionFields: any,
  overrides?: any,
) => {
  const productInfo = {
    ...DEFAULT_PRODUCT_INFO,
    ...(overrides && overrides.productInfo),
  };
  const orgInfo = { ...DEFAULT_ORG_INFO, ...(overrides && overrides.orgInfo) };
  const tenantInfo = {
    ...DEFAULT_TENANT_INFO,
    ...(overrides && overrides.tenantInfo),
  };
  const userInfo = {
    ...DEFAULT_USER_INFO,
    ...(overrides && overrides.userInfo),
  };
  const tabId = (overrides && overrides.tabId) || DEFAULT_TAB_ID;
  const sessionId = (overrides && overrides.sessionId) || DEFAULT_SESSION_ID;
  const taskSessions = (overrides && overrides.taskSessions) || DEFAULT_TASK_SESSIONS;
  return buildActionEvent(
    productInfo,
    tenantInfo,
    userInfo,
    actionFields,
    type,
    tabId,
    sessionId,
    taskSessions,
    orgInfo,
    'some-page-load-id'
  );
};

describe('AnalyticsWebClient', () => {
  describe('eventCompression', () => {
    describe('construction', () => {
      test('if a compressor is constructed with an argument that is not an array, then it should throw an error', () => {
        expect(() => new EventCompressor({ key: 'value' })).toThrow(
          'Event compressors must be constructed with an array of CompressionRules',
        );
      });

      test(
        'if a compressor is constructed with an array that contains some arguments that are not compression rules, '
          + 'then it should throw an error',
        () => {
          expect(() => new EventCompressor([{ key: 'value' }])).toThrow(
            'Event compressors can only be constructed with instances of CompressionRule',
          );
        },
      );

      test(
        'if a compressor is constructed with an empty array, then it should create a valid instance that does not'
          + 'match against any events',
        () => {
          const compressor = new EventCompressor([]);
          const event = buildTestActionEvent('operational', {
            source: 'test',
            action: 'measured',
            actionSubject: 'performance',
          });
          expect(compressor.canCompress(event)).toBe(false);
          expect(compressor.compress([event])).toEqual([event]);
        },
      );

      test(
        'if a compressor is constructed without any argument, then it should create a valid instance that does not'
          + 'match against any events',
        () => {
          const compressor = new EventCompressor();
          const event = buildTestActionEvent('operational', {
            source: 'test',
            action: 'measured',
            actionSubject: 'performance',
          });
          expect(compressor.canCompress(event)).toBe(false);
          expect(compressor.compress([event])).toEqual([event]);
        },
      );

      test(
        'if a compressor is constructed with an undefined argument, then it should create a valid instacne that does not'
          + 'match against any events',
        () => {
          const compressor = new EventCompressor(undefined);
          const event = buildTestActionEvent('operational', {
            source: 'test',
            action: 'measured',
            actionSubject: 'performance',
          });
          expect(compressor.canCompress(event)).toBe(false);
          expect(compressor.compress([event])).toEqual([event]);
        },
      );
    });

    describe('errorHandling', () => {
      test(
        'if a compression predicate throws an error, then the compression should not match any events against it'
          + ' and still perform the compression using the other valid rules',
        () => {
          const compressor = new EventCompressor([
            new CompressionRule(
              () => {
                throw new Error(
                  'Failed to determine whether the event matches the compression rule',
                );
              },
              () => [],
            ),
            new CompressionRule(
              (event: any) => event.tags.includes('successfulCompression'),
              DEFAULT_COMPRESSION_FUNCTION,
            ),
          ]);

          const events = [
            buildTestActionEvent('operational', {
              action: 'measured',
              actionSubject: 'performance',
              tags: ['failedCompression'],
            }),
            buildTestActionEvent('operational', {
              action: 'measured',
              actionSubject: 'performance',
              tags: ['successfulCompression'],
            }),
            buildTestActionEvent('track', {
              action: 'created',
              actionSubject: 'test',
              tags: ['successfulCompression'],
            }),
            buildTestActionEvent('ui', {
              action: 'clicked',
              actionSubject: 'button',
              actionSubjectId: 'testButton',
              tags: ['successfulCompression'],
            }),
          ];

          const output = compressor.compress(events);

          expect(output).toHaveLength(2);

          // Assert that the 'failedCompression' event is included in the output in its un-compressed form
          const expectedFailedCompressionEvents = events.find((event) => event.tags.includes('failedCompression'),);
          expect(expectedFailedCompressionEvents).toEqual(events[0]);

          // Assert that the 'successfulCompression' events were all compressed successfully
          const compressedEvent = output.find(
            (event: any) => event.action === 'compressed'
              && event.actionSubject === 'measurementEvents',
          );
          expect(compressedEvent).toBeDefined();
          expect(compressedEvent.eventType).toEqual('operational');
          expect(compressedEvent.source).toEqual('test');
          expect(compressedEvent.attributes.events).toHaveLength(3);
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'operational',
            action: 'measured',
            actionSubject: 'performance',
            tags: ['successfulCompression'],
          });
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'track',
            action: 'created',
            actionSubject: 'test',
            tags: ['successfulCompression'],
          });
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'ui',
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['successfulCompression'],
          });
        },
      );

      test(
        "if a compression rule's predicate returns a truthy response that is not a boolean, "
          + 'then it should still count as a match',
        () => {
          const compressor = new EventCompressor([
            new CompressionRule(
              () => ({ truthy: true }),
              (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events),
            ),
          ]);

          const events = [
            buildTestActionEvent('operational', {
              action: 'measured',
              actionSubject: 'performance',
            }),
            buildTestActionEvent('track', {
              action: 'created',
              actionSubject: 'test',
            }),
            buildTestActionEvent('ui', {
              action: 'clicked',
              actionSubject: 'button',
              actionSubjectId: 'testButton',
            }),
          ];

          const output = compressor.compress(events);

          const compressedEvent = output.find(
            (event: any) => event.action === 'compressed'
              && event.actionSubject === 'measurementEvents',
          );
          expect(compressedEvent).toBeDefined();
          expect(compressedEvent.eventType).toEqual('operational');
          expect(compressedEvent.source).toEqual('test');
          expect(compressedEvent.attributes.events).toHaveLength(3);
        },
      );

      test('if an error occurs whilst compressing a group, the group is left uncompressed and a warning is logged', () => {
        const compressor = new EventCompressor([
          new CompressionRule(
            (event: any) => event.tags.includes('successfulCompression'),
            DEFAULT_COMPRESSION_FUNCTION,
          ),
          new CompressionRule(
            (event: any) => event.tags.includes('failedCompression'),
            () => {
              throw new Error('Failed to compress the events');
            },
          ),
        ]);

        const events = [
          buildTestActionEvent('operational', {
            action: 'measured',
            actionSubject: 'performance',
            tags: ['successfulCompression'],
          }),
          buildTestActionEvent('track', {
            action: 'created',
            actionSubject: 'test',
            tags: ['successfulCompression'],
          }),
          buildTestActionEvent('ui', {
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['successfulCompression'],
          }),

          buildTestActionEvent('operational', {
            action: 'measured',
            actionSubject: 'performance',
            tags: ['failedCompression'],
          }),
          buildTestActionEvent('track', {
            action: 'created',
            actionSubject: 'test',
            tags: ['failedCompression'],
          }),
          buildTestActionEvent('ui', {
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['failedCompression'],
          }),
        ];

        const output = compressor.compress(events);

        expect(output).toHaveLength(4);

        // Assert that the 'failedCompression' events were included in the output in their uncompressed form
        const expectedFailedCompressionEvents = events.filter((event) => event.tags.includes('failedCompression'),);
        expect(output).toEqual(
          expect.arrayContaining(expectedFailedCompressionEvents),
        );

        // Assert that the 'successfulCompression' events were still compressed
        const compressedEvent = output.find(
          (event: any) => event.action === 'compressed'
            && event.actionSubject === 'measurementEvents',
        );
        expect(compressedEvent).toBeDefined();
        expect(compressedEvent.eventType).toEqual('operational');
        expect(compressedEvent.source).toEqual('test');
        expect(compressedEvent.attributes.events).toHaveLength(3);
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'operational',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['successfulCompression'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'track',
          action: 'created',
          actionSubject: 'test',
          tags: ['successfulCompression'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'ui',
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: 'testButton',
          tags: ['successfulCompression'],
        });
      });

      test('if a compression rule does not return anything, then the group is left uncompressed and a warning is logged', () => {
        const compressor = new EventCompressor([
          new CompressionRule(
            (event: any) => event.tags.includes('successfulCompression'),
            DEFAULT_COMPRESSION_FUNCTION,
          ),
          new CompressionRule(
            (event: any) => event.tags.includes('successfulCompression'),
            () => null,
          ),
        ]);

        const events = [
          buildTestActionEvent('operational', {
            action: 'measured',
            actionSubject: 'performance',
            tags: ['successfulCompression'],
          }),
          buildTestActionEvent('track', {
            action: 'created',
            actionSubject: 'test',
            tags: ['successfulCompression'],
          }),
          buildTestActionEvent('ui', {
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['successfulCompression'],
          }),

          buildTestActionEvent('operational', {
            action: 'measured',
            actionSubject: 'performance',
            tags: ['failedCompression'],
          }),
          buildTestActionEvent('track', {
            action: 'created',
            actionSubject: 'test',
            tags: ['failedCompression'],
          }),
          buildTestActionEvent('ui', {
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['failedCompression'],
          }),
        ];

        const output = compressor.compress(events);

        expect(output).toHaveLength(4);

        // Assert that the 'failedCompression' events were included in the output in their uncompressed form
        const expectedFailedCompressionEvents = events.filter((event) => event.tags.includes('failedCompression'),);
        expect(output).toEqual(
          expect.arrayContaining(expectedFailedCompressionEvents),
        );

        // Assert that the 'successfulCompression' events were still compressed
        const compressedEvent = output.find(
          (event: any) => event.action === 'compressed'
            && event.actionSubject === 'measurementEvents',
        );
        expect(compressedEvent).toBeDefined();
        expect(compressedEvent.eventType).toEqual('operational');
        expect(compressedEvent.source).toEqual('test');
        expect(compressedEvent.attributes.events).toHaveLength(3);
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'operational',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['successfulCompression'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'track',
          action: 'created',
          actionSubject: 'test',
          tags: ['successfulCompression'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'ui',
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: 'testButton',
          tags: ['successfulCompression'],
        });
      });

      const mandatoryFields = ['source', 'action', 'actionSubject'];
      mandatoryFields.forEach((mandatoryField) => {
        test(
          `if a compression rule returns any events that are missing the ${mandatoryField} field, `
            + 'then the group is left uncompressed and a warning is logged',
          () => {
            const compressor = new EventCompressor([
              new CompressionRule(
                (event: any) => event.tags.includes('successfulCompression'),
                DEFAULT_COMPRESSION_FUNCTION,
              ),
              new CompressionRule(
                (event: any) => event.tags.includes('successfulCompression'),
                (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events).map((compressedEvent) => {
                  // @ts-ignore-next-line
                  delete compressedEvent[mandatoryField];
                  return compressedEvent;
                }),
              ),
            ]);

            const events = [
              buildTestActionEvent('operational', {
                action: 'measured',
                actionSubject: 'performance',
                tags: ['successfulCompression'],
              }),
              buildTestActionEvent('track', {
                action: 'created',
                actionSubject: 'test',
                tags: ['successfulCompression'],
              }),
              buildTestActionEvent('ui', {
                action: 'clicked',
                actionSubject: 'button',
                actionSubjectId: 'testButton',
                tags: ['successfulCompression'],
              }),

              buildTestActionEvent('operational', {
                action: 'measured',
                actionSubject: 'performance',
                tags: ['failedCompression'],
              }),
              buildTestActionEvent('track', {
                action: 'created',
                actionSubject: 'test',
                tags: ['failedCompression'],
              }),
              buildTestActionEvent('ui', {
                action: 'clicked',
                actionSubject: 'button',
                actionSubjectId: 'testButton',
                tags: ['failedCompression'],
              }),
            ];

            const output = compressor.compress(events);

            expect(output).toHaveLength(4);

            // Assert that the 'failedCompression' events were included in the output in their uncompressed form
            const expectedFailedCompressionEvents = events.filter((event) => event.tags.includes('failedCompression'),);
            expect(output).toEqual(
              expect.arrayContaining(expectedFailedCompressionEvents),
            );

            // Assert that the 'successfulCompression' events were still compressed
            const compressedEvent = output.find(
              (event: any) => event.action === 'compressed'
                && event.actionSubject === 'measurementEvents',
            );
            expect(compressedEvent).toBeDefined();
            expect(compressedEvent.eventType).toEqual('operational');
            expect(compressedEvent.source).toEqual('test');
            expect(compressedEvent.attributes.events).toHaveLength(3);
            expect(compressedEvent.attributes.events).toContainEqual({
              eventType: 'operational',
              action: 'measured',
              actionSubject: 'performance',
              tags: ['successfulCompression'],
            });
            expect(compressedEvent.attributes.events).toContainEqual({
              eventType: 'track',
              action: 'created',
              actionSubject: 'test',
              tags: ['successfulCompression'],
            });
            expect(compressedEvent.attributes.events).toContainEqual({
              eventType: 'ui',
              action: 'clicked',
              actionSubject: 'button',
              actionSubjectId: 'testButton',
              tags: ['successfulCompression'],
            });
          },
        );
      });

      test(
        'if a compression rules returns any events that are not valid action event types, '
          + 'then the group is left uncompressed and a warning is logged',
        () => {
          const compressor = new EventCompressor([
            new CompressionRule(
              (event: any) => event.tags.includes('successfulCompression'),
              DEFAULT_COMPRESSION_FUNCTION,
            ),
            new CompressionRule(
              (event: any) => event.tags.includes('failedCompression'),
              () => [
                {
                  eventType: 'screen',
                  name: 'testScreen',
                },
              ],
            ),
          ]);

          const events = [
            buildTestActionEvent('operational', {
              action: 'measured',
              actionSubject: 'performance',
              tags: ['successfulCompression'],
            }),
            buildTestActionEvent('track', {
              action: 'created',
              actionSubject: 'test',
              tags: ['successfulCompression'],
            }),
            buildTestActionEvent('ui', {
              action: 'clicked',
              actionSubject: 'button',
              actionSubjectId: 'testButton',
              tags: ['successfulCompression'],
            }),

            buildTestActionEvent('operational', {
              action: 'measured',
              actionSubject: 'performance',
              tags: ['failedCompression'],
            }),
            buildTestActionEvent('track', {
              action: 'created',
              actionSubject: 'test',
              tags: ['failedCompression'],
            }),
            buildTestActionEvent('ui', {
              action: 'clicked',
              actionSubject: 'button',
              actionSubjectId: 'testButton',
              tags: ['failedCompression'],
            }),
          ];

          const output = compressor.compress(events);
          expect(output).toHaveLength(4);

          // Assert that the 'failedCompression' events were included in the output in their uncompressed form
          const expectedFailedCompressionEvents = events.filter((event) => event.tags.includes('failedCompression'),);
          expect(output).toEqual(
            expect.arrayContaining(expectedFailedCompressionEvents),
          );

          // Assert that the 'successfulCompression' events were still compressed
          const compressedEvent = output.find(
            (event: any) => event.action === 'compressed'
              && event.actionSubject === 'measurementEvents',
          );
          expect(compressedEvent).toBeDefined();
          expect(compressedEvent.eventType).toEqual('operational');
          expect(compressedEvent.source).toEqual('test');
          expect(compressedEvent.attributes.events).toHaveLength(3);
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'operational',
            action: 'measured',
            actionSubject: 'performance',
            tags: ['successfulCompression'],
          });
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'track',
            action: 'created',
            actionSubject: 'test',
            tags: ['successfulCompression'],
          });
          expect(compressedEvent.attributes.events).toContainEqual({
            eventType: 'ui',
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['successfulCompression'],
          });
        },
      );
    });

    describe('contextFieldGrouping', () => {
      const contextOverrides = [
        { productInfo: { env: 'otherEnv' } },
        { productInfo: { product: 'otherProduct' } },
        { productInfo: { subproduct: () => 'otherSubproduct' } },
        { productInfo: { version: 'otherVersion' } },
        { productInfo: { origin: 'otherOrigin' } },
        { productInfo: { platform: 'otherPlatform' } },
        { tenantInfo: { tenantIdType: tenantType.OPSGENIE_CUSTOMER_ID } },
        { tenantInfo: { tenantId: 'otherTenantId' } },
        { orgInfo: { orgId: 'otherOrgId' } },
        { userInfo: { userIdType: userType.HASHED_EMAIL } },
        { tabId: 'otherTabId' },
        { sessionId: 'otherSessionId' },
        { taskSessions: ['otherTaskSession'] },
      ];

      contextOverrides.forEach((override) => {
        const fieldName: any = Object.entries(override).reduce(
          (acc: any, [key, value]: [string, any]) => (isPlainObject(value) ? Object.keys(value)[0] : key),
          null,
        );

        test(`events with a different values for the ${fieldName} field should be not be compressed together`, () => {
          // Create some events with the standard fields
          const defaultFieldEvents: any[] = [];
          for (let i = 0; i !== 5; i++) {
            defaultFieldEvents.push(
              buildTestActionEvent('operational', {
                source: 'test',
                action: 'measured',
                actionSubject: 'performance',
              }),
            );
          }

          // Create some other events that are identical except for the overridden field
          const overriddenEvents: any[] = [];
          for (let i = 0; i !== 5; i++) {
            overriddenEvents.push(
              buildTestActionEvent(
                'operational',
                {
                  source: 'test',
                  action: 'measured',
                  actionSubject: 'performance',
                },
                override,
              ),
            );
          }

          // Create a compressor with a rule that will match _all_ of these events
          const compressor = new EventCompressor([
            new CompressionRule(() => true, DEFAULT_COMPRESSION_FUNCTION),
          ]);

          const output = compressor.compress([
            ...defaultFieldEvents,
            ...overriddenEvents,
          ]);

          // Assert that there are separate compressed events for each of the field values
          expect(output).toHaveLength(2);
          const defaultCompressedEvent = output.find(
            (event: any) => event[fieldName] === defaultFieldEvents[0][fieldName],
          );
          expect(defaultCompressedEvent).toBeDefined();
          const overrideCompressedEvent = output.find(
            (event: any) => event[fieldName] === overriddenEvents[0][fieldName],
          );
          expect(overrideCompressedEvent).toBeDefined();
        });
      });

      test(
        'when all events have the same context, but match different compression rules, '
          + 'there should be a compressed event per compression rule',
        () => {
          const compressor = new EventCompressor([
            new CompressionRule(
              (event: any) => event.tags.includes('firstCompression'),
              (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events).map(
                (compressedEvent: any) => {
                  compressedEvent.tags = ['firstCompressionResult'];
                  return compressedEvent;
                },
              ),
            ),
            new CompressionRule(
              (event: any) => event.tags.includes('secondCompression'),
              (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events).map(
                (compressedEvent: any) => {
                  compressedEvent.tags = ['secondCompressionResult'];
                  return compressedEvent;
                },
              ),
            ),
          ]);

          const eventForFirstCompressor = buildTestActionEvent('operational', {
            source: 'test',
            action: 'measured',
            actionSubject: 'performance',
            tags: ['firstCompression'],
          });
          const eventForSecondCompressor = buildTestActionEvent('operational', {
            source: 'test',
            action: 'measured',
            actionSubject: 'performance',
            tags: ['secondCompression'],
          });

          const output = compressor.compress([
            eventForFirstCompressor,
            eventForSecondCompressor,
          ]);
          expect(output).toHaveLength(2);

          const firstCompressionResult = output.find((event: any) => event.tags.includes('firstCompressionResult'),);
          expect(firstCompressionResult).toBeDefined();
          expect(firstCompressionResult.action).toEqual('compressed');
          expect(firstCompressionResult.actionSubject).toEqual(
            'measurementEvents',
          );
          const secondCompressionResult = output.find((event: any) => event.tags.includes('secondCompressionResult'),);
          expect(secondCompressionResult).toBeDefined();
          expect(secondCompressionResult.action).toEqual('compressed');
          expect(secondCompressionResult.actionSubject).toEqual(
            'measurementEvents',
          );
        },
      );

      test('events that match multiple compression rules should only be grouped into the first matching rule', () => {
        const compressor = new EventCompressor([
          new CompressionRule(
            (event: any) => event.tags.includes('firstCompression'),
            (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events).map(
              (compressedEvent: any) => {
                compressedEvent.tags = ['firstCompressionResult'];
                return compressedEvent;
              },
            ),
          ),
          new CompressionRule(
            (event: any) => event.tags.includes('secondCompression'),
            (events: any[]) => DEFAULT_COMPRESSION_FUNCTION(events).map(
              (compressedEvent: any) => {
                compressedEvent.tags = ['secondCompressionResult'];
                return compressedEvent;
              },
            ),
          ),
        ]);

        const eventForFirstCompressor = buildTestActionEvent('operational', {
          source: 'test',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['firstCompression'],
        });
        const eventForSecondCompressor = buildTestActionEvent('operational', {
          source: 'test',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['secondCompression'],
        });
        const eventForBothCompressors = buildTestActionEvent('operational', {
          source: 'test',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['firstCompression', 'secondCompression'],
        });

        const output = compressor.compress([
          eventForFirstCompressor,
          eventForSecondCompressor,
          eventForBothCompressors,
        ]);
        expect(output).toHaveLength(2);

        const firstCompressionResult = output.find((event: any) => event.tags.includes('firstCompressionResult'),);
        expect(firstCompressionResult).toBeDefined();
        expect(firstCompressionResult.action).toEqual('compressed');
        expect(firstCompressionResult.actionSubject).toEqual(
          'measurementEvents',
        );
        expect(firstCompressionResult.attributes.events).toHaveLength(2);
        const secondCompressionResult = output.find((event: any) => event.tags.includes('secondCompressionResult'),);
        expect(secondCompressionResult).toBeDefined();
        expect(secondCompressionResult.action).toEqual('compressed');
        expect(secondCompressionResult.actionSubject).toEqual(
          'measurementEvents',
        );
        expect(secondCompressionResult.attributes.events).toHaveLength(1);
      });
    });

    describe('exceptions', () => {
      test('screen and identify events should be excluded from compression even if they match a compression rule', () => {
        const compressor = new EventCompressor([
          new CompressionRule(
            (event: any) => event.tags.includes('measurement'),
            DEFAULT_COMPRESSION_FUNCTION,
          ),
        ]);

        const identifyEvent = {
          userId: 'testUser',
          userType: userType.ATLASSIAN_ACCOUNT,
          eventType: eventType.IDENTIFY,
          tags: ['measurement'],
        };

        const screenEvent = buildScreenEvent(
          DEFAULT_PRODUCT_INFO,
          DEFAULT_TENANT_INFO,
          DEFAULT_USER_INFO,
          {},
          {},
          ['measurement'],
          DEFAULT_TAB_ID,
          DEFAULT_SESSION_ID,
          DEFAULT_TASK_SESSIONS,
          DEFAULT_ORG_INFO,
          'some-page-load-id'
        );

        const actionEvents = [
          buildTestActionEvent('operational', {
            action: 'measured',
            actionSubject: 'performance',
            tags: ['measurement'],
          }),
          buildTestActionEvent('track', {
            action: 'created',
            actionSubject: 'test',
            tags: ['measurement'],
          }),
          buildTestActionEvent('ui', {
            action: 'clicked',
            actionSubject: 'button',
            actionSubjectId: 'testButton',
            tags: ['measurement'],
          }),
        ];

        const output = compressor.compress([
          identifyEvent,
          screenEvent,
          ...actionEvents,
        ]);

        // Assert that the identify and screen event are left as they were
        expect(output).toHaveLength(3);
        expect(output).toEqual(
          expect.arrayContaining([identifyEvent, screenEvent]),
        );

        // Assert that there is one compressed event that contains all of the action events
        const compressedEvent = output.find(
          (event: any) => event.action === 'compressed'
            && event.actionSubject === 'measurementEvents',
        );
        expect(compressedEvent).toBeDefined();
        expect(compressedEvent.eventType).toEqual('operational');
        expect(compressedEvent.source).toEqual('test');
        expect(compressedEvent.attributes.events).toHaveLength(3);
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'operational',
          action: 'measured',
          actionSubject: 'performance',
          tags: ['measurement'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'track',
          action: 'created',
          actionSubject: 'test',
          tags: ['measurement'],
        });
        expect(compressedEvent.attributes.events).toContainEqual({
          eventType: 'ui',
          action: 'clicked',
          actionSubject: 'button',
          actionSubjectId: 'testButton',
          tags: ['measurement'],
        });
      });
    });
  });
});
