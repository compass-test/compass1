import React from 'react';

type ExperienceContextValue = string | undefined;

const defaultExperienceContextValue: ExperienceContextValue = undefined;

export const ExperienceContext = React.createContext<ExperienceContextValue>(
  defaultExperienceContextValue,
);
