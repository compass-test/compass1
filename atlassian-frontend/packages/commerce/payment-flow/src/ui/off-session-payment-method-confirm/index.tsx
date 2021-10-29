import React, { useCallback, useState } from 'react';

import Spinner from '@atlaskit/spinner';
import {
  Invoice,
  InvoiceId,
  useInvoiceService,
} from '@atlassian/commerce-billing-history';
import { CCPCreditCardFormState } from '@atlassian/commerce-credit-card-ccp';
import {
  ErrorMessage,
  NarrowLayout,
  RevealContainer,
} from '@atlassian/commerce-layout';
import { TransactionAccountId } from '@atlassian/commerce-types';

import {
  OffsessionConfirmationBreadcrumb,
  OffsessionConfirmationNotAvailableBreadcrumb,
} from '../../common/ui/breadcrumbs';
import { useDetailedInvoicePaymentData } from '../../service/invoice-payment';

import { InvoiceEdgeStatus } from './invoice-edge-status-view';
import { PaymentConfirmation } from './payment-confirmation';
import { LoaderFrame } from './styled';
import { TelemetryRoot } from './telemetry-root';
import { UpdatePaymentMethod } from './update-payment-method';

export type OffSessionPaymentMethodConfirmProps = {
  txa: TransactionAccountId;
  invoiceId: InvoiceId;
  onSuccess: () => void;
};

type PaymentConfirmationUIProps = {
  txa: TransactionAccountId;
  onSuccess: () => void;
  invoice: Invoice;
  detailedPaymentDataServiceResponse: ReturnType<
    typeof useDetailedInvoicePaymentData
  >;
  onPaymentMethodUpdateRequested: () => void;
};

const FallBackError: React.FC = () => {
  return <ErrorMessage title="This invoice payment can't be confirmed" />;
};

const PaymentConfirmationUI: React.FC<PaymentConfirmationUIProps> = ({
  txa,
  onSuccess,
  invoice,
  detailedPaymentDataServiceResponse,
  onPaymentMethodUpdateRequested,
}) => {
  const {
    data: paymentData,
    error: paymentDataError,
  } = detailedPaymentDataServiceResponse;

  const confirmationProcedureReady =
    paymentData && paymentDataError === undefined;

  return confirmationProcedureReady ? (
    <OffsessionConfirmationBreadcrumb>
      <CCPCreditCardFormState accountId={txa}>
        <PaymentConfirmation
          {...paymentData!}
          invoice={invoice}
          onSuccess={onSuccess}
          onPaymentConfirmationFailure={onPaymentMethodUpdateRequested}
        />
      </CCPCreditCardFormState>
    </OffsessionConfirmationBreadcrumb>
  ) : (
    <OffsessionConfirmationNotAvailableBreadcrumb error={paymentDataError!}>
      <InvoiceEdgeStatus
        invoice={invoice}
        invoiceDataError={paymentDataError!}
        onPaymentMethodUpdateRequested={onPaymentMethodUpdateRequested}
      />
    </OffsessionConfirmationNotAvailableBreadcrumb>
  );
};

export const OffSessionPaymentMethodConfirm: React.FC<OffSessionPaymentMethodConfirmProps> = ({
  invoiceId,
  txa,
  onSuccess,
}) => {
  const [flowState, setFlowState] = useState<
    'confirmation' | 'update-payment-method'
  >('confirmation');
  const invoiceServiceResponse = useInvoiceService(txa, invoiceId);
  const detailedPaymentDataServiceResponse = useDetailedInvoicePaymentData(
    txa,
    invoiceId,
  );
  const { data: invoice, error: invoiceError } = invoiceServiceResponse;
  const loading =
    invoiceServiceResponse.loading ||
    detailedPaymentDataServiceResponse.loading;

  const showUpdatePaymentMethod = useCallback(() => {
    setFlowState('update-payment-method');
  }, [setFlowState]);

  let componentOutput;
  if (!invoice && invoiceError) {
    // if invoice endpoint fails for whatever reason we go to fallback immediately
    componentOutput = <FallBackError />;
  } else {
    componentOutput =
      flowState === 'confirmation' ? (
        <PaymentConfirmationUI
          txa={txa}
          invoice={invoice!}
          detailedPaymentDataServiceResponse={
            detailedPaymentDataServiceResponse
          }
          onPaymentMethodUpdateRequested={showUpdatePaymentMethod}
          onSuccess={onSuccess}
        />
      ) : (
        <CCPCreditCardFormState accountId={txa}>
          <UpdatePaymentMethod
            txa={txa}
            ig={invoice!.invoiceGroup}
            onSuccess={onSuccess}
          />
        </CCPCreditCardFormState>
      );
  }

  return (
    <TelemetryRoot>
      <NarrowLayout>
        <RevealContainer
          condition={!loading}
          fallback={
            <LoaderFrame>
              <Spinner size="large" />
            </LoaderFrame>
          }
        >
          {componentOutput}
        </RevealContainer>
      </NarrowLayout>
    </TelemetryRoot>
  );
};
