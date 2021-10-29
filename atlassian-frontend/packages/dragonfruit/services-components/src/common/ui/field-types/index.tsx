import React from 'react';

import { ContextFieldHeading, SummaryFieldHeading } from './styled';
import { FieldProps } from './types';

export const SummaryField = ({
  heading,
  testId = '',
  children,
}: FieldProps) => {
  const id = 'component-description';

  return (
    <section data-test-id={testId} aria-labelledby={id}>
      <SummaryFieldHeading id={id}>{heading}</SummaryFieldHeading>
      <div>{children}</div>
    </section>
  );
};

export const ContextField = ({
  heading,
  testId = '',
  children,
}: FieldProps) => (
  <div data-test-id={testId}>
    <ContextFieldHeading>{heading}</ContextFieldHeading>
    <div>{children}</div>
  </div>
);
