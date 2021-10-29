/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';
import EmptyState from '@atlaskit/empty-state';

type NotFoundProps = {
  header: string;
  description: string;
  imageUrl: string | undefined;
};

export const NotFound: React.FC<NotFoundProps> = ({
  header,
  description,
  imageUrl,
}) => {
  return (
    <EmptyState header={header} description={description} imageUrl={imageUrl} />
  );
};
