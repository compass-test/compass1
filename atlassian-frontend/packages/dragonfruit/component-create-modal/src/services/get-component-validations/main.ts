export const NAME_MAX_LENGTH = 100;

const validateName = (value: string | undefined): boolean => {
  return value !== undefined && value.trim().length > 0;
};

export const useComponentValidations = () => {
  return {
    validateName,
  };
};
