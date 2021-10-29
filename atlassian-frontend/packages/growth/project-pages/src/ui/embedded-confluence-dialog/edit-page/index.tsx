import React from 'react';
import { EditPage } from '@atlassian/embedded-confluence';
import { PageDialogProps } from '../types';

export const EditPageDialog = ({
  contentId,
  spaceKey,
  parentProduct,
  navigationPolicy,
}: PageDialogProps) => (
  <EditPage
    contentId={contentId}
    spaceKey={spaceKey}
    parentProduct={parentProduct}
    navigationPolicy={navigationPolicy}
  />
);
