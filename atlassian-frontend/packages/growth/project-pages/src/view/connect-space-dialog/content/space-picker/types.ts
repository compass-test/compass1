import { InjectedIntlProps } from 'react-intl';
import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { SpacesData } from '../../../../state/confluence/spaces/types';

export interface OwnProps {
  onSelected: (value: SpacesData) => void;
}

export interface AnalyticsProps {
  onSelected: (value: SpacesData, event: UIAnalyticsEvent) => void;
}

export interface StateProps {
  spaces: SpacesData[];
  isDisconnectedTemplatesClick: boolean;
  isConnectingSpace: boolean;
}

export interface Props extends OwnProps, StateProps, InjectedIntlProps {}
