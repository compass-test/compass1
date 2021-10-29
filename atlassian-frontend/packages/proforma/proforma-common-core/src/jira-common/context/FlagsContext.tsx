import React, {
  ComponentClass,
  createContext,
  FC,
  ReactNode,
  useContext,
} from 'react';

import { Flags } from '../models/Flags';

export const PfFlagsContext = createContext<Flags | undefined>(undefined);

interface PfFlagsProviderProps {
  children: ReactNode;
  flags: Flags;
}

export const PfFlagsProvider: FC<PfFlagsProviderProps> = ({
  children,
  flags,
}) => {
  return (
    <PfFlagsContext.Provider value={flags}>{children}</PfFlagsContext.Provider>
  );
};

export function usePfFlags() {
  const flags = useContext(PfFlagsContext);
  if (flags === undefined) {
    throw new Error('usePfFlags must be used within a PfFlagsProvider');
  }
  return flags;
}

export const withFlags = <C extends ComponentClass>(Component: C): C => {
  return (((props: any) => {
    const flags = usePfFlags();
    return <Component {...props} flags={flags} />;
  }) as any) as C;
};
