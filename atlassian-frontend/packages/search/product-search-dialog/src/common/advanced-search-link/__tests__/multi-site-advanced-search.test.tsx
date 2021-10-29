import React from 'react';
import MultiSiteAdvancedSearchLink, {
  Props,
} from '../multi-site-advanced-search-link';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { Products } from '../../../common/product-context';
import { generateMockSites } from '../../../utils/site-util';

const mockFireEvent = jest.fn();

const MOCK_SITES = generateMockSites(1, Products.confluence);

jest.mock('../../analytics', () =>
  Object.assign({}, jest.requireActual('../../analytics'), {
    useAnalytics: () => ({
      fireAnalyticsEvent: mockFireEvent,
    }),
  }),
);

describe('<MultiSiteAdvancedSearch />', () => {
  const defaultProps: Props = {
    sites: MOCK_SITES.map((s) => ({
      ...s,
      advancedSearchUrl: 'some-advanced-search-url',
    })),
    isLoading: false,
  };

  it('renders an advanced search button for each site', () => {
    const wrapper = mountWithIntl(
      <MultiSiteAdvancedSearchLink
        {...defaultProps}
        linkComponent={(props) => <div {...props} onClick={jest.fn()} />}
      />,
    );

    wrapper.find('button').forEach((button) => {
      const matchedSites = MOCK_SITES.filter(
        ({ siteName }) => siteName === button.text(),
      );
      expect(matchedSites).toHaveLength(1);
    });

    expect.assertions(MOCK_SITES.length);
  });

  it('renders custom link components', () => {
    const wrapper = mountWithIntl(
      <MultiSiteAdvancedSearchLink
        {...defaultProps}
        linkComponent={(props) => (
          <div
            {...props}
            onClick={jest.fn()}
            data-test-id="custom-link-component"
          />
        )}
      />,
    );

    expect(
      wrapper.find('[data-test-id="custom-link-component"]').length,
    ).toBeGreaterThan(0);
  });

  it('calls onclick', () => {
    const mockOnClick = jest.fn();
    const wrapper = mountWithIntl(
      <MultiSiteAdvancedSearchLink
        {...defaultProps}
        onClick={mockOnClick}
        linkComponent={(props) => <div {...props} />}
      />,
    );

    wrapper.find('button').simulate('click');
    expect(true).toEqual(true);

    expect(mockOnClick).toHaveBeenCalledWith(
      'some-advanced-search-url',
      expect.anything(),
    );
  });

  it('uses a link component', () => {
    const mockOnClick = jest.fn();
    const wrapper = mountWithIntl(
      <MultiSiteAdvancedSearchLink
        {...defaultProps}
        linkComponent={(props) => <div {...props} onClick={mockOnClick} />}
      />,
    );

    wrapper.find('button').simulate('click');
    expect(true).toEqual(true);

    expect(mockOnClick).toHaveBeenCalled();
  });

  it('fires analytics when clicked', () => {
    const wrapper = mountWithIntl(
      <MultiSiteAdvancedSearchLink
        {...defaultProps}
        linkComponent={(props) => <div {...props} />}
      />,
    );

    wrapper.find('button').simulate('click');

    expect(mockFireEvent).toHaveBeenCalledWith({
      action: 'selected',
      actionSubject: 'advancedSearchLink',
      actionSubjectId: 'confluenceAdvancedSearchLink',
      attributes: {
        destinationId: MOCK_SITES[0].cloudId,
        index: 0,
        isLoading: false,
        newTab: false,
        trigger: 'click',
      },
      eventType: 'ui',
      source: 'searchDialog',
    });
  });
});
