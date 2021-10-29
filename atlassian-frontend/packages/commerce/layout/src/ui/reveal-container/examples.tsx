import React, { useState } from 'react';

import { RevealContainer } from './index';

export const RevealContainerExample: React.FC = () => {
  const [mode, setMode] = useState(true);
  return (
    <div>
      <button onClick={() => setMode((m) => !m)}>toggle</button>
      <div style={{ border: '1px solid black' }}>
        <RevealContainer
          condition={mode}
          fallback={
            <div>
              your main
              <br />
              content is
              <br />
              not very
              <br />
              visible
            </div>
          }
        >
          page content
          <br />
          has been
          <br />
          revealed
        </RevealContainer>
      </div>
      * border should always be "next" to the content
    </div>
  );
};
