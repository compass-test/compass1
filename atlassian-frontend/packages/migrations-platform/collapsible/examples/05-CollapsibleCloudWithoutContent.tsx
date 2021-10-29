import React from 'react';

import { Wrapper } from '../example-helpers/utils';
import { CollapsibleCloud, PreflightCheckLoading } from '../src';

export default function CollapsibleCloudWithoutContent() {
  return (
    <Wrapper>
      <CollapsibleCloud
        icon={<PreflightCheckLoading />}
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
