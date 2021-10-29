import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import {
  AddComponentLabelsHandledErrors,
  CompassMutationError,
  MAX_COMPONENT_LABEL_INPUT_VALUES,
  MAX_COMPONENT_LABEL_NAME_LENGTH,
  MAX_COMPONENT_LABELS_PER_COMPONENT,
  RemoveComponentLabelsHandledErrors,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../../../../../../common/constants';

import messages from './messages';

export const useLabelMutationErrorFlags = () => {
  const { showFlag } = useFlags();
  const { formatMessage } = useIntl();
  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  /** =============================
   *   Error flags for label "ADD"
   ** ============================= */

  const showAddLabelErrorFlag = (
    description: FormattedMessage.MessageDescriptor,
    values?: {
      [key: string]: ReactIntl.MessageValue;
    },
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.addLabelErrorFlagTitle),
      description: formatMessage(description, values),
    });
  };

  const showGenericAddLabelErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.addLabelErrorFlagTitle),
      description: formatMessage(
        CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
      ),
    });
  };

  const handleAddLabelError = (error: CompassMutationError) => {
    const errorType = error.getFirstErrorType();

    switch (errorType) {
      case AddComponentLabelsHandledErrors.COMPONENT_NOT_FOUND:
        return showAddLabelErrorFlag(
          messages.componentNotFoundErrorDescription,
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_LIMIT_REACHED:
        return showAddLabelErrorFlag(
          messages.labelLimitReachedErrorDescription,
          { labelLimit: MAX_COMPONENT_LABELS_PER_COMPONENT },
        );
      default:
        break;
    }

    // We should never be getting any mutation errors (except the ones in the `switch` statement above),
    // as our client-side validation should be handling them and not letting the user submit their new label.
    // Thus, we will send analytics events for any errors not already handled above so we know when our client-side validation is lacking.
    fireCompassMutationErrorAnalytics({
      error,
      componentName: 'ComponentLabelsEditor',
      packageName: ANALYTICS_PACKAGE_NAME,
    });

    switch (errorType) {
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_INPUT_HAS_TOO_MANY_VALUES:
        return showAddLabelErrorFlag(
          messages.labelInputHasTooManyValuesDescription,
          { labelInputLimit: MAX_COMPONENT_LABEL_INPUT_VALUES },
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_INPUT_CANNOT_BE_EMPTY:
        return showAddLabelErrorFlag(
          messages.labelInputCannotBeEmptyErrorDescription,
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_CANNOT_BE_BLANK:
        return showAddLabelErrorFlag(
          messages.labelNameCannotBeBlankErrorDescription,
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_CONTAINS_INVALID_CHARACTER:
        return showAddLabelErrorFlag(
          messages.labelNameContainsInvalidCharacterErrorDescription,
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_TOO_LONG:
        return showAddLabelErrorFlag(
          messages.labelNameTooLongErrorDescription,
          { characterLimit: MAX_COMPONENT_LABEL_NAME_LENGTH },
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_CANNOT_CONTAIN_WHITESPACE_CHARACTERS:
        return showAddLabelErrorFlag(
          messages.labelNameCannotContainWhitespaceCharactersErrorDescription,
        );
      case AddComponentLabelsHandledErrors.COMPONENT_LABEL_NAME_CANNOT_CONTAIN_UPPERCASE_CHARACTERS:
        return showAddLabelErrorFlag(
          messages.labelNameCannotContainUppercaseCharactersErrorDescription,
        );
      default:
        return showGenericAddLabelErrorFlag();
    }
  };

  /** ================================
   *   Error flags for label "REMOVE"
   ** ================================ */

  const showRemoveLabelErrorFlag = (
    description: FormattedMessage.MessageDescriptor,
  ) => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.removeLabelErrorFlagTitle),
      description: formatMessage(description),
    });
  };

  const showGenericRemoveLabelErrorFlag = () => {
    showFlag({
      ...BaseErrorFlagProps,
      title: formatMessage(messages.removeLabelErrorFlagTitle),
      description: formatMessage(
        CommonMessages.somethingWentWrongPleaseTryAgainFullStop,
      ),
    });
  };

  const handleRemoveLabelError = (error: CompassMutationError) => {
    const errorType = error.getFirstErrorType();

    switch (errorType) {
      case RemoveComponentLabelsHandledErrors.COMPONENT_NOT_FOUND:
        return showRemoveLabelErrorFlag(
          messages.componentNotFoundErrorDescription,
        );
      default:
        fireCompassMutationErrorAnalytics({
          error,
          componentName: 'ComponentLabelsEditor',
          packageName: ANALYTICS_PACKAGE_NAME,
        });
        return showGenericRemoveLabelErrorFlag();
    }
  };

  return {
    handleAddLabelError,
    showGenericAddLabelErrorFlag,
    handleRemoveLabelError,
    showGenericRemoveLabelErrorFlag,
  };
};
