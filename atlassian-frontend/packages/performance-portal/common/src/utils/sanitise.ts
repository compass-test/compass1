type SanitisedResults<T> = {
  isValid: boolean;
  validValue: T;
};

export const sanitiseValue = <
  V extends string | number | boolean | undefined | null
>(
  value: any,
  validValues: V[],
  fallbackValue?: V,
): SanitisedResults<V> => {
  const isValid = validValues.some((v) => v === value);
  return {
    isValid,
    validValue: isValid ? value : fallbackValue ?? validValues[0],
  };
};
