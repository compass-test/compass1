import React from 'react';

import { FieldContainer } from '@atlassian/commerce-final-form';

import { BigLabelSkeleton, FieldSkeleton, LabelSkeleton } from './styled';

const NBSP = '\u00A0';

const Field = ({ bigLabel }: { bigLabel?: boolean }) => (
  <div>
    {bigLabel ? (
      <BigLabelSkeleton children={NBSP} />
    ) : (
      <LabelSkeleton children={NBSP} />
    )}
    <FieldSkeleton children={NBSP} />
  </div>
);

export const LoadingForm = () => (
  <FieldContainer>
    <Field />
    <Field />
    <Field />
    <Field />
    <Field />
    <Field />
    <Field />
    <Field bigLabel />
  </FieldContainer>
);
