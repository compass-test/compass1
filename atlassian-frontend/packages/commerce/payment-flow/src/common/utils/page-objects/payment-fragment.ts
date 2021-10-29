/* eslint-disable import/no-extraneous-dependencies */

import {
  byTestId,
  byText,
  createPageObject,
  findElement,
  pageActions,
  queryElement,
} from '@atlassian/commerce-test-library';

export const PaymentFragment = (scope: HTMLElement) =>
  createPageObject({
    scope: scope,
    selectors: {
      cardContent: byTestId(/commerce-payment-methods.card-content/i),
      walletPaymentList: byTestId(
        /commerce-payment-methods.wallet.payment-list/i,
      ),
      walletSelectedPaymentMethod: byTestId(
        /commerce-payment-methods.wallet.selected/i,
      ),
    },
    actions: (page, scheduleCallBack, then, selectors) => ({
      then,

      waitTillSettled() {
        scheduleCallBack(async () => {
          await page.waitTillPresent('cardContent');
        });

        return this;
      },

      selectPaymentMethod(last4Digits: string) {
        scheduleCallBack(async () => {
          const paymentList = await findElement(
            selectors.walletPaymentList,
            scope,
          );
          const paymentMethod = await findElement(
            byText(last4Digits, { exact: false }),
            paymentList,
          );

          await pageActions.click(paymentMethod);
        });

        return this;
      },

      async walletSelectedPaymentMethod() {
        const selectedPaymentMethod = await queryElement(
          selectors.walletSelectedPaymentMethod,
          scope,
        );

        if (!selectedPaymentMethod) {
          return null;
        }

        const cardContainer = await findElement(
          selectors.cardContent,
          selectedPaymentMethod,
        );

        const cardContent = cardContainer.textContent!.split(/expires/i);

        return {
          cardNumber: cardContent[0].trim(),
          expiry: cardContent[1].trim(),
        };
      },

      async cardContent() {
        const cardContent = (await page.textContent('cardContent'))!.split(
          /expires/i,
        );

        return {
          cardNumber: cardContent[0].trim(),
          expiry: cardContent[1].trim(),
        };
      },
    }),
  });
