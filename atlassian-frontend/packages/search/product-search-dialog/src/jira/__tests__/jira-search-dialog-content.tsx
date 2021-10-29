import React from 'react';

import { shallow } from 'enzyme';

import SearchDialogContent from '../jira-search-dialog-content';
import { AnalyticsContextAction } from '../../common/analytics';

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => null,
}));

describe('<SearchDialogContent />', () => {
  const props = {
    isAnyResultsLoading: false,
    isExpanded: true,
    jiraFeatures: { hasSoftwareAccess: false },
    setNoResultsForPreQuery: (isLoading: boolean) => isLoading,
    setAdditionalAnalyticsContext: (action: AnalyticsContextAction) => action,
    query: 'query',
    onRetry: () => undefined,
    onRequestComplete: (timings: number) => timings,
    onNavigate: () => {},
    queryVersion: 0,
    debounceTime: 0,
  };

  const getWrapper = (passedProps = props) =>
    shallow(<SearchDialogContent {...passedProps} />);

  it('should match the snapshot', () => {
    expect(getWrapper()).toMatchSnapshot();
  });
});
