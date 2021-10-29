import React from 'react';

import Spinner from '@atlaskit/spinner';

import { Container, DiffContainer } from './styled';
import { SpotlightProps } from './types';

export const Spotlight = React.memo(
  ({
    label,
    loading = false,
    children,
    primaryColor,
    Icon,
  }: SpotlightProps) => {
    return (
      <Container borderColor={primaryColor}>
        {loading === false ? (
          <DiffContainer textColor={primaryColor}>
            <Icon label={label} size="xlarge" primaryColor={primaryColor} />
            {children}
          </DiffContainer>
        ) : (
          <Spinner size="large" />
        )}
        <div>{label}</div>
      </Container>
    );
  },
);
