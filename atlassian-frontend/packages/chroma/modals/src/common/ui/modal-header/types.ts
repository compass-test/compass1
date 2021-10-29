import { FormattedMessage } from 'react-intl';

export interface ModalHeaderProps {
  imageSrc: string | JSX.Element;
  heading?: FormattedMessage.MessageDescriptor;
  subheading?: FormattedMessage.MessageDescriptor;
  onClose: () => void;
  hideCloseButton?: boolean;
  analyticsAttributes: {
    sourceScreen: string;
    chromaExperiment: string;
    [key: string]: string;
  };
}
