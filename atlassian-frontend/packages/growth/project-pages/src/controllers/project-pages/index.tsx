import React, { useContext } from 'react';
import { defaultLocale } from '../../common/constants/supported-locales';
import { ProjectPagesContextTypes } from './types';
export type { ProjectPagesContextTypes } from './types';

const ProjectPagesContext = React.createContext<ProjectPagesContextTypes>({
  locale: defaultLocale,
  cloudId: '',
});

export const useProjectPages = () => useContext(ProjectPagesContext);
export const ProjectPagesProvider = ProjectPagesContext.Provider;
