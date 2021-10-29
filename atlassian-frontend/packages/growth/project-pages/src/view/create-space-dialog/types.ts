import { ComponentType } from 'react';
import AkModalDialog from '@atlaskit/modal-dialog';

import { OwnProps as HeaderProps } from './header/types';
import { OwnProps as ContentProps } from './content/types';
import { OwnProps as FooterProps } from './footer/types';

export interface OwnProps {
  ModalDialog?: ComponentType<typeof AkModalDialog> | null;
  onCancel: () => void;
  onOpenComplete?: Function;
}

export interface StateProps {
  Header: ComponentType<HeaderProps>;
  Content: ComponentType<ContentProps>;
  Footer: ComponentType<FooterProps>;
  isOpen: boolean;
}

export interface AnalyticsProps {
  onDismiss: Function;
}

export type Props = OwnProps & StateProps & AnalyticsProps;
