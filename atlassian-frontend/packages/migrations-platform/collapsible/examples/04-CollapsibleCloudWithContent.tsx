import React from 'react';

import { Wrapper } from '../example-helpers/utils';
import { CollapsibleCloud, PreflightCheckSuccess } from '../src';

export default function CollapsibleCloudWithContent() {
  return (
    <Wrapper>
      <CollapsibleCloud
        icon={<PreflightCheckSuccess />}
        heading={
          <h4>
            This is collapsible heading{' '}
            <span role="img" aria-label="100">
              💯🔥
            </span>
          </h4>
        }
      >
        <div
          style={{
            marginTop: 16,
            padding: 8,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at
          lectus molestie augue tincidunt mattis. In in dui vitae velit faucibus
          consectetur. Donec ut aliquet quam, in hendrerit libero. Fusce
          vulputate orci sed libero molestie, sit amet pretium est mollis.
        </div>
      </CollapsibleCloud>
    </Wrapper>
  );
}
