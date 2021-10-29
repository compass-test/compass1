import { ResultError } from '../../../common/providers/as-data-provider';
import { errorToReason } from '../error-to-reason';

export enum SwitcherLoadErrorReason {
  AVAILABLE_PRODUCTS = 'availableProducts',
  PRODUCT_CONFIGURATION = 'productConfiguration',
}

export class SwitcherLoadError extends Error {
  readonly errorReason: SwitcherLoadErrorReason;
  readonly resultError: ResultError | Error;
  constructor(
    errorReason: SwitcherLoadErrorReason,
    resultError: ResultError | Error,
  ) {
    super();
    this.errorReason = errorReason;
    this.resultError = resultError;
  }

  public reason() {
    const potentialResultError = this.resultError as ResultError;
    return {
      ...errorToReason(
        potentialResultError.error
          ? potentialResultError.error
          : this.resultError,
      ),
      source: this.errorReason,
    };
  }
}
