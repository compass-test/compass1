import React, { createContext, useMemo, useRef, useState } from 'react';

import type { default as CoordinationClient } from '@atlassiansox/engagekit/dist/esm/coordination/coordination-client';

export const ChangeBoardContext = createContext<{
  messageVisible: boolean;
  messageMounted: boolean;
  setMessageVisible: (val: boolean) => void;
  setMessageMounted: (val: boolean) => void;
  startCalledRef: React.MutableRefObject<boolean>;
}>({
  messageVisible: false,
  messageMounted: true,
  setMessageVisible: () => {},
  setMessageMounted: () => {},
  startCalledRef: { current: false },
});

export const ChangeBoardContextProvider: React.FC = ({ children }) => {
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageMounted, setMessageMounted] = useState(true);
  const startCalledRef = useRef(false);
  const value = useMemo(
    () => ({
      messageVisible,
      messageMounted,
      setMessageVisible,
      setMessageMounted,
      startCalledRef,
    }),
    [messageMounted, messageVisible],
  );
  return (
    <ChangeBoardContext.Provider value={value}>
      {children}
    </ChangeBoardContext.Provider>
  );
};

export interface EngageKitClientContextProps {
  coordinationClient?: CoordinationClient | Promise<CoordinationClient> | null;
  changeBoardMessageId?: string | null;
}

export const EngageKitContext = createContext<EngageKitClientContextProps>({
  coordinationClient: null,
  changeBoardMessageId: null,
});

export const EngageKitContextProvider: React.FC<EngageKitClientContextProps> = ({
  children,
  coordinationClient,
  changeBoardMessageId,
}) => {
  const value = useMemo(
    () => ({
      coordinationClient: coordinationClient ?? null,
      changeBoardMessageId: changeBoardMessageId ?? null,
    }),
    [coordinationClient, changeBoardMessageId],
  );
  return (
    <EngageKitContext.Provider value={value}>
      {children}
    </EngageKitContext.Provider>
  );
};
