import React from 'react';
import { ConfluenceSearchInput } from '../confluence-search-input';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
jest.mock('../../confluence-utils/confluence-url-utils', () => ({
  usePrimarySiteConfluenceAdvancedSearchUrlFactory: () => (query: string) =>
    `some/advanced/search/url?q=${query}`,
}));

jest.mock('../../../common/product-search-input', () => {
  return { ProductSearchInput: (props: any) => <div {...props} /> };
});

const advancedSearchSelected = jest.fn();
const searchSessionId = 'testSessionId';
const isLoading = false;

const commonProps = {
  searchSessionId,
  advancedSearchSelected,
  isLoading,
  onOpen: () => {},
  debounceTime: 0,
  forwardRef: null,
  onNavigate: jest.fn(),
  value: '',
};

describe('<ConfluenceSearchInput />', () => {
  it('matches snapshot when expanded', () => {
    const wrapper = mountWithIntl(
      <ConfluenceSearchInput {...commonProps} isExpanded />,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot when collapsed', () => {
    const wrapper = mountWithIntl(
      <ConfluenceSearchInput {...commonProps} isExpanded={false} />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
