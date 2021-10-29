import React, { useEffect } from 'react';

import useOpenState from '../../controllers/use-open-state';

import { Content, Label, Wrapper } from './styled';
import { ExampleComponentRestrictedProps } from './types';

export default function ExampleComponentRestricted({
  content,
  isOpen: isOpenProp,
  label,
  onOpenChange,
  testId,
}: ExampleComponentRestrictedProps) {
  const [isOpen, { open, close, toggle }] = useOpenState(isOpenProp);
  useEffect(() => {
    if (isOpenProp === true) {
      open();
    } else if (isOpenProp === false) {
      close();
    }
  }, [isOpenProp, open, close]);

  const toggleOpen = () => {
    if (onOpenChange) {
      onOpenChange(!isOpen);
    } else if (isOpenProp === undefined) {
      toggle();
    }
  };

  return (
    <Wrapper testId={testId}>
      <Label>{label}</Label>
      <button onClick={toggleOpen}>{isOpen ? '-' : '+'}</button>
      {isOpen && <Content>{content}</Content>}
    </Wrapper>
  );
}
