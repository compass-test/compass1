import React from 'react';

import styled from '@emotion/styled';

const VrExampleWithTestId: React.FC = ({ children }) => (
  <div data-testid="vr-example">{children}</div>
);

const VrExampleStyled = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 10px;
  }
`;

/**
 * This is not a part of commerce layout. It is only used internaly for this package VR testing purpose.
 * Should be moved to a separate package or a separate entry point of "commerce-test-library" package if it is going to be shared.
 */
export const VrExample: React.FC = ({ children }) => (
  <VrExampleWithTestId>
    <VrExampleStyled>{children}</VrExampleStyled>
  </VrExampleWithTestId>
);
