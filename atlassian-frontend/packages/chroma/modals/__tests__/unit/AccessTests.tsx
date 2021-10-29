import React, { ReactElement } from 'react';

import { mount, ReactWrapper } from 'enzyme';

import { Editions, ProductKeys } from '../../src/common/constants';
import { useOperationalEvent } from '../../src/common/utils/analytics-utils';
import { useGrantGroupAccessByProduct } from '../../src/services/access';
import { grantGroupAccessByProduct } from '../../src/services/access-api-provider';

jest.mock('../../src/common/utils/analytics-utils');
jest.mock('../../src/services/access-api-provider');
jest.useFakeTimers();

const testHook = (invokeHook: () => ReactElement | null): ReactWrapper => {
  // construct a dummy component that does nothing but invoke a callback
  const DummyComponent = ({
    callback,
  }: {
    callback: () => ReactElement | null;
  }) => callback();
  // mount and return the wrapper for the dummy component, invoking the provided function within the context of the component (so hooks can be used)
  return mount(<DummyComponent callback={invokeHook} />);
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('access hook test suites', () => {
  it('should return an error and fire analytics event if useGrantGroupAccessByProduct call fails', () => {
    (grantGroupAccessByProduct as any).mockImplementation(() => {
      throw new Error('kaboom');
    });
    const mockFire = jest.fn();
    const mockSub = {
      product: ProductKeys.CONFLUENCE,
      edition: Editions.FREE,
      upgradeRequired: true,
      upgradeEdition: Editions.STANDARD,
      upgradeCompleted: false,
    };
    (useOperationalEvent as any).mockReturnValue(mockFire);
    testHook(() => {
      const { error } = useGrantGroupAccessByProduct(
        'foo-cloud',
        ['test-group-id'],
        [mockSub],
      );
      return <div>{error}</div>;
    });
    expect(setTimeout).toHaveBeenCalledTimes(2);
  });
});
