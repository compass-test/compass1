import React, {
  ComponentType,
  useMemo,
  createContext,
  useContext,
  ReactNode,
} from 'react';
import noop from 'lodash/noop';

import { UrlData } from '../../types';

const UrlContext = createContext({
  serviceDeskBaseUrl: '',
  opsgenieBaseUrl: '',
  projectId: '',
  onTaskComplete: noop,
} as UrlData);

export const UrlDataProvider: ComponentType<
  UrlData & {
    children: ReactNode;
  }
> = ({
  serviceDeskBaseUrl,
  opsgenieBaseUrl,
  projectId,
  projectKey,
  onTaskComplete,
  onSpaRedirect,
  children,
  onOpenInProductHelpArticle,
  product,
}) => {
  const value = useMemo(
    () => ({
      serviceDeskBaseUrl,
      projectId,
      projectKey,
      opsgenieBaseUrl,
      onTaskComplete,
      onSpaRedirect,
      onOpenInProductHelpArticle,
      product,
    }),
    [
      serviceDeskBaseUrl,
      projectId,
      projectKey,
      opsgenieBaseUrl,
      onTaskComplete,
      onSpaRedirect,
      onOpenInProductHelpArticle,
      product,
    ],
  );

  return <UrlContext.Provider value={value}>{children}</UrlContext.Provider>;
};

export const useUrlData = (): UrlData => useContext(UrlContext);
