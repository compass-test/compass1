import React from 'react';

import { parsePageProps } from './parsePageProps';
import { PageCommonProps, EMBEDDED_CONFLUENCE_MODE } from '../page-common';
import { ViewPage } from '../view-page';

export type PageProps = PageCommonProps & {
  contentId?: string;
  parentProduct?: string;
  url?: string;
};

export const Page: React.FC<PageProps> = (props) => {
  const { mode, ...passThroughProps } = parsePageProps(props);

  if (mode === EMBEDDED_CONFLUENCE_MODE.VIEW_MODE) {
    return <ViewPage {...passThroughProps} />;
  } else {
    // Edit or other components are not yet but soon to be supported
    return null;
  }
};
