export const SECURE_VARIABLE_MASK: string = '••••••';
export const VALID_VARIABLE_NAME: RegExp = new RegExp(
  '^[A-Za-z_][A-Za-z0-9_]*$',
);
export const NEW_VALID_VARIABLE_NAME: RegExp = new RegExp(
  '^[-.A-Za-z_][-.A-Za-z0-9_]*$',
);
