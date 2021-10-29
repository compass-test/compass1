import { InjectedIntlProps } from 'react-intl';

export interface StateProps {
  hasErrors: boolean;
  showSuccessFlag: boolean;
  connectedSpaceOrPageName: string | null | undefined;
  isConnectedToPage: boolean | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
}

export interface DispatchProps {
  onErrorDismiss: () => void;
  onSuccessDismiss: () => void;
}

export interface OwnProps {
  onReload?: Function;
}

export type Props = StateProps & DispatchProps & OwnProps & InjectedIntlProps;
