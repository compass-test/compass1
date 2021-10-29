import {
  byTestId,
  createPageObject,
  pageActions,
} from '@atlassian/commerce-test-library';

export const StripeFragment = (scope: HTMLElement) =>
  createPageObject({
    scope: scope,
    selectors: {
      creditCardFormRendered: byTestId('commerce-creditcard.complete-state'),
      cardNumber: byTestId(`stripe-cc-number`),
      cardHolder: byTestId(`stripe-cc-name`),
      expiry: byTestId(`stripe-cc-expiry`),
      cvc: byTestId(`stripe-cc-cvc`),
    },
    actions: (page, scheduleCallBack, then) => ({
      then,

      async fillCardDetails(cardDetails: {
        cardNumber: string;
        cardHolder: string;
        expiry: string;
        cvc: string;
      }) {
        await page.waitTillPresent('creditCardFormRendered');

        const setValue = (
          selector: 'cardNumber' | 'expiry' | 'cvc',
          value: string,
        ) => {
          const cardNumberInput = page
            .getElement(selector)
            .querySelector('input');

          expect(cardNumberInput).toBeInTheDocument();

          pageActions.type(cardNumberInput!, value);
        };

        setValue('cardNumber', cardDetails.cardNumber);
        page.type('cardHolder', cardDetails.cardHolder);
        setValue('expiry', cardDetails.expiry);
        setValue('cvc', cardDetails.cvc);
      },

      waitTillSettled() {
        scheduleCallBack(async () => {
          await page.waitTillPresent('creditCardFormRendered');
        });

        return this;
      },
    }),
  });
