import { createAPIv0 } from './v0';
import { Journeys } from '../types';

describe('The v0 API', () => {
  it('should be a function which returns an api object with property open method', () => {
    const api = createAPIv0(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });
    expect(api).toMatchObject({ open: expect.any(Function) });
  });
  describe('open method', () => {
    it('should resolve the handler callback with the options passed to it', () => {
      const onOpenMock = jest.fn();
      const options = {
        targetProduct: 'confluence',
        sourceComponent: 'exampleTouchpoint',
        sourceContext: 'projectPages',
        journey: Journeys.DISCOVER,
      };
      const api = createAPIv0(onOpenMock);
      api.open(options);
      expect(onOpenMock).toHaveBeenCalledWith(options);
    });
  });
});
