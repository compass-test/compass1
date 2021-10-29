import React, { forwardRef, ReactNode, RefObject } from 'react';
import { NudgeTooltipPulse } from './styled';

export interface NudgeProps {
  hasPulse: boolean;
  onClickCapture: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  children: ReactNode;

  /** Only for DefaultNudge */
  pulseColor?: string;
  pulseShadowColor?: string;
  pulseBorderRadius?: number;
}

export const DefaultNudge = forwardRef<HTMLDivElement, NudgeProps>(
  ({ children, ...rest }, ref) => (
    <NudgeTooltipPulse {...rest} innerRef={ref as RefObject<HTMLDivElement>}>
      {children}
    </NudgeTooltipPulse>
  ),
);

export type NudgeType = typeof DefaultNudge;
