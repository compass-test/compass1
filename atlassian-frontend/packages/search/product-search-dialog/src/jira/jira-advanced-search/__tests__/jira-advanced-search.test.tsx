import React, { ComponentProps } from 'react';
import { Products } from '../../../common/product-context';
import { MultiSiteAdvancedSearchLink } from '../../../common/advanced-search-link';
import { Site } from '../../../common/clients';
import { generateMockSites } from '../../../utils/site-util';
import { mountWithIntl } from '../../../__tests__/__fixtures__/intl-test-helpers';
import { DefaultFeatures } from '../../features';
import { useFilterContext } from '../../filter-context';
import { JiraAdvancedSearchBase } from '../jira-advanced-search';

const JIRA_CONFLUENCE_SITES = [
  ...generateMockSites(5, Products.jira),
  ...generateMockSites(5, Products.confluence),
];

let mockSites: Site[] = [];
let mockIsMultiSite = false;

jest.mock('../../clients', () => ({
  useJiraSearchClientContext: () => ({
    siteUrl: '',
    sites: mockSites,
  }),
}));

jest.mock('../../features', () =>
  Object.assign({}, jest.requireActual('../../features'), {
    useFeatures: () => ({
      isMultiSite: mockIsMultiSite,
    }),
  }),
);

jest.mock('../../filter-context', () => ({
  useFilterContext: jest.fn(),
}));

describe('<JiraAdvancedSearch />', () => {
  const onClick = jest.fn();
  const advancedSearchSelected = jest.fn();
  const features = DefaultFeatures;
  const commonProps: ComponentProps<typeof JiraAdvancedSearchBase> = {
    query: '',
    onClick,
    advancedSearchSelected,
    features,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterContext as jest.Mock).mockReturnValue({
      projectFilters: {
        availableFilters: [],
      },
      assigneeFilters: {
        availableFilters: [],
      },
      binaryStatusCategoryFilters: {
        availableFilters: [],
      },
    });
    mockSites = JIRA_CONFLUENCE_SITES;
    mockIsMultiSite = false;
  });

  it('renders the single site component when in single site mode', () => {
    const wrapper = mountWithIntl(
      <JiraAdvancedSearchBase
        {...commonProps}
        features={{ ...commonProps.features, hasSoftwareAccess: true }}
      />,
    );

    expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeFalsy();
  });

  describe('MultiSiteLinkComponent', () => {
    it('should render the multi site link component', () => {
      mockIsMultiSite = true;
      const wrapper = mountWithIntl(
        <JiraAdvancedSearchBase {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeTruthy();
    });

    it('should not render the multi site link when the feature is off', () => {
      mockIsMultiSite = false;
      const wrapper = mountWithIntl(
        <JiraAdvancedSearchBase {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeFalsy();
    });

    it('should not render the multi site link if there is only one site', () => {
      mockIsMultiSite = true;
      mockSites = generateMockSites(1, Products.jira);
      const wrapper = mountWithIntl(
        <JiraAdvancedSearchBase {...commonProps} />,
      );

      expect(wrapper.find(MultiSiteAdvancedSearchLink).exists()).toBeFalsy();
    });

    it('passes the right sites', () => {
      mockIsMultiSite = true;
      const wrapper = mountWithIntl(
        <JiraAdvancedSearchBase {...commonProps} />,
      );

      expect(
        wrapper.find(MultiSiteAdvancedSearchLink).prop('sites').length,
      ).toEqual(5);
    });
  });
});
