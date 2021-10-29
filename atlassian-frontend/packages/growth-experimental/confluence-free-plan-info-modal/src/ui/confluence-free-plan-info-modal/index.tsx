import React, { useCallback } from 'react';

import { UIAnalyticsEvent, useAnalyticsEvents } from '@atlaskit/analytics-next';
import Modal, {
  KeyboardOrMouseEvent,
  ModalTransition,
} from '@atlaskit/modal-dialog';

import { ConfluenceFreePlanInfoModalProps } from '../../types';

import BodyContent from './body';
import { MODAL_WIDTH } from './constants';
import HeaderContent from './header';

export default function ConfluenceFreePlanInfoModal({
  isOpen,
  onClose,
  onPrimaryActionClick,
  onSecondaryActionClick,
}: ConfluenceFreePlanInfoModalProps) {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const onModalClose = useCallback(() => {
    const event = createAnalyticsEvent({
      action: 'clicked',
      actionSubject: 'button',
    });
    event.context.push({ componentName: 'button' });
    onClose(event);
  }, [createAnalyticsEvent, onClose]);

  const handlePrimaryActionClick = useCallback(
    (_: KeyboardOrMouseEvent, event: UIAnalyticsEvent) => {
      onPrimaryActionClick(event);
    },
    [onPrimaryActionClick],
  );

  const handleSecondaryActionClick = useCallback(
    (_: KeyboardOrMouseEvent, event: UIAnalyticsEvent) => {
      onSecondaryActionClick(event);
    },
    [onSecondaryActionClick],
  );

  return (
    <ModalTransition>
      {isOpen && (
        <Modal
          width={MODAL_WIDTH}
          testId="confluence-free-plan-info-modal"
          onClose={onModalClose}
          shouldScrollInViewport
        >
          <HeaderContent onCloseClick={onModalClose} />
          <BodyContent
            onPrimaryActionClick={handlePrimaryActionClick}
            onSecondaryActionClick={handleSecondaryActionClick}
          />
        </Modal>
      )}
    </ModalTransition>
  );
}
