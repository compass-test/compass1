// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

import { CommerceStartgateProxy } from '../src/ui/commerce-stargate-proxy';

export default () => {
  return (
    <CommerceStartgateProxy>
      {(txaId, igId) => (
        <>
          <p>
            Transactional account id is <code>{txaId}</code>
          </p>
          <p>
            Invoice group id is <code>{igId}</code>
          </p>
        </>
      )}
    </CommerceStartgateProxy>
  );
};
