import { Status } from '../../../../common/providers/as-data-provider';
import { FetchError } from '../../errors/fetch-error';
import {
  SwitcherLoadError,
  SwitcherLoadErrorReason,
} from '../../errors/switcher-load-error';

describe('switcher-load-error', () => {
  it('should provide a reason when receiving a ResultError', () => {
    const error = new SwitcherLoadError(
      SwitcherLoadErrorReason.AVAILABLE_PRODUCTS,
      {
        error: new Error(),
        status: Status.ERROR,
        data: null,
      },
    );
    expect(error.reason()).toEqual({
      name: 'Error',
      source: 'availableProducts',
      status: undefined,
    });
  });
  it.each([[401], [403], [500]])(
    'should map from %s statusCode in Fetch Error',
    (statusCode) => {
      const error = new SwitcherLoadError(
        SwitcherLoadErrorReason.AVAILABLE_PRODUCTS,
        new FetchError('Failed to fetch', statusCode),
      );

      expect(error.reason()).toEqual({
        name: 'FetchError',
        source: 'availableProducts',
        status: statusCode,
      });
    },
  );
});
