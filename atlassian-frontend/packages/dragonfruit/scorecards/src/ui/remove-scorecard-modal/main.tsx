/* TODO: (from codemod)
We have converted this file as best we could but you might still need
to manually complete migrating this usage of ModalDialog.

This file uses one or more of the following ModalDialog props: 'components', 'header',
'footer', 'body'. These props have been removed as part of moving to
a compositional API.

The render props that used to be exposed by the custom component APIs are
now accessible using the 'useModal' hook instead: 'testId', 'titleId', and 'onClose'.

We are also no longer exposing 'appearance' as render prop, so this needs to be
manually passed to your custom components.

If you are using the 'container' value of 'components' to wrap ModalDialog in something
other than a 'form', you'll need to add the style 'all: inherit;' for scrolling to function.

For a complete guide on customization using the new compositional API, refer to the docs at
https://atlassian.design/components/modal-dialog/examples. */
/* TODO: (from codemod)
This file is spreading props on the ModalDialog component, so we could not
automatically convert this usage to the new API.

The following props have been deprecated as part of moving to a compositional API:

- 'heading' prop has been replaced by ModalHeader and ModalTitle components.
- 'actions' prop has been replaced by ModalFooter component, with Button components from @atlaskit/button.
- 'scrollBehavior' prop has been replaced by 'shouldScrollInViewport', where "outside" from the previous prop maps to true in the new prop.
- 'isHeadingMultiline' prop has been replaced by 'isMultiline' prop on the ModalTitle component.
- 'appearance' prop has been moved to the ModalTitle component. To achieve the feature parity, pass the 'appearance' prop directly to ModalTitle and Button components inside ModalFooter.

Refer to the docs for the new API at https://atlassian.design/components/modal-dialog/examples
to complete the migration and use the new composable components. */
import React, { useCallback } from 'react';

import Button, { ButtonProps } from '@atlaskit/button/standard-button';
import ModalDialog, {
  ModalHeaderProps as HeaderComponentProps,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@atlaskit/modal-dialog';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  checkCompassMutationSuccess,
  CompassMutationError,
  RemoveScorecardFromComponentHandledErrors,
  useRemoveScorecardFromComponent,
} from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useRemoveScorecardFlags } from './flags';
import messages from './messages';
import { RemoveScorecardModalProps } from './types';

type ButtonWithTextProps = { text: string } & ButtonProps;

function RemoveScorecardModal({
  testId = 'remove-scorecard-modal',
  onCancel,
  onClose,
  componentId,
  scorecardId,
  scorecardName,
  ...modalProps
}: RemoveScorecardModalProps) {
  const { formatMessage } = useIntl();
  const [removeScorecardMutation] = useRemoveScorecardFromComponent();
  const {
    showRemoveScorecardSuccessFlag,
    showRemoveScorecardGenericErrorFlag,
  } = useRemoveScorecardFlags();

  const Header = (props: HeaderComponentProps) => {
    return (
      <ModalHeader {...props}>
        <ModalTitle appearance={'danger'}>
          {formatMessage(messages.removeScorecardModalTitle)}
        </ModalTitle>
      </ModalHeader>
    );
  };

  const handleMutationError = useCallback(
    ({
      errorType,
      scorecardName,
    }: {
      errorType: string | null;
      scorecardName: string;
    }) => {
      switch (errorType) {
        // If scorecard or component doesn't exist, or the relationship
        // Between scoreard and component is already removed, we treat
        // It as a success
        case RemoveScorecardFromComponentHandledErrors.SCORECARD_NOT_APPLIED_TO_COMPONENT:
          showRemoveScorecardSuccessFlag(scorecardName);
          onClose();
          break;
        // Treat other errors as failure
        default:
          showRemoveScorecardGenericErrorFlag();
          onClose();
          break;
      }
    },
    [
      onClose,
      showRemoveScorecardGenericErrorFlag,
      showRemoveScorecardSuccessFlag,
    ],
  );

  const handleSubmit = (
    scorecardId: string,
    componentId: string,
    scorecardName: string,
  ) => {
    return removeScorecardMutation(scorecardId, componentId)
      .then((mutationResult) => {
        checkCompassMutationSuccess(
          mutationResult?.data?.compass?.removeScorecardFromComponent,
        );
        showRemoveScorecardSuccessFlag(scorecardName);
        onClose();
      })
      .catch((error) => {
        if (error instanceof CompassMutationError) {
          const errorType = error.getFirstErrorType();
          handleMutationError({ errorType, scorecardName });
        } else {
          showRemoveScorecardGenericErrorFlag();
          onClose();
          throw error;
        }
      });
  };

  return (
    <ModalDialog testId={testId} autoFocus={false} {...modalProps}>
      <Header />
      <ModalBody>
        {formatMessage(messages.removeScorecardModalDescription)}
      </ModalBody>
      <ModalFooter>
        {[
          {
            text: formatMessage(CommonMessages.cancel),
            appearance: 'subtle',
            onClick: onCancel,
            testId:
              'dragonfruit-scorecards.ui.remove-scorecard-modal.cancel-button',
          } as ButtonWithTextProps,
          {
            text: formatMessage(CommonMessages.remove),
            appearance: 'danger',
            onClick: () =>
              handleSubmit(scorecardId, componentId, scorecardName),
            testId:
              'dragonfruit-scorecards.ui.remove-scorecard-modal.remove-button',
          } as ButtonWithTextProps,
        ].map((props, index) => (
          <Button {...props}>{props.text}</Button>
        ))}
      </ModalFooter>
    </ModalDialog>
  );
}

export default RemoveScorecardModal;
