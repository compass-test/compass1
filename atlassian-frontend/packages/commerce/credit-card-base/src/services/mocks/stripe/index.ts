import {
  PaymentIntent,
  PaymentMethod,
  SetupIntent,
  Stripe,
  StripeElementBase,
  StripeError,
} from '@stripe/stripe-js';

type ErrorMethodsIncludeList = Pick<
  Stripe,
  'confirmCardPayment' | 'confirmCardSetup'
>;

type MockedStripeOptions = {
  failureScenariosForMethods?: (keyof ErrorMethodsIncludeList)[];
};

/**
 * Stripe base element styles
 */
const baseStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  display: 'block',
  fontFamily: 'sans-serif',
  margin: 0,
  padding: 0,
  width: '100%',
  fontSize: '1em',
  lineHeight: '1.2em',
  height: '1.2em',
  outline: 0,
};

const mockPaymentIntent: PaymentIntent = {
  id: 'pi_1DikJx2eZvKYlo2CSJHagThE',
  object: 'payment_intent',
  amount: 1099,
  canceled_at: null,
  cancellation_reason: null,
  capture_method: 'automatic',
  client_secret: 'pi_1DikJx2eZvKYlo2CSJHagThE_secret_gD6NBXpMNLsjYa0Jq5GmysyVW',
  confirmation_method: 'automatic',
  created: 1545146241,
  currency: 'usd',
  description: null,
  last_payment_error: null,
  livemode: false,
  next_action: null,
  payment_method: null,
  payment_method_types: ['card'],
  receipt_email: null,
  setup_future_usage: null,
  shipping: null,
  status: 'requires_payment_method',
};

const stripeMockErrror: StripeError = {
  type: 'api_error',
};

export const createMockedStripeLoader = (
  mockOptions: MockedStripeOptions = {},
): (() => Promise<Stripe>) => () => {
  const { failureScenariosForMethods = [] } = mockOptions;
  return {
    elements() {
      const elements: any = {};

      return {
        create(elementType: string, baseOptions: any = {}): StripeElementBase {
          let options = { ...baseOptions };
          let callbacks: any = {};
          const node = document.createElement('input');
          Object.assign(node.style, baseStyle, baseOptions.style.base);
          const element = {
            on(event: string, callback: any) {
              callbacks[event] = callback;
              if (event === 'ready') {
                callbacks['ready']();
              }
            },
            mount(parentNode: HTMLElement) {
              parentNode.appendChild(node);
            },
            update(newOptions: any) {
              options = { ...options, ...newOptions };
            },
            destroy() {
              node.parentElement!.removeChild(node);
              delete elements[elementType];
              callbacks = {};
            },
          };
          elements[elementType] = element;
          return element as any;
        },
        getElement(elementType: string) {
          return elements[elementType];
        },
      };
    },
    createToken() {},
    createPaymentMethod(): Promise<{
      paymentMethod?: PaymentMethod;
      error?: StripeError;
    }> {
      const stripePaymentMethod = <PaymentMethod>{
        id: 'stripe-payment-method-id',
        billing_details: <PaymentMethod.BillingDetails>{
          address: null,
          email: null,
          name: null,
          phone: null,
        },
        card: <PaymentMethod.Card>{
          brand: 'visa',
          exp_month: 10,
          exp_year: 22,
          last4: '1234',
        },
      };
      return Promise.resolve({
        paymentMethod: stripePaymentMethod,
      });
    },
    confirmCardPayment(): Promise<{
      paymentIntent?: PaymentIntent;
      error?: StripeError;
    }> {
      return failureScenariosForMethods.includes('confirmCardPayment')
        ? Promise.reject(stripeMockErrror)
        : Promise.resolve({
            paymentIntent: mockPaymentIntent,
          });
    },
    confirmCardSetup(): Promise<{
      setupIntent?: SetupIntent;
      error?: StripeError;
    }> {
      return failureScenariosForMethods.includes('confirmCardSetup')
        ? Promise.reject(stripeMockErrror)
        : Promise.resolve({
            setupIntent: <SetupIntent>{
              payment_method: 'stripe-payment-method-id',
            },
          });
    },
  } as any;
};
