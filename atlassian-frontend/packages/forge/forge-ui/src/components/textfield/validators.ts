// eslint-disable-next-line import/no-extraneous-dependencies
import _isNumber from 'is-number';

export function isNumber(value: unknown) {
  return _isNumber(value) ? undefined : 'Enter a valid number.';
}

export function isEmail(value: unknown) {
  if (typeof value === 'string' && /@/.test(value)) {
    return;
  }
  return 'Enter a valid email.';
}

export function isTelephone(value: unknown) {
  if (typeof value === 'string' && /[0-9]/.test(value)) {
    return;
  }
  return 'Enter a valid telephone.';
}

export type ValidateFn = (value: unknown) => string | undefined;

const Validators: { [key: string]: ValidateFn } = {
  email: isEmail,
  number: isNumber,
  tel: isTelephone,
};

export function makeValidate(
  isRequired: boolean,
  type: keyof typeof Validators,
) {
  return function validate(value: unknown) {
    const isEmpty = typeof value === 'string' && value.length === 0;
    if (isRequired && isEmpty) {
      return 'This field is required.';
    }
    if (isEmpty) {
      return;
    }

    const isType = type in Validators ? Validators[type] : undefined;
    return isType ? isType(value) : undefined;
  };
}
