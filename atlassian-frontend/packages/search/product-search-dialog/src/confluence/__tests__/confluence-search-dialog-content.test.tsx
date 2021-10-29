import React from 'react';
import { shallow } from 'enzyme';
import ConfluenceSearchDialogContent from '../confluence-search-dialog-content';
import { AnalyticsContextAction } from '../../common/analytics';

jest.mock('@atlaskit/width-detector', () => ({
  WidthObserver: () => null,
}));

describe('<ConfluenceSearchDialogContent />', () => {
  const props = {
    isAnyResultsLoading: false,
    isExpanded: true,
    features: {},
    query: 'query',
    onRetry: () => undefined,
    setAdditionalAnalyticsContext: (action: AnalyticsContextAction) => action,
    onRequestComplete: (timings: number) => timings,
    debounceTime: 0,
    queryVersion: 0,
  };

  const getWrapper = (passedProps = props) =>
    shallow(<ConfluenceSearchDialogContent {...passedProps} />);

  it('should match the snapshot', () => {
    expect(getWrapper()).toMatchSnapshot();
  });
});
