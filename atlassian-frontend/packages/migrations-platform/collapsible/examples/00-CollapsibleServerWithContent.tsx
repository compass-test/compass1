import React from 'react';

import { Wrapper } from '../example-helpers/utils';
import { CollapsibleServer } from '../src';

export default function CollapsibleServerWithContent() {
  return (
    <Wrapper>
      <CollapsibleServer
        content={
          <div
            style={{
              marginTop: 16,
              padding: 8,
              height: 200,
              background: '#eee',
            }}
          >
            <strong>
              This background color only for example, not in the component{' '}
            </strong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at
            lectus molestie augue tincidunt mattis. In in dui vitae velit
            faucibus consectetur. Donec ut aliquet quam, in hendrerit libero.
            Fusce vulputate orci sed libero molestie, sit amet pretium est
            mollis.
          </div>
        }
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
