import React, { useState } from 'react';
import { SearchInput } from '../src';
import { TwoColContainer, Col } from '../examples-helpers/two-column-container';
import Button from '@atlaskit/button/standard-button';

const Example = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <TwoColContainer>
        <Col>
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            appearance="default"
          >
            {isExpanded ? 'Close' : 'Expand'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isExpanded })}</code>
          </p>
        </Col>
      </TwoColContainer>
      <SearchInput
        placeholder="Search"
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(true)}
      />
    </>
  );
};

export default Example;
