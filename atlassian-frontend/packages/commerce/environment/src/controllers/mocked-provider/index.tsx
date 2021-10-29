// eslint-disable-next-line import/no-extraneous-dependencies
import React, { useMemo } from 'react';

import { fetchScenarioMock, Scenario } from '../../common/scenarios';
import { OverrideRegistryRoot } from '../use-commerce-override';
import { CommerceOverride } from '../use-commerce-override/types';

type WithScenarios = {
  scenarios?: Scenario[];
};
type WithOverrides = {
  overrides?: CommerceOverride[];
};

type Props = WithOverrides & WithScenarios;

const EMPTY: any[] = [];
/**
 * Provides altered environment
 * @param scenarios - network scenarios
 * @param overrides - entity mocking
 */
export const CommerceMockedEnvironment: React.FC<Props> = ({
  children,
  scenarios = EMPTY,
  overrides = EMPTY,
}) => {
  const mockingOverrides: CommerceOverride[] = useMemo(
    () => [
      ...(scenarios !== EMPTY ? [[fetch, fetchScenarioMock(scenarios)]] : []),
      ...overrides,
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...scenarios, ...overrides], // emulate shallow equal
  );

  return (
    <OverrideRegistryRoot overrides={mockingOverrides}>
      {children}
    </OverrideRegistryRoot>
  );
};

/**
 * A convenient wrapper useful for testing service hooks
 * @see https://react-hooks-testing-library.com/usage/advanced-hooks#context
 * @param scenarios - scenarios for the service hook
 */
export const createMockedEnvironmentWrapper = (
  ...scenarios: Scenario[]
): React.ComponentType => ({ children }) => (
  <CommerceMockedEnvironment scenarios={scenarios}>
    {children}
  </CommerceMockedEnvironment>
);
