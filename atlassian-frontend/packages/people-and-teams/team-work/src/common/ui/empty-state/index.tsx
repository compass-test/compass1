import React, { ReactNode } from 'react';

import {
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateContainer,
  EmptyStateDescription,
  EmptyStateImage,
  EmptyStateImageContainer,
  EmptyStateTitle,
} from './styled';
import type { EmptyStateContainerProps } from './types';

export type EmptyStateProps = {
  title: ReactNode;
  description?: ReactNode;
  image?: ReactNode;
  imageUrl?: string;
  actions?: ReactNode;
  testId?: string;
} & EmptyStateContainerProps;

export function CompactEmptyState({
  title,
  description,
  image,
  imageUrl,
  actions,
  py,
  px,
  testId,
}: EmptyStateProps) {
  let img;

  if (image) {
    img = image;
  }

  if (imageUrl) {
    img = <EmptyStateImage src={imageUrl} />;
  }

  return (
    <EmptyStateContainer py={py} px={px} data-testid={testId}>
      {img && <EmptyStateImageContainer>{img}</EmptyStateImageContainer>}

      <EmptyStateBody>
        <EmptyStateTitle>{title}</EmptyStateTitle>

        {description && (
          <EmptyStateDescription>{description}</EmptyStateDescription>
        )}

        {actions && <EmptyStateActions>{actions}</EmptyStateActions>}
      </EmptyStateBody>
    </EmptyStateContainer>
  );
}

export default CompactEmptyState;
