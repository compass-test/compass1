import React, { FC } from 'react';

import { Check, Solution } from '../../../types';

import { CheckType, FlyoutHeader, FlyoutPanel } from './styled';

export const ChecksPanel: FC<{
  caption: string;
  checks: Check[];
  isFirst: boolean;
}> = ({ caption, checks, isFirst }) => (
  <FlyoutPanel isFirst={isFirst}>
    <FlyoutHeader>{caption}</FlyoutHeader>
    {checks.map((check, index) => (
      <div key={index}>
        {check.rule}
        {'\u00A0'}
        <CheckType>({check.type})</CheckType>
      </div>
    ))}
  </FlyoutPanel>
);

export const ChecksFlyout: FC<{ solution: Solution }> = ({ solution }) => {
  const checks = solution.checks && solution.checks;
  const antiChecks = solution.antiChecks && solution.antiChecks;

  const checksComponent =
    checks && checks.length > 0 ? (
      <ChecksPanel caption="Checks" checks={checks} isFirst />
    ) : null;

  const antiChecksComponent =
    antiChecks && antiChecks.length > 0 ? (
      <ChecksPanel
        caption="Anti-checks"
        checks={antiChecks}
        isFirst={!checksComponent}
      />
    ) : null;

  return (
    <>
      {checksComponent}
      {antiChecksComponent}
    </>
  );
};
