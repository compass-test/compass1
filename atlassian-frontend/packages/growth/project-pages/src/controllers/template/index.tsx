import React, { useContext } from 'react';
import { Template, ConfluenceTemplate } from './types';
import { useEffect } from 'react';
import { isConfluenceTemplate } from './utils';

const TemplateContext = React.createContext<Template | undefined>(undefined);

export const useTemplate = () => useContext(TemplateContext);
export const TemplateProvider = TemplateContext.Provider;

export const usePreloadPreviews = (
  templates: Template[],
  isPostExpand: boolean,
) => {
  useEffect(() => {
    templates.filter<ConfluenceTemplate>(isConfluenceTemplate).forEach((t) => {
      const img = new Image();
      img.src = isPostExpand ? t.screenShot.postExpand : t.screenShot.preExpand;
    });
  }, [isPostExpand, templates]);
};
