/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';

/**
 @usage
   <TwoColContainer>
     <Col>
     // ...
     </Col>
     <Col>
     // ...
     </Col>
   </TwoColContainer>
 */

export const TwoColContainer = ({
  children,
}: {
  children: React.ReactChild[];
}) => {
  if (children.length !== 2) {
    throw new TypeError(
      `Must provide 2 <Col> children, supplied: ${children.length}`,
    );
  }
  return (
    <div
      css={css`
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2em;
      `}
    >
      {children}
    </div>
  );
};

export const Col: React.FC = ({ children }) => (
  <div
    css={css`
      flex: 1;
    `}
  >
    {children}
  </div>
);
