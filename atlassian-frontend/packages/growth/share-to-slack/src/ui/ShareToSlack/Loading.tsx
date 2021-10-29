import React from 'react';

import styled from 'styled-components';

import Spinner from '@atlaskit/spinner';

const Container = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  padding: 2px 24px;
  min-height: 276px;
`;

type Props = {
  className?: string;
};

export default function Loading({ className }: Props) {
  return (
    <Container data-testid="share-to-slack-loading" className={className}>
      <Spinner size="large" />
    </Container>
  );
}
