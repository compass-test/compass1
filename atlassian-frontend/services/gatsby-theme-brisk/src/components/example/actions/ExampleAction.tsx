import React, { ReactChild, ReactNode } from 'react';
import Button, { ButtonProps } from '@atlaskit/button';
import Tooltip from '@atlaskit/tooltip';

export type ExampleActionProps = Omit<ButtonProps, 'aria-label'> & {
  icon: ReactChild;
  /** Sets both the tooltip label and aria-label */
  label: string;
};

const ExampleAction: React.FC<ExampleActionProps> = ({
  icon,
  label,
  testId,
  ...buttonProps
}) => {
  const updateTooltip = React.useRef<() => void>();

  React.useLayoutEffect(() => {
    updateTooltip.current?.();
  }, [label]);

  return (
    <Tooltip
      content={({ update }) => {
        updateTooltip.current = update;
        return label;
      }}
      position="top"
      testId={testId ? `${testId}-tooltip` : undefined}
    >
      <Button
        appearance="subtle"
        iconBefore={icon}
        testId={testId}
        aria-label={label}
        {...buttonProps}
      />
    </Tooltip>
  );
};

export default ExampleAction;
