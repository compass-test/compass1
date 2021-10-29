import {
  ConfluenceMonitoringClient,
  MetricEvent,
} from '../ConfluenceMonitoringClient';
import { MonitoringClient } from '../MonitoringClient';

let mockSendBeacon: jest.Mock;
let client: MonitoringClient;

beforeEach(() => {
  (navigator as any).sendBeacon = mockSendBeacon = jest.fn();
  client = new ConfluenceMonitoringClient('test-url');
});

function expectLastSentTelemetryToContainEvents(
  ...events: Array<Partial<MetricEvent>>
) {
  expect(mockSendBeacon).toHaveBeenCalled();

  const calls = mockSendBeacon.mock.calls;
  const lastCallArguments = calls[calls.length - 1];
  expect(JSON.parse(lastCallArguments[1]).data).toEqual(
    expect.arrayContaining(
      events.map((event) => expect.objectContaining(event)),
    ),
  );
}
function expectLastSentTelemetryToContainGlobalTags(...tags: string[]) {
  expect(mockSendBeacon).toHaveBeenCalled();

  const calls = mockSendBeacon.mock.calls;
  const lastCallArguments = calls[calls.length - 1];
  expect(JSON.parse(lastCallArguments[1]).meta.globalTags).toEqual(
    expect.arrayContaining(tags),
  );
}

it('should send accumulated events on transition', () => {
  // Arrange
  client.captureTransition('INITIAL_ROUTE');
  client.incrementCounter('test-counter');
  client.submitPerformanceMetric('test-metric', 100);

  // Act
  client.captureTransition('CHANGED_ROUTE');

  // Assert
  expectLastSentTelemetryToContainEvents(
    { type: 'increment', name: 'test-counter' },
    {
      type: 'timing',
      name: 'test-metric.performance',
    },
  );
});

it('should increment session counter on transitions', () => {
  // Arrange + Act
  client.captureTransition('INITIAL_ROUTE');
  client.captureTransition('CHANGED_ROUTE');

  // Assert
  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'session',
    tags: ['type:initial'],
  });
  expectLastSentTelemetryToContainGlobalTags('page:INITIAL_ROUTE');

  // Act #2
  client.captureTransition('ANOTHER_ROUTE_CHANGE');

  // Assert #2
  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'session',
    tags: ['type:transition'],
  });
  expectLastSentTelemetryToContainGlobalTags('page:CHANGED_ROUTE');
});

it('should not immediately flush accumulated events on first transition (i.e. initial load)', () => {
  // Arrange
  client.incrementCounter('test-counter');
  client.submitPerformanceMetric('test-metric', 100);

  // Act
  client.captureTransition('INITIAL_ROUTE');

  // Assert
  expect(mockSendBeacon).toHaveBeenCalledTimes(0);
});

it('should increment "jsErrors" counter when error occurrence is captured', () => {
  // Arrange
  jest.useFakeTimers();
  client.captureErrorOccurrence(new Error());

  // Act
  jest.advanceTimersByTime(10000);

  // Assert
  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'jsErrors',
  });
});

it('should use error object name as type tag value', () => {
  // Arrange
  class ErrorSubtype extends Error {
    name = 'ErrorSubtype';
  }
  jest.useFakeTimers();
  client.captureErrorOccurrence(new Error());
  client.captureErrorOccurrence(new ErrorSubtype());

  // Act
  jest.advanceTimersByTime(10000);

  // Assert
  expectLastSentTelemetryToContainEvents(
    {
      type: 'increment',
      name: 'jsErrors',
      tags: expect.arrayContaining(['type:Error']),
    },
    {
      type: 'increment',
      name: 'jsErrors',
      tags: expect.arrayContaining(['type:ErrorSubtype']),
    },
  );
});

it('should report unknown type if error is not an error object', () => {
  // Arrange
  jest.useFakeTimers();
  client.captureErrorOccurrence('some string pretending to be error' as any);

  // Act
  jest.advanceTimersByTime(10000);

  // Assert
  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'jsErrors',
    tags: expect.arrayContaining(['type:unknown']),
  });
});

it('should mark error in transition with appropriate "firstInSession" tag value', () => {
  // Arrange
  class ErrorSubtype extends Error {
    name = 'ErrorSubtype';
  }
  jest.useFakeTimers();
  client.captureErrorOccurrence(new Error());
  client.captureErrorOccurrence(new ErrorSubtype());

  // Act
  jest.advanceTimersByTime(10000);

  // Assert
  expectLastSentTelemetryToContainEvents(
    {
      type: 'increment',
      name: 'jsErrors',
      tags: expect.arrayContaining(['type:Error', 'firstInSession:true']),
    },
    {
      type: 'increment',
      name: 'jsErrors',
      tags: expect.arrayContaining([
        'type:ErrorSubtype',
        'firstInSession:false',
      ]),
    },
  );
});

it('should reset "firstInSession" tag value after transition', () => {
  // Arrange
  class ErrorSubtype extends Error {
    name = 'ErrorSubtype';
  }
  jest.useFakeTimers();
  client.captureTransition('INITIAL_ROUTE');
  client.captureErrorOccurrence(new Error());
  jest.advanceTimersByTime(10000);

  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'jsErrors',
    tags: expect.arrayContaining(['type:Error', 'firstInSession:true']),
  });

  // Act
  client.captureTransition('OTHER_ROUTE');
  client.captureErrorOccurrence(new ErrorSubtype());
  jest.advanceTimersByTime(10000);

  // Assert
  expectLastSentTelemetryToContainEvents({
    type: 'increment',
    name: 'jsErrors',
    tags: expect.arrayContaining(['type:ErrorSubtype', 'firstInSession:true']),
  });
});
