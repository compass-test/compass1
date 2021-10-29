import React, { useState } from 'react';
import Portal from '@atlaskit/portal';
import { layers } from '@atlaskit/theme/constants';

const { Provider, Consumer } = React.createContext<
  HTMLDivElement | null | undefined
>(undefined);

export const PortalProvider: React.FunctionComponent = ({ children }) => {
  const [portal, setPortal] = useState<HTMLDivElement | null | undefined>();

  return (
    <>
      {portal && <Provider value={portal}>{children}</Provider>}
      <Portal zIndex={layers.modal() + 1}>
        <div data-testid="forge-ui-portal" ref={setPortal} />
      </Portal>
    </>
  );
};

export { Consumer as PortalConsumer };
