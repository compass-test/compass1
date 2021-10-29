import React, { createContext, useContext, useState } from 'react';

export interface NavContext {
  next: () => void;
  back: () => void;
  pageComponent: React.ComponentType<any>;
}

type Props = {
  initialSteps: React.ComponentType<any>[];
};

const context = createContext<NavContext>({} as any);

export function useNav() {
  return useContext(context);
}

export const NavProvider: React.FC<Props> = ({ initialSteps, children }) => {
  const [steps] = useState(initialSteps);
  const [current, setCurrent] = useState(0);

  return (
    <context.Provider
      value={{
        next: () => {
          const newCurrent = current + 1;
          if (newCurrent < steps.length) {
            setCurrent(newCurrent);
          }
        },
        back: () => {
          const newCurrent = current - 1;
          if (newCurrent >= 0) {
            setCurrent(newCurrent);
          }
        },
        pageComponent: steps[current],
      }}
      children={children}
    />
  );
};

export default NavProvider;
