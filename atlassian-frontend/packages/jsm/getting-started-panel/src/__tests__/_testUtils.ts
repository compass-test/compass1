import { Component, ReactElement } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { DiProvider, Dependency } from 'react-magnetic-di';
import {
  SdVisibilityKeys,
  VisibilityData,
  VisibilityValues,
} from '../common/services/visibility';

// copied from JFE `src/packages/platform/test-utils/magnetic-di/src/common/utils.js`
export const mountWithDi = <
  C extends Component,
  P = C['props'],
  S = C['state']
>(
  node: ReactElement<P>,
  dependencies: Dependency[] = [],
  options: {
    context?: Object; // flowlint-line unclear-type:off
    attachTo?: HTMLElement;
    childContextTypes?: Object; // flowlint-line unclear-type:off
  } = {},
): ReactWrapper<P, S, C> =>
  mount(node, {
    ...options,
    wrappingComponent: DiProvider,
    wrappingComponentProps: {
      use: dependencies,
    },
  } as any); // the any is necessary because of missing option types

export const deterministicShuffle = <T>(
  array: T[],
  seedString: string = 'There once was a man named Chandler, whose wife made him die inside',
): T[] => {
  const NUM_OF_POSSIBLE_LETTERS = 26;

  // array of numbers in range [0, 1)
  const randomEnoughNumbers: number[] = seedString
    .replace(/[^a-z]/gi, '')
    .toLowerCase()
    .split('')
    .map(
      (char) =>
        (char.charCodeAt(0) - 'a'.charCodeAt(0)) / NUM_OF_POSSIBLE_LETTERS,
    );

  // cycle through randomEnoughNumbers
  let randIndex = 0;
  const getRandomEnoughNumber = () => {
    return randomEnoughNumbers[randIndex++ % randomEnoughNumbers.length];
  };

  const copy = [...array];

  // in place shuffle from good ol' stack overflow https://stackoverflow.com/a/6274381
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(getRandomEnoughNumber() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const isAdvancedUser = (visibilityData: VisibilityData) =>
  visibilityData.user &&
  (visibilityData.user[SdVisibilityKeys.SdAdvancedTasksVisibility] ===
    VisibilityValues.Visible ||
    visibilityData.user[SdVisibilityKeys.SdAdvancedTasksVisibility] ===
      undefined);
