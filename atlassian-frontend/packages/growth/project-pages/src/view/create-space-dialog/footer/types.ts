import { UIAnalyticsEvent } from '@atlaskit/analytics-next';
import { InjectedIntlProps } from 'react-intl';
import { CreateSpaceDialogError } from '../../../state/ui/create-space/types';

export interface DefaultProps {
  errorState: CreateSpaceDialogError;
}

export interface StateProps {
  isCreatingSpace: boolean;
  isGeneratingKey: boolean;
  suggestedKey: (string | null | undefined) | false;
  userEnteredSpaceName: string;
  userEnteredSpaceNameInvalid: boolean;
  errorState?: CreateSpaceDialogError;
}

export interface DispatchProps {
  onSpaceNameChanged: Function;
  onCreate: () => void;
}

export interface OwnProps {
  onCancel: () => void;
}

export interface AnalyticsProps {
  onRetryClick: (action: string, event: UIAnalyticsEvent) => {};
  onCreateSpaceClick: (event: UIAnalyticsEvent) => void;
  onCancelClick: (event: UIAnalyticsEvent) => void;
}

export interface Props
  extends InjectedIntlProps,
    DefaultProps,
    Required<StateProps>,
    DispatchProps,
    AnalyticsProps,
    OwnProps {}
