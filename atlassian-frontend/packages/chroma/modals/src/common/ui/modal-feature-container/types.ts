import { FormattedMessage } from 'react-intl';

export interface ModalFeatureComponentProps {
  featureHeading: FormattedMessage.Props;
  featureContent: FormattedMessage.Props;
  infoTooltip?: FormattedMessage.Props;
  featureImage: string;
  isFullWidth: boolean;
}

export interface ModalListItemComponentProps {
  featureContent: FormattedMessage.Props;
  infoTooltip?: FormattedMessage.Props;
  featureImage: string;
  isFullWidth: boolean;
}
