import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { SelectedSpaceData } from '../../../state/ui/connect-space/types';

export interface OwnProps {}

export interface DispatchProps {
  onCreateSpace: () => void;
  onSpaceSelected: (value: SelectedSpaceData) => void;
}

export interface AnalyticsProps {
  onSelect: (analyticsEvent: UIAnalyticsEvent) => void;
  onCreate: (analyticsEvent: UIAnalyticsEvent) => void;
}

export interface Props extends OwnProps, DispatchProps, AnalyticsProps {}
