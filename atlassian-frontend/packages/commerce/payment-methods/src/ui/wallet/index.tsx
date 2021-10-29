import React, { useCallback, useMemo, useState } from 'react';

import Button from '@atlaskit/button';
import { SmallStackLayout, StackLayout } from '@atlassian/commerce-layout';

import {
  CreditCardPaymentMethod,
  isCreditCardPaymentMethod,
  PaymentMethod,
} from '../../common/types';
import { CreditCardPanel } from '../../common/ui/credit-card';

import {
  DefaultPaymentMethodCopy,
  MainWalletContainer,
  PaymentMethodRadio,
  PaymentMethodsList,
  RightAligned,
  WalletPaymentMethodBox,
  WalletPaymentMethodPanel,
} from './styled';

type PaymentMethodWalletProps = {
  paymentMethodsList: PaymentMethod[];
  selectedPaymentMethod?: CreditCardPaymentMethod;
  defaultPaymentMethod?: CreditCardPaymentMethod;
  onPaymentMethodSelected: (
    selectedPaymentMethod: CreditCardPaymentMethod,
  ) => void;
};

type WalletPaymentMethodProps = {
  paymentMethod: CreditCardPaymentMethod;
  onClick?: (paymentMethod: CreditCardPaymentMethod) => void;
  isChecked?: boolean;
  testId?: string;
};

const PAYMENT_METHODS_ON_PREVIEW = 3;

const WalletPaymentMethod: React.FC<WalletPaymentMethodProps> = ({
  paymentMethod,
  onClick,
  isChecked,
  testId,
}) => {
  const memoizedOnClick = useCallback(() => {
    onClick && onClick(paymentMethod);
  }, [onClick, paymentMethod]);

  const stringifyPaymentMethod = (paymentMethod: PaymentMethod) => {
    switch (paymentMethod.type) {
      case 'CARD':
        return `credit card ending in ${
          (paymentMethod as CreditCardPaymentMethod).card.last4
        }`;
      default:
        return paymentMethod.type;
    }
  };

  return (
    <WalletPaymentMethodPanel
      size="MEDIUM"
      onClick={memoizedOnClick}
      data-testid={testId}
    >
      <WalletPaymentMethodBox>
        <PaymentMethodRadio
          isChecked={isChecked}
          ariaLabel={`Select ${stringifyPaymentMethod(paymentMethod)}`}
        />
        <CreditCardPanel {...paymentMethod.card} />
      </WalletPaymentMethodBox>
    </WalletPaymentMethodPanel>
  );
};

export const PaymentMethodsWallet: React.FC<PaymentMethodWalletProps> = ({
  selectedPaymentMethod,
  paymentMethodsList,
  defaultPaymentMethod,
  onPaymentMethodSelected,
}) => {
  const [viewMode, setViewMode] = useState<'preview' | 'full-list'>('preview');
  const showPreviewMode = viewMode === 'preview';
  const filteredPaymentMethodsList = useMemo(
    () =>
      paymentMethodsList
        .filter(
          (paymentMethod) => paymentMethod.id !== defaultPaymentMethod?.id,
        )
        .filter(isCreditCardPaymentMethod),
    [defaultPaymentMethod?.id, paymentMethodsList],
  );

  const previewPaymentMethods = useMemo(
    () =>
      filteredPaymentMethodsList.slice(
        0,
        showPreviewMode ? PAYMENT_METHODS_ON_PREVIEW : undefined,
      ),
    [filteredPaymentMethodsList, showPreviewMode],
  );

  const paymentMethodsNotInPreviewCount =
    filteredPaymentMethodsList.length - PAYMENT_METHODS_ON_PREVIEW;

  const expandList = useCallback(() => {
    setViewMode('full-list');
  }, [setViewMode]);

  return (
    <MainWalletContainer
      expanded={!showPreviewMode}
      data-testid={`commerce-payment-methods.wallet.payment-list.${
        !showPreviewMode ? 'expanded' : 'collapsed'
      }`}
    >
      {Boolean(defaultPaymentMethod) && (
        <SmallStackLayout
          data-testid={`commerce-payment-methods.wallet.${
            defaultPaymentMethod!.id === selectedPaymentMethod?.id
              ? 'selected'
              : 'unselected'
          }`}
        >
          <WalletPaymentMethod
            isChecked={defaultPaymentMethod!.id === selectedPaymentMethod?.id}
            paymentMethod={defaultPaymentMethod!}
            onClick={onPaymentMethodSelected}
          />
          <DefaultPaymentMethodCopy>
            Your current payment method
          </DefaultPaymentMethodCopy>
        </SmallStackLayout>
      )}
      <StackLayout>
        <PaymentMethodsList>
          {(showPreviewMode
            ? previewPaymentMethods
            : filteredPaymentMethodsList
          ).map((paymentMethod) => (
            <li
              key={paymentMethod.id}
              data-testid={`commerce-payment-methods.wallet.${
                paymentMethod!.id === selectedPaymentMethod?.id
                  ? 'selected'
                  : 'unselected'
              }`}
            >
              <WalletPaymentMethod
                testId={`commerce-payment-methods.wallet.payment-method-list-item-${paymentMethod.id}`}
                isChecked={selectedPaymentMethod?.id === paymentMethod.id}
                paymentMethod={paymentMethod}
                onClick={onPaymentMethodSelected}
              />
            </li>
          ))}
        </PaymentMethodsList>
        {paymentMethodsNotInPreviewCount > 0 && showPreviewMode ? (
          <RightAligned>
            <Button
              testId="commerce-payment-methods.wallet.view-more"
              onClick={expandList}
              appearance="link"
            >
              +{paymentMethodsNotInPreviewCount} more
            </Button>
          </RightAligned>
        ) : null}
      </StackLayout>
    </MainWalletContainer>
  );
};
