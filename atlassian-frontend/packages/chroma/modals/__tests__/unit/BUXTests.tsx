import React, { ReactElement } from 'react';

import { mount, ReactWrapper } from 'enzyme';

import {
  Editions,
  MISSING_REQUIRED_FIELDS,
  ProductKeys,
} from '../../src/common/constants';
import { useOperationalEvent } from '../../src/common/utils/analytics-utils';
import { useSelectEdition } from '../../src/services/bux';
import { selectEdition } from '../../src/services/bux-api-provider';
import { Entitlement } from '../../src/services/bux-api-provider/types';

jest.mock('../../src/common/utils/analytics-utils');
jest.mock('../../src/services/bux-api-provider');

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

const mockSub = {
  product: ProductKeys.CONFLUENCE,
  edition: Editions.FREE,
  upgradeRequired: true,
  upgradeEdition: Editions.STANDARD,
  upgradeCompleted: false,
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('useSelectEdition hook', () => {
  it('should not trigger an edition change when mocksub is undefined', () => {
    testHook(() => {
      useSelectEdition('foo-cloud', [], false);
      return null;
    });
    expect(selectEdition).not.toHaveBeenCalled();
  });

  it('should trigger an edition change if subscription becomes defined', () => {
    const DummyComponent = ({ entitlement }: { entitlement?: Entitlement }) => {
      useSelectEdition(
        'foo-cloud',
        [mockSub],
        false,
        'jsw-entitlement-id',
        'conf-entitlement-id',
      );
      return null;
    };
    mount(<DummyComponent />); // undefined
    expect(selectEdition).toHaveBeenCalledTimes(1);
  });

  it('should return an error when no entitlement id is provided', () => {
    const wrapper = testHook(() => {
      const { error } = useSelectEdition('foo-cloud', [mockSub], false);
      return <div>{error}</div>;
    });
    expect(wrapper.text()).toEqual(MISSING_REQUIRED_FIELDS);
  });

  it('should return an error and fire analytics event if BUX call fails', () => {
    (selectEdition as any).mockImplementation(() => {
      throw new Error('kaboom');
    });
    const mockFire = jest.fn();
    (useOperationalEvent as any).mockReturnValue(mockFire);
    const wrapper = testHook(() => {
      const { error } = useSelectEdition(
        'foo-cloud',
        [mockSub],
        false,
        'jsw-entitlement-id',
        'conf-entitlement-id',
      );
      return <div>{error}</div>;
    });
    expect(wrapper.text()).toEqual('kaboom');
    expect(mockFire).toHaveBeenCalledWith({ errorMessage: 'kaboom' });
  });
});
