import React from 'react';

import { Wrapper } from '../example-helpers/utils';
import { CollapsibleServer } from '../src';

export default function CollapsibleServerWithoutContent() {
  return (
    <Wrapper>
      <CollapsibleServer
        content={undefined}
        heading={
          <h4>
            This is collapsible heading{' '}
            <span role="img" aria-label="100">
              💯🔥
            </span>
          </h4>
        }
      />
    </Wrapper>
  );
}
