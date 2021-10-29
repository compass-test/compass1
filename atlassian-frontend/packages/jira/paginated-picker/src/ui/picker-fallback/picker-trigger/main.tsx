import React, { forwardRef, MouseEvent, ReactNode } from 'react';

import DefaultButton from '@atlaskit/button';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

import { ClearButton } from './clear-button';
import { LoadingStateAnimationWrapper } from './loading-state';
import {
  ButtonWrapper,
  ChildrenWrapper,
  StyledChevron,
  StyledClose,
} from './styled';

type PickerTriggerProps = {
  isInvalid: boolean;
  isSelected: boolean;
  isLoading?: boolean;
  hasValues: boolean;
  children: ReactNode;
  testId?: string;
  onClick: () => void;
  onClear?: () => void;
};

const PickerTrigger = forwardRef<HTMLElement, PickerTriggerProps>(
  (
    {
      children,
      isInvalid,
      isSelected,
      isLoading,
      hasValues,
      onClick,
      onClear,
      testId,
    }: PickerTriggerProps,
    ref,
  ) => {
    if (isLoading) {
      return (
        <LoadingStateAnimationWrapper>
          <DefaultButton isSelected testId={testId}>
            {children}:
          </DefaultButton>
        </LoadingStateAnimationWrapper>
      );
    }
    // TODO : fix spacing.. this is overlapping with the Chevron
    const iconAfter = (
      <ClearButton
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          onClear?.();
        }}
        label="Remove criteria"
      />
    );
    const Content = (
      <>
        <ChildrenWrapper>{children}</ChildrenWrapper>
        {onClear ? (
          <StyledClose>{iconAfter}</StyledClose>
        ) : (
          <StyledChevron>
            <ChevronDownIcon label="" />
          </StyledChevron>
        )}
      </>
    );
    return (
      <ButtonWrapper>
        <DefaultButton
          appearance={isInvalid ? 'danger' : 'default'}
          isSelected={isSelected || hasValues}
          onClick={onClick}
          ref={ref}
          testId={testId}
        >
          {Content}
        </DefaultButton>
      </ButtonWrapper>
    );
  },
);

export default PickerTrigger;
