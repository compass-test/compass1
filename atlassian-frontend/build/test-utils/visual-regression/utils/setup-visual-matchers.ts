import { toMatchVisually } from './visual-matchers';

export const setupVisualMatchers = () => {
  // eslint-disable-next-line no-undef
  expect.extend({ toMatchVisually });
};
