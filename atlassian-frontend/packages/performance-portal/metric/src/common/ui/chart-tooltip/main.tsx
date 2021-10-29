import React from 'react';

import {
  ContentContainer,
  HighlightedContentContainer,
  TooltipContainer,
} from './styled';
import { Props } from './types';

export const ChartTooltip = ({ highlightedContent, children }: Props) => {
  return (
    <TooltipContainer>
      {highlightedContent && (
        <HighlightedContentContainer>
          {highlightedContent}
        </HighlightedContentContainer>
      )}
      <ContentContainer>{children}</ContentContainer>
    </TooltipContainer>
  );
};
