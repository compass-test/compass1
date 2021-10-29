import { renderHook } from '@testing-library/react-hooks';

import { markSeenNotificationsFetch } from '../utils/mark-seen-client';

import { useMarkSeenService } from './index';

jest.mock('../utils/mark-seen-client');

const markSeenNotificationsFetchMock = (markSeenNotificationsFetch as jest.Mock).mockReturnValue(
  Promise.resolve(),
);

describe('Use fetch service test', () => {
  test('Should call mark as seen only once', async () => {
    const { rerender } = renderHook((props) => useMarkSeenService(props), {
      initialProps: { firstRequestCompleted: false },
    });

    expect(markSeenNotificationsFetchMock).toBeCalledTimes(0);

    rerender({ firstRequestCompleted: true });
    expect(markSeenNotificationsFetchMock).toBeCalledTimes(1);

    rerender({ firstRequestCompleted: false });
    rerender({ firstRequestCompleted: true });
    expect(markSeenNotificationsFetchMock).toBeCalledTimes(1);
  });
});
