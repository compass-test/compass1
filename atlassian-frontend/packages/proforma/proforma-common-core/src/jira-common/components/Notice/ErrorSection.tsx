import React, { useState } from 'react';

import styled from 'styled-components';

import { N20 } from '@atlaskit/theme/colors';
import Toggle from '@atlaskit/toggle';

interface ErrorSectionProps {
  errorDetails: string;
}

export const ErrorSection: React.FC<ErrorSectionProps> = ({ errorDetails }) => {
  const [showErrorDetails, setShowErrorDetails] = useState<boolean>(false);

  return (
    <div>
      <ErrorSectionLabel>
        <p>Show error details:</p>
        <Toggle
          isChecked={showErrorDetails}
          onChange={() => {
            setShowErrorDetails(!showErrorDetails);
          }}
        />
      </ErrorSectionLabel>
      {showErrorDetails && (
        <ErrorDetailsWrapper>
          <code>{errorDetails}</code>
        </ErrorDetailsWrapper>
      )}
    </div>
  );
};

const ErrorSectionLabel = styled.div`
  display: flex;
  margin-top: 20px;

  > p {
    margin-top: 2px;
  }
`;

const ErrorDetailsWrapper = styled.div`
  background-color: ${N20};
  padding: 8px;
  font-size: 12px;
`;
