import React, { useState } from 'react';

import { Wrapper } from '../example-helpers/utils';
import { CollapsibleCloud, PreflightCheckError } from '../src';

export default function CollapsibleCloudWithContent() {
  const [renderTimes, setRenderTimes] = useState(0);

  const content = (
    <div style={{ marginTop: 16, padding: 8, height: 200, background: '#eee' }}>
      <strong>
        This is a content that will only appear on even renderTimes (will
        disappear if renderTimes is an odd number)
      </strong>
    </div>
  );

  return (
    <Wrapper>
      <>
        <button type="button" onClick={() => setRenderTimes(renderTimes + 1)}>
          Re-render
        </button>
        <CollapsibleCloud
          icon={<PreflightCheckError />}
          heading={
            <h4>Re-render this collapsible (renderTimes: {renderTimes})</h4>
          }
        >
          {renderTimes % 2 === 0 ? content : undefined}
        </CollapsibleCloud>
      </>
    </Wrapper>
  );
}
