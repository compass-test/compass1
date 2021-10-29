import generateChance from '../../../__test__/util/chance';
import { eventType } from '../../analyticsWebTypes';
import {
  RetryQueueOptions,
} from '../../resilienceQueue';
import { Context } from '../../types';
import EventProcessor, {
  METADATA
} from '../eventProcessor';
import getResilienceQueue, {
  IntermediateBatchableQueue
} from '../intermediateResilienceQueue';
import {
  PackagedEvent,
  SegmentIdentifyEventDef,
  SegmentIdentifyEventTraitsDef,
  SegmentProperties,
  SegmentScreenEventDef,
  SegmentTrackEventDef,
  SegmentTrackPropertiesDef,
} from '../types';


jest.mock('../intermediateResilienceQueue');
jest.mock('../../resilienceQueue/PullBatchableQueue');

const chance = generateChance('integration/eventProcessor');

describe('integration/eventProcessor', () => {
  let eventProcessor: EventProcessor;
  let mockApiHost: string;
  let mockProduct: string;
  let mockRetryQueuePrefix: string;

  let mockContext: Context;
  let mockUserId: string;

  let resilienceQueue: IntermediateBatchableQueue;

  beforeEach(() => {
    (getResilienceQueue as jest.Mock).mockImplementation(
      (
        prefix: string,
        product: string,
        options: RetryQueueOptions
      ) => new IntermediateBatchableQueue(prefix, product, options)
    );

    mockApiHost = chance.string();
    mockProduct = chance.string();
    mockRetryQueuePrefix = chance.string();
    eventProcessor = new EventProcessor({
      apiHost: mockApiHost,
      product: mockProduct,
      retryQueuePrefix: mockRetryQueuePrefix,
    });

    mockContext = {
      context: {
        screen: {
          width: chance.integer(),
          height: chance.integer(),
          density: chance.integer(),
        },
        library: {
          name: 'analytics.js',
          version: chance.string(),
        }
      },
    };
    mockUserId = chance.string();

    resilienceQueue = (IntermediateBatchableQueue as jest.Mock).mock.instances[0];

    eventProcessor.getUser().setUserId(mockUserId);
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  describe('create event', () => {
    test('should create track event and send it to queue', () => {
      const eventName = chance.string();
      const mockEventProperties: SegmentTrackPropertiesDef = {
        env: chance.string(),
        product: mockProduct,
        action: chance.string(),
        actionSubject: chance.string(),
        eventType: eventType.OPERATIONAL,
        origin: 'web',
        platform: 'web',
        source: 'test',
      };

      eventProcessor.track(eventName, mockEventProperties, mockContext);

      expect(resilienceQueue.addItem).toHaveBeenCalledTimes(1);
      const itemAdded: PackagedEvent = (resilienceQueue.addItem as jest.Mock).mock.calls[0][0];

      expect(itemAdded.headers).toEqual({
        'Content-Type': 'text/plain',
      });
      expect(itemAdded.url).toEqual(`https://${mockApiHost}/t`);
      expect((itemAdded.msg as SegmentTrackEventDef).properties).toEqual(mockEventProperties);
      expect(itemAdded.msg.context).toEqual({
        ...mockContext.context,
        userAgent: navigator.userAgent,
      });
      expect((itemAdded.msg as SegmentTrackEventDef).event).toEqual(eventName);
      expect(itemAdded.msg.messageId).toMatch(/^ajs-/);
      expect(itemAdded.msg.timestamp).toEqual(new Date().toISOString());
      expect(itemAdded.msg._metadata).toEqual(METADATA);
      expect(itemAdded.msg.userId).toEqual(mockUserId);
      expect(itemAdded.msg.anonymousId).toEqual(eventProcessor.getUser().getAnonymousId());
    });

    test('should create screen event and send it to queue', () => {
      const eventName = chance.string();
      const mockEventProperties: SegmentProperties = {
        env: chance.string(),
        product: mockProduct,
        origin: 'web',
        platform: 'web',
      };

      eventProcessor.page(eventName, mockEventProperties, mockContext);

      expect(resilienceQueue.addItem).toHaveBeenCalledTimes(1);
      const itemAdded: PackagedEvent = (resilienceQueue.addItem as jest.Mock).mock.calls[0][0];

      expect(itemAdded.headers).toEqual({
        'Content-Type': 'text/plain',
      });
      expect(itemAdded.url).toEqual(`https://${mockApiHost}/p`);
      expect((itemAdded.msg as SegmentScreenEventDef).properties).toEqual({
        name: eventName,
        ...mockEventProperties
      });
      expect((itemAdded.msg as SegmentScreenEventDef).name).toEqual(eventName);
      expect(itemAdded.msg.context).toEqual({
        ...mockContext.context,
        userAgent: navigator.userAgent,
      });
      expect(itemAdded.msg.messageId).toMatch(/^ajs-/);
      expect(itemAdded.msg.timestamp).toEqual(new Date().toISOString());
      expect(itemAdded.msg._metadata).toEqual(METADATA);
      expect(itemAdded.msg.userId).toEqual(mockUserId);
      expect(itemAdded.msg.anonymousId).toEqual(eventProcessor.getUser().getAnonymousId());
    });

    test('should create identify event and send it to queue', () => {
      const identifyUserId = chance.string();
      const mockEventProperties: SegmentIdentifyEventTraitsDef = {
        userIdType: chance.string(),
        entityId: chance.string(),
        entityType: chance.string(),
      };

      eventProcessor.identify(identifyUserId, mockEventProperties, mockContext);

      expect(resilienceQueue.addItem).toHaveBeenCalledTimes(1);
      const itemAdded: PackagedEvent = (resilienceQueue.addItem as jest.Mock).mock.calls[0][0];

      expect(itemAdded.headers).toEqual({
        'Content-Type': 'text/plain',
      });
      expect(itemAdded.url).toEqual(`https://${mockApiHost}/i`);
      expect((itemAdded.msg as SegmentIdentifyEventDef).traits).toEqual(mockEventProperties);
      expect(itemAdded.msg.context).toEqual({
        ...mockContext.context,
        userAgent: navigator.userAgent,
      });
      expect(itemAdded.msg.messageId).toMatch(/^ajs-/);
      expect(itemAdded.msg.timestamp).toEqual(new Date().toISOString());
      expect(itemAdded.msg._metadata).toEqual(METADATA);
      expect(itemAdded.msg.userId).toEqual(mockUserId);
      expect(itemAdded.msg.anonymousId).toEqual(eventProcessor.getUser().getAnonymousId());
    });

    test('should trigger callback upon creating track event', () => {
      const eventName = chance.string();
      const mockEventProperties: SegmentTrackPropertiesDef = {
        env: chance.string(),
        product: mockProduct,
        action: chance.string(),
        actionSubject: chance.string(),
        eventType: eventType.OPERATIONAL,
        origin: 'web',
        platform: 'web',
        source: 'test',
      };
      const callback = jest.fn();

      eventProcessor.track(eventName, mockEventProperties, mockContext, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should trigger callback upon creating screen event', () => {
      const eventName = chance.string();
      const mockEventProperties: SegmentProperties = {
        env: chance.string(),
        product: mockProduct,
        origin: 'web',
        platform: 'web',
      };
      const callback = jest.fn();

      eventProcessor.page(eventName, mockEventProperties, mockContext, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    test('should trigger callback upon creating identify event', () => {
      const identifyUserId = chance.string();
      const mockEventProperties: SegmentIdentifyEventTraitsDef = {
        userIdType: chance.string(),
        entityId: chance.string(),
        entityType: chance.string(),
      };
      const callback = jest.fn();

      eventProcessor.identify(identifyUserId, mockEventProperties, mockContext, callback);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
