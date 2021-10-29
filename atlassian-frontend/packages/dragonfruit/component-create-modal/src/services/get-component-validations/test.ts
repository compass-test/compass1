import { useComponentValidations } from './main';

describe('useComponentValidations', () => {
  describe('validateName', () => {
    test('returns true if the name is valid', () => {
      const { validateName } = useComponentValidations();
      expect(validateName('Valid Component Name')).toBe(true);
    });

    test('returns false if the name is undefined', () => {
      const { validateName } = useComponentValidations();
      expect(validateName(undefined)).toBe(false);
    });

    test('returns false if the name is blank or all whitespace', () => {
      const { validateName } = useComponentValidations();
      expect(validateName('     ')).toBe(false);
    });
  });
});
