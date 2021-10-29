import React, { useContext } from 'react';

import { FlagProps } from '../../common/types';

export type FlagsContextType = {
  showFlag: (props: FlagProps) => () => void;
};

export const FlagsContext = React.createContext<FlagsContextType>({
  showFlag: () => {
    throw new Error('FlagsProvider is missing from react component hierarchy');
  },
});

export const useFlags = (): FlagsContextType => {
  const { showFlag } = useContext(FlagsContext);

  return { showFlag };
};
