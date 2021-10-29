import React, { FC, useState } from 'react';

import { PillButton } from './styled';
import { PillFilterProps, PillProps } from './types';

export const PillSelector: FC<PillFilterProps> = ({
  testId,
  selectedPillName,
  pills,
}) => {
  const [currentPillSelector, applyPillSelector] = useState(selectedPillName);

  const onClick = (pillButton: PillProps) => {
    applyPillSelector(pillButton.name);
  };

  return pills ? (
    <div data-testid={testId}>
      {pills.map(pillButton => (
        <PillButton
          key={pillButton.name}
          isSelected={pillButton.name === currentPillSelector}
          onClick={() => onClick(pillButton)}
          role="tab"
          aria-selected={pillButton.name === currentPillSelector}
          data-testid={pillButton.name}
        >
          {pillButton.content}
        </PillButton>
      ))}
    </div>
  ) : null;
};
