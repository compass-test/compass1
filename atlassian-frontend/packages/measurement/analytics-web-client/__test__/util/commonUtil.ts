// eslint-disable-next-line import/prefer-default-export
export function waitForEventsToSend() {
  // Length of time that the batch job waits.
  // Must be longer if there has been a failed request.
  jest.runTimersToTime(500);
}

// Only to be used in describes that clean up after themselves
export function moveToUrl(url: string) {
  delete window.location;
  // @ts-ignore
  window.location = Object.assign(new URL(url), {
    ancestorOrigins: "",
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn()
  });
}
