import { ComponentType } from 'react';
import { OwnProps as HeaderProps } from './header/types';
import { OwnProps as ContentProps } from './content/types';
import { OwnProps as FooterProps } from './footer/types';
import AkModalDialog from '@atlaskit/modal-dialog';

export type OwnProps = {
  ModalDialog?: ComponentType<typeof AkModalDialog> | null;
  onCancel?: Function;
  onConnect?: Function;
};

export type StateProps = {
  Header: ComponentType<HeaderProps>;
  Content: ComponentType<ContentProps>;
  Footer: ComponentType<FooterProps>;
  isOpen: boolean;
};

export type AnalyticsProps = {
  onDismiss: Function;
};

export type Props = OwnProps & StateProps & AnalyticsProps;
