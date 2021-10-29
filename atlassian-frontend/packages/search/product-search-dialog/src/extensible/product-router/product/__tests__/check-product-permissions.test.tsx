import { mount } from 'enzyme';
import React from 'react';
import { ProductContextProps } from '../../product-router';
import {
  CheckProductPermissions,
  CheckProductPermissionsProps,
} from '../check-product-permissions';
import { PRODUCT_CONTEXT_PROPS } from '../../__mocks__/products';

let mockedReturn: string[] = ['product.issue'];

let mockBatchedGetExtensibleProductPermission = jest.fn(() =>
  Promise.resolve(mockedReturn),
);

let mockSearchClient: any = {
  batchedGetExtensibleProductPermission: mockBatchedGetExtensibleProductPermission,
};

let mockSetAllowedSections = jest.fn();

jest.mock('react', () =>
  Object.assign({}, jest.requireActual('react'), {
    useEffect: jest.fn().mockImplementation((fn) => fn()),

    useState: jest.fn().mockImplementation((val) => {
      return [val, mockSetAllowedSections];
    }),
  }),
);

jest.mock('../../../aggregator-client-context', () => ({
  useAggregatorClient: jest.fn().mockImplementation(() => mockSearchClient),
}));

describe('CheckProductPermissions', () => {
  let props: CheckProductPermissionsProps & ProductContextProps;
  beforeEach(() => {
    props = {
      ...PRODUCT_CONTEXT_PROPS,
      id: 'product',
      title: 'product',
      sections: [],
      order: 1,
    };
  });

  it('Calls to add a product on mount with only the allowed sections returned by the perms check', async () => {
    mockedReturn = ['product.anyrandomthing'];
    mount(
      <CheckProductPermissions
        {...props}
        sections={[{ id: 'product.issue', title: 'issue' }]}
      >
        <div id="inner-div" />
      </CheckProductPermissions>,
    );

    await Promise.resolve();

    expect(mockSetAllowedSections).toHaveBeenCalledWith([
      'product.anyrandomthing',
    ]);
  });

  it('Calls to add a product on mount with permissionSupplier taking precedence over scopes API check', async () => {
    mockedReturn = ['product.notAllowed'];
    mount(
      <CheckProductPermissions
        {...props}
        sections={[
          {
            id: 'ding',
            title: 'I need no permission check',
          },
        ]}
        permissionSupplier={() => Promise.resolve(['ding'])}
      >
        <div id="inner-div" />
      </CheckProductPermissions>,
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(mockSetAllowedSections).toHaveBeenCalledWith(['ding']);
  });
});
