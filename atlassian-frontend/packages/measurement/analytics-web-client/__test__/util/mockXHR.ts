export function createMockXHR(responseJSON: any) {
  const mockXHR: any = {
    open: jest.fn(),
    send: jest.fn(),
    setRequestHeader: jest.fn(),
    readyState: 4,
    responseText: JSON.stringify(responseJSON || {}),
  };
  mockXHR.send.mockImplementation(() => {
    if (typeof mockXHR.onreadystatechange === 'function') {
      mockXHR.onreadystatechange();
    }
  });
  return mockXHR;
}

export function createDefaultMockXHR() {
  return createMockXHR({
    success: true,
  });
}

export function setMockXHRToTimeout() {
  // nothing to do
}

export function getEventsFromMockXHRForIndex(
  callIndex: any,
  mockXHR: any,
  expectedNumberOfEvents: any,
) {
  const request = JSON.parse(mockXHR.send.mock.calls[callIndex][0]);
  const events = Array.isArray(request.batch) ? request.batch : [request];

  if (expectedNumberOfEvents !== undefined) {
    expect(events.length).toBe(expectedNumberOfEvents);
  }
  return events;
}

export function getEventsFromMockXHR(
  mockXHR: any,
  expectedNumberOfEvents: any,
) {
  return getEventsFromMockXHRForIndex(0, mockXHR, expectedNumberOfEvents);
}
