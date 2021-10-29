import React from 'react';
import { ViewPage } from '@atlassian/embedded-confluence';

import { PageDialogProps } from '../types';

export const ViewPageDialog = ({
  contentId,
  spaceKey,
  parentProduct,
  navigationPolicy,
}: PageDialogProps) => {
  return (
    <ViewPage
      contentId={contentId}
      parentProduct={parentProduct}
      spaceKey={spaceKey}
      navigationPolicy={navigationPolicy}
      hasByLineContributors
      hasByLineExtensions
      hasFooterLogo={false}
      hasComments
      showDelete
      showEdit
    />
  );
};
