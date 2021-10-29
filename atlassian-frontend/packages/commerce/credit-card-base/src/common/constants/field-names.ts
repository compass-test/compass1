export const CVC = 'cvc';
export const NUMBER = 'number';
export const EXPIRY = 'expiry';
export const NAME = 'name';

export type FieldName =
  | typeof CVC
  | typeof NUMBER
  | typeof EXPIRY
  | typeof NAME;
