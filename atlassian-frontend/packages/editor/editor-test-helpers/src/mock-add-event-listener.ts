type CbFn = <E>(event: E) => void;
type EventMap = { [key: string]: CbFn[] };

/**
 * Mocks `document.addEventListener` and returns a `trigger` that
 * can be used to manually dispatch a custom event object, and a jest `spy`
 * linked to the spied `document.addEventListener`. Useful for event bound operations, for events that enzyme cannot simulate
 * (because they were manually subscribed to via the DOM).
 *
 * Note: The spy should be used for cleanup after tests.
 *
 * E.g.
 *
 * ```
 * it('should perform some event bound operation', () => {
 *  const { spy, trigger } = mockAddEventListener();
 *  const customEscapeEvent = { code: 'Escape' };
 *  trigger('keydown', customEvent);
 *  expect(anotherSpy).toHaveBeenCalled();
 *  // ...
 *  spy.mockRestore();
 * });
 * ```
 *
 */
export const mockAddEventListener = () => {
  let map: EventMap = {};
  const spy = jest
    .spyOn(document, 'addEventListener')
    .mockImplementation((type: string, cb) => {
      const evts = map[type];
      evts ? evts.push(<CbFn>cb) : (map[type] = [<CbFn>cb]);
    });

  const trigger = <E>(eventType: string, customEvent: E) => {
    if (Array.isArray(map[eventType])) {
      map[eventType].forEach((cb) => cb(customEvent));
    }
  };
  return { trigger, spy };
};

export default mockAddEventListener;
