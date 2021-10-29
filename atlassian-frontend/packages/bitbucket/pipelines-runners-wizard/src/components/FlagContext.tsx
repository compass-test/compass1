import React, { useState } from 'react';

interface FlagsInterface {
  windowsEnabled: boolean;
}

const FlagContext = React.createContext<FlagsInterface>({
  windowsEnabled: false,
});

type FlagProviderProps = {
  initialFlags: any;
  children: any;
};

export const FlagProvider = (props: FlagProviderProps) => {
  const [flags] = useState(props.initialFlags);

  return (
    <FlagContext.Provider value={flags}>{props.children}</FlagContext.Provider>
  );
};
export default FlagContext;
