import React, { ReactNode, useCallback, useMemo, useRef } from 'react';

import { FlagsContext, FlagsContextType } from '../../controllers/flags';

import { FlagsRenderer } from './flags-renderer';

export const FlagsProvider: React.FC = (props) => {
  const subscription = useRef<FlagsContextType>({
    showFlag: () => {
      throw new Error('FlagsRender has subscribed to FlagsProvider yet');
    },
  });

  const subscribe = useCallback(
    (fn) => {
      subscription.current = fn();
    },
    [subscription],
  );

  const providerValue = useMemo<FlagsContextType>(
    () => ({
      showFlag: (flag) => subscription.current.showFlag(flag),
    }),
    [],
  );

  return (
    <>
      <FlagsContext.Provider value={providerValue}>
        {props.children}
      </FlagsContext.Provider>
      <FlagsRenderer subscribe={subscribe} />
    </>
  );
};

export const withFlagsProvider = (fn: () => ReactNode): ReactNode => (
  <FlagsProvider>{fn()}</FlagsProvider>
);
