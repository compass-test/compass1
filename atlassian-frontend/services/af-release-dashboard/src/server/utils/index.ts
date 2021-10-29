import { validateOrReject as validate } from 'class-validator';
import { ValidationException } from '../middleware/errors/exceptions';

export const mapCompiledEnvironmentVariables = () => {
  process.env = {
    ...process.env,
  };
};

export const partialValidate = async (
  partialEntity: Record<string, any>,
  ClassDefinition: any,
  options = { partialsExist: true },
) => {
  const instance = new ClassDefinition();
  for (const key in partialEntity) {
    const value = partialEntity[key];
    if (options.partialsExist && value == null) {
      throw new ValidationException(
        `PartialValidation Error: Key of ${key} for entity type ${ClassDefinition.name} is missing a value.`,
      );
    }
    instance[key] = partialEntity[key];
  }
  await validate(instance, {
    skipMissingProperties: true,
    validationError: { target: false },
  });
};

export const safeLowerTrim = (str: any) => {
  if (typeof str === 'string') {
    return str.toLowerCase().trim();
  }
  return '';
};

export const getEarliest = (dateStrA: string, dateStrB: string) => {
  return new Date(dateStrA) < new Date(dateStrB) ? dateStrA : dateStrB;
};
