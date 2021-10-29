import React, { useEffect } from 'react';

import AkEmptyState from '@atlaskit/empty-state';
import { Invoice } from '@atlassian/commerce-billing-history';
import {
  contactSupportAction,
  ErrorMessage,
  TaskH1,
} from '@atlassian/commerce-layout';

import { useOffsessionConfirmationNotAvailableEventDispatch } from '../../../common/utils/analytics';
import { InvoicePaymentDataError } from '../../../common/utils/invoice-payment-data-error';
import { InvoicePaymentDataErrorCodes } from '../../../common/utils/invoice-payment-data-error/constants';

import { SuccessIllustration } from './success-illustration';

type SucessStatusProps = {
  title: string;
  content: string;
};

const SuccessStatusView: React.FC<SucessStatusProps> = ({ title, content }) => (
  <AkEmptyState
    renderImage={() => <SuccessIllustration />}
    header={title}
    description={
      <p style={{ margin: 'auto', textAlign: 'center', minWidth: '360px' }}>
        {content}
      </p>
    }
    size="wide"
  />
);

type InvoiceEdgeStatusProps = {
  invoice: Invoice;
  invoiceDataError: InvoicePaymentDataError | Error;
  onPaymentMethodUpdateRequested: () => void;
};

type InvoiceConfirmationNotAvailableProps = {
  invoice: Invoice;
  onPaymentMethodUpdateRequested: () => void;
};

type CodeToComponentMatcher = {
  [key in InvoicePaymentDataErrorCodes]:
    | React.FC<InvoiceConfirmationNotAvailableProps>
    | React.FC;
};

const InvoicePaid: React.FC<InvoiceConfirmationNotAvailableProps> = ({
  invoice,
}) => {
  return (
    <SuccessStatusView
      title={"You're all paid up!"}
      content={`Your order number is ${invoice.number}`}
    />
  );
};

const InvoiceNotPayable: React.FC<InvoiceConfirmationNotAvailableProps> = ({
  invoice,
}) => {
  return (
    <div>
      <TaskH1>Retry payment for {invoice.number}</TaskH1>
      <ErrorMessage title="We can't charge your current payment method">
        You've exceeded the amount of times you can retry your payment. Contact
        us to pay.
      </ErrorMessage>
    </div>
  );
};

const InvoiceNotConfirmable: React.FC<InvoiceConfirmationNotAvailableProps> = ({
  invoice,
  onPaymentMethodUpdateRequested,
}) => {
  return (
    <div>
      <TaskH1>Retry payment for {invoice.number}</TaskH1>
      <ErrorMessage
        title="We can't charge your current payment method"
        actions={[
          {
            key: 'update-payment-method',
            onClick: onPaymentMethodUpdateRequested,
            text: 'Update payment method',
            testId:
              'commerce-off-sesion-payment-flow.charge-error.update-payment-method',
          },
          contactSupportAction(),
        ]}
      >
        Update your payment method to retry or contact us for help.
      </ErrorMessage>
    </div>
  );
};

const InvoicePaymentMethodAlreadyChanged: React.FC = () => {
  return (
    <SuccessStatusView
      title={"You've already updated your payment method"}
      content="You'll get an email once your payment has been processed - typically within 24 hours."
    />
  );
};

const FallBackError: React.FC = () => {
  return <ErrorMessage title="This invoice payment can't be confirmed" />;
};

const codeToComponentMap: CodeToComponentMatcher = {
  [InvoicePaymentDataErrorCodes.CONFIRMATION_NOT_REQUIRED]: InvoiceNotConfirmable,
  [InvoicePaymentDataErrorCodes.INVOICE_ALREADY_PAID]: InvoicePaid,
  [InvoicePaymentDataErrorCodes.INVOICE_NOT_PAYABLE]: InvoiceNotPayable,
  [InvoicePaymentDataErrorCodes.PAYMENT_METHOD_CHANGED]: InvoicePaymentMethodAlreadyChanged,
  [InvoicePaymentDataErrorCodes.INVALID_PAYMENT_METHOD]: InvoicePaymentMethodAlreadyChanged,
  [InvoicePaymentDataErrorCodes.UNKNOWN_ERROR]: FallBackError,
};

export const InvoiceEdgeStatus: React.FC<InvoiceEdgeStatusProps> = ({
  invoice,
  invoiceDataError,
  onPaymentMethodUpdateRequested,
}) => {
  const dispatchEvent = useOffsessionConfirmationNotAvailableEventDispatch();

  useEffect(() => {
    dispatchEvent({
      nativeError: invoiceDataError,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (invoiceDataError instanceof InvoicePaymentDataError) {
    //this is a known edge case
    const View = codeToComponentMap[invoiceDataError.code];
    return (
      <View
        invoice={invoice}
        onPaymentMethodUpdateRequested={onPaymentMethodUpdateRequested}
      />
    );
  }

  return <FallBackError />;
};
