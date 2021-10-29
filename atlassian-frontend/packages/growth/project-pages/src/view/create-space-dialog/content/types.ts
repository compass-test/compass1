import { InjectedIntlProps } from 'react-intl';

export interface OwnProps {}

export interface StateProps {
  spaceNameInvalid: boolean;
  userEnteredSpaceName: string;
  isCreatingSpace: boolean;
}

export interface DispatchProps {
  onSpaceNameChanged: (value: string) => void;
  onCreate: () => void;
}

export interface Props
  extends InjectedIntlProps,
    OwnProps,
    StateProps,
    DispatchProps {}
