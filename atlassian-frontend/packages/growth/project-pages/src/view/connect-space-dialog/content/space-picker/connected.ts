import { connect } from 'react-redux';

import { getAvailableSpaces } from '../../../../state/confluence/spaces/selectors';
import { State } from '../../../../state/types';
import {
  isConnectingSpace,
  isDisconnectedTemplatesClick,
} from '../../../../state/ui/connect-space/selectors';

import { AnalyticsProps, StateProps } from './types';

import SpacePicker from './index';

const mapStateToProps = (state: State) => ({
  spaces: getAvailableSpaces(state),
  isConnectingSpace: isConnectingSpace(state),
  isDisconnectedTemplatesClick: isDisconnectedTemplatesClick(state),
});

// Replacing OwnProps with 'AnalyticsProps' to expose signature enriched with AnalyticsEvent by the ComponentWithAnalytics HOC
// The 'how' is not obvious looking at the doc: https://atlaskit.atlassian.com/packages/analytics/analytics-next/docs/usage-with-presentational-components#with-analytics-events
export default connect<StateProps, {}, AnalyticsProps, State>(mapStateToProps)(
  SpacePicker,
);
