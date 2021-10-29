import React from 'react';

import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { MockFeatureFlagClientProvider } from '@atlassian/dragonfruit-feature-flags';

import { enableDeterministicResponses } from '../../../../__tests__/__fixtures__/mock-search-results';
import { ConfluencePreQuery } from '../confluence-pre-query';
import { ScreenType } from '../../../../common/analytics';
import { render } from '@testing-library/react';

jest.mock('@atlassian/search-dialog', () => ({
  SearchResultSection: (props: any) => <div {...props} />,
  SearchResult: (props: any) => <div {...props} />,
  SearchResultSectionLink: (props: any) => <div {...props} />,
}));

jest.mock('../../../confluence-features', () => ({
  useFeatures: () => {},
}));

jest.mock('../../../../common/product-search-result', () => ({
  ProductSearchResultForPreQuery: (props: any) => <div {...props} />,
}));

describe('<ConfluencePreQuery />', () => {
  const advancedSearchSelected = jest.fn();
  const searchSessionId = 'testSearchSessionId';

  const baseProps = {
    advancedSearchSelected,
    searchSessionId,
    isLoading: false,
    components: [],
    teams: [],
    screenType: 'preQuerySearchResults' as ScreenType,
  };

  const emptyProps = {
    items: {
      isLoading: false,
      results: {
        items: [],
        totalSize: 0,
        timings: 0,
      },
    },
    spaces: {
      isLoading: false,
      results: {
        items: [],
        timings: 0,
      },
    },
    people: {
      isLoading: false,
      results: {
        items: [],
        timings: 0,
      },
    },
    services: {
      isLoading: false,
      results: [],
    },
    libsAppsMore: {
      isLoading: false,
      results: [],
    },
    peopleTeams: {
      isLoading: false,
      results: [],
    },
  };

  beforeAll(() => {
    enableDeterministicResponses();
  });

  it('does not render results on prequery', () => {
    const { container } = render(
      <MockFeatureFlagClientProvider>
        <ConfluencePreQuery {...baseProps} {...emptyProps} />
      </MockFeatureFlagClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders a recently viewed section', () => {
    const { container } = render(
      <MockFeatureFlagClientProvider>
        <ConfluencePreQuery
          {...baseProps}
          {...emptyProps}
          components={[
            {
              id:
                'ari:cloud:compass:test-cloud-id:component/test-workspace/test-component',
              name: 'Test Service',
              type: CompassComponentType.SERVICE,
            },
            {
              id:
                'ari:cloud:compass:test-cloud-id:component/test-workspace/test-component2',
              name: 'Test Service 2',
              type: CompassComponentType.SERVICE,
            },
          ]}
        />
      </MockFeatureFlagClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("won't render a components section if there are no components", () => {
    const { container } = render(
      <MockFeatureFlagClientProvider>
        <ConfluencePreQuery
          {...baseProps}
          {...emptyProps}
          teams={[
            {
              id: 'ari:cloud:teams::team/team1',
              displayName: 'Lodestone',
              smallAvatarImageUrl: 'https://atlassian.net/test.svg',
            },
          ]}
        />
      </MockFeatureFlagClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("won't render a teams section if there are no teams", () => {
    const { container } = render(
      <MockFeatureFlagClientProvider>
        <ConfluencePreQuery
          {...baseProps}
          {...emptyProps}
          components={[
            {
              id:
                'ari:cloud:compass:test-cloud-id:component/test-workspace/test-component',
              name: 'Test Service',
              type: CompassComponentType.SERVICE,
            },
          ]}
        />
      </MockFeatureFlagClientProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
