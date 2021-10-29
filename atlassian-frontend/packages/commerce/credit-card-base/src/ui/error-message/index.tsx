import React, { useEffect, useRef } from 'react';

import SectionMessage from '@atlaskit/section-message';
import {
  FailureResult,
  isError,
  isException,
} from '@atlassian/commerce-resultful';

import { CC_ERROR_MESSAGE } from '../../common/constants/breadcrumb-names';
import {
  CreditCardError,
  getUserFriendlyFailureMessage,
} from '../../common/utils/errors';
import { BindingLevels } from '../../common/utils/errors/error-ui-associations';
import { Breadcrumb } from '../../common/utils/events';
import { I18nHack } from '../../common/utils/i18n-hack';
import { useCreditCardFailure } from '../../controllers/hooks/use-credit-card-failure';

export type CreditCardErrorMessageProps = {
  className?: string;
  /**
   * Set to false if you don't want
   * @default true
   */
  autoScroll?: boolean;
};

type BaseCreditCardErrorMessageProps = {
  className?: string;
  failure: FailureResult<CreditCardError, any>;
  autoScroll?: boolean;
};

const BaseCreditCardErrorMessage = ({
  className,
  failure,
  autoScroll = true,
}: BaseCreditCardErrorMessageProps) => {
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (errorRef.current !== null && failure !== undefined && autoScroll) {
      errorRef.current.scrollIntoView();
    }
  }, [errorRef, failure, autoScroll]);

  if (failure === undefined) {
    return null;
  }

  const failureSpecificUserFriendlyMessage = getUserFriendlyFailureMessage(
    failure,
  );

  const userFriendlyMessage: string | React.ReactElement =
    failureSpecificUserFriendlyMessage !== undefined ? (
      failureSpecificUserFriendlyMessage
    ) : (
      <I18nHack
        en={
          <>
            We are not able to use this credit card.
            <br />
            Try again or use another one.
          </>
        }
        ja={
          <>
            クレジットカードの支払いフォームをロードできません
            <br />
            再読み込みして、後ほどもう一度お試しください。または、別の支払い方法をご利用できます。
          </>
        }
      />
    );

  return (
    <div role="alert" className={className} ref={errorRef}>
      <SectionMessage testId={'credit-card.error-message'} appearance="error">
        {userFriendlyMessage}
      </SectionMessage>
    </div>
  );
};

const createErrorMessageHandlerComponent = (
  showFailureCallback: (
    failure: FailureResult<CreditCardError, any>,
  ) => boolean,
) => {
  const Component: React.FC<CreditCardErrorMessageProps> = ({
    className,
    autoScroll,
  }) => {
    const failure = useCreditCardFailure();
    if (failure === undefined) {
      return null;
    }

    const showFailure = showFailureCallback(failure);
    return showFailure ? (
      <Breadcrumb name={CC_ERROR_MESSAGE}>
        <BaseCreditCardErrorMessage
          className={className}
          autoScroll={autoScroll}
          failure={failure}
        />
      </Breadcrumb>
    ) : null;
  };

  return Component;
};

/**
 * This component shows error message shows generic page-level errors - Errors we can't really
 * associate with a particular action or component.
 */
export const CreditCardPageErrorMessage = createErrorMessageHandlerComponent(
  (failure) =>
    isException(failure) ||
    (isError(failure) && failure.error.association.type === BindingLevels.NONE),
);

/**
 * This component shows error messages related to errors in the CC form
 */
export const CreditCardFormErrorMessage = createErrorMessageHandlerComponent(
  (failure) =>
    isError(failure) &&
    failure.error.association.type === BindingLevels.INPUT_GROUP,
);

/**
 * This component shows error messages related to CC detail submissions
 */
export const CreditCardSubmissionErrorMessage = createErrorMessageHandlerComponent(
  (failure) =>
    isError(failure) && failure.error.association.type === BindingLevels.ACTION,
);

/**
 * Use this if you want the CC package to decide when to show errors for you but don't care about the positioning.
 * It combines {@link CreditCardSubmissionErrorMessage}, {@link CreditCardFormErrorMessage} and {@link CreditCardPageErrorMessage}
 */
export const CreditCardErrorMessage: React.FC<CreditCardErrorMessageProps> = ({
  className,
  autoScroll,
}) => {
  // Note that only 1 of these components should be shown at a time
  return (
    <>
      <CreditCardPageErrorMessage
        className={className}
        autoScroll={autoScroll}
      />
      <CreditCardFormErrorMessage
        className={className}
        autoScroll={autoScroll}
      />
      <CreditCardSubmissionErrorMessage
        className={className}
        autoScroll={autoScroll}
      />
    </>
  );
};
