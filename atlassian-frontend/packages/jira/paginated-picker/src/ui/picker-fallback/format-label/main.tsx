import React from 'react';

import Badge from '@atlaskit/badge';

import { SelectValues, SingleOption } from '../../../common/types';

import { BadgeWrapper, Container, LabelValueWrapper } from './styled';

export const hasValue = (value: SelectValues | SingleOption | null): boolean =>
  Array.isArray(value) ? value.length > 0 : !!value;

export const formatLabel = (label: string = '', value?: SelectValues) => {
  if (!value || !hasValue(value)) {
    return label;
  }

  const [firstValue, ...otherValues] = value.map(v => v.label ?? '');

  return (
    <Container>
      <strong>{label}:</strong>
      <LabelValueWrapper>
        {firstValue}
        {otherValues.length > 0 && (
          <BadgeWrapper>
            <Badge>{`+${otherValues.length}`}</Badge>
          </BadgeWrapper>
        )}
      </LabelValueWrapper>
    </Container>
  );
};
