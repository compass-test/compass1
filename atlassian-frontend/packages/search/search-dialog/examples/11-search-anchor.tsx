import React, { useState } from 'react';
import { SearchAnchor } from '../src';
import { TwoColContainer, Col } from '../examples-helpers/two-column-container';
import Button from '@atlaskit/button/standard-button';
import { alert } from '../examples-helpers/window';

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
            Simulate {isExpanded ? 'unfocus' : 'focus'}
          </Button>
        </Col>
        <Col>
          <p>
            State: <code>{JSON.stringify({ isExpanded })}</code>
          </p>
        </Col>
      </TwoColContainer>
      <SearchAnchor
        onBlur={() => alert('SearchAnchor onBlur')}
        onFocus={() => alert('SearchAnchor onFocus')}
        onKeyDown={() => alert('SearchAnchor onKeyDown')}
        isExpanded={isExpanded}
      >
        <p>All providers and components rendered as children here.</p>
      </SearchAnchor>
    </>
  );
};

export default Example;
