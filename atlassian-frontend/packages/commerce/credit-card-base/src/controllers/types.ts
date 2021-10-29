import { FieldConfigs } from '../common/types/field-configs';
import { CreditCardError } from '../common/utils/errors';
import { StatedResponse } from '../common/utils/state/types';

/**
 * Definition of the current Stripe environment
 */
export interface StripeEnvironment {
  /**
   * Stripe API key
   */
  publicKey: string;
}

export type StripeEnvironmentResponse<
  T extends StripeEnvironment = StripeEnvironment
> = StatedResponse<T>;

export type ValidateSubmissionCallback = () => CreditCardError | undefined;

export type CommerceService = {
  token: StripeEnvironmentResponse;
  fieldConfigs?: FieldConfigs;
};
