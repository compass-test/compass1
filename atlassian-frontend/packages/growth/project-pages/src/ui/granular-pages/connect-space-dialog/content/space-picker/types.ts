import { InjectedIntlProps } from 'react-intl';
import { SpacesData } from '../../../../../state/confluence/spaces/types';

export type Props = {
  onSelected: (value: SpacesData) => void;
  isConnectingSpace: boolean;
  isDisconnectedTemplatesClick: boolean;
  cloudId: string;
} & InjectedIntlProps;
