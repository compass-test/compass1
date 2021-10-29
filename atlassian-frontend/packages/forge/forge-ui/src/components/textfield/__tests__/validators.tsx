import {
  isEmail,
  isNumber,
  isTelephone,
  makeValidate,
  ValidateFn,
} from '../validators';

const vectors: Record<
  string,
  {
    f: ValidateFn;
    type: string;
    message: RegExp;
    valid: string[];
    invalid: string[];
  }
> = {
  emails: {
    f: isEmail,
    type: 'email',
    message: /email/,
    valid: ['user@atlassian.com', 'user@atlassian.net', 'user@atlassian.tom'],
    invalid: ['user', '12'],
  },
  numbers: {
    f: isNumber,
    type: 'number',
    message: /number/,
    valid: ['12', '   12', '0'],
    invalid: ['user', '**', '   '],
  },
  telephone: {
    f: isTelephone,
    type: 'tel',
    message: /telephone/,
    valid: ['0401', '1300 abc'],
    invalid: [' '],
  },
};

for (const key in vectors) {
  const { f, type, message, valid, invalid } = vectors[key];
  const fUnrequired = makeValidate(false, type);
  const fRequired = makeValidate(true, type);

  valid.forEach((x) => {
    test(`${key} is valid`, () => {
      expect(f(x)).toBeUndefined();
      expect(fUnrequired(x)).toBeUndefined();
      expect(fRequired(x)).toBeUndefined();
    });
  });

  invalid.forEach((x) => {
    test(`${key} is invalid`, () => {
      expect(f(x)).toMatch(message);
      expect(fUnrequired(x)).toMatch(message);
      expect(fRequired(x)).toMatch(message);
    });
  });

  test(`${key} is compatible with isRequired`, () => {
    expect(fUnrequired('')).toBeUndefined();
    expect(fRequired('')).toMatch(/required/);
  });
}
