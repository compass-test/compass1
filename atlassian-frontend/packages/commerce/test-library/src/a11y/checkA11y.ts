import { axe, JestAxeConfigureOptions, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

export const axeRules: JestAxeConfigureOptions = {
  rules: {
    'color-contrast': { enabled: false },
  },
  resultTypes: ['violations', 'incomplete'],
};

export const checkA11y = async (container: HTMLElement) => {
  const results = await axe(container, axeRules);
  expect(results).toHaveNoViolations();
};
