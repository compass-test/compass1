import React, { ReactNode } from 'react';

import { ExperienceContext } from './ExperienceContext';

interface ExperienceProps {
  children: ReactNode;
  name: string;
}

export function Experience({ children, name }: ExperienceProps) {
  return (
    <ExperienceContext.Provider value={name}>
      {children}
    </ExperienceContext.Provider>
  );
}
