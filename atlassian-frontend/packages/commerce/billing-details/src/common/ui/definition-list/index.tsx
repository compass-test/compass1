import React from 'react';

import {
  StackLayout,
  UIScaleExtendedIncrements,
} from '@atlassian/commerce-layout';

import {
  DefinitionDescription,
  DefinitionListContainer,
  DefinitionTerm,
} from './styled';

type DefinitionItem = {
  term: string;
  description: string | JSX.Element;
};

type DefinitionListProps = {
  items: DefinitionItem[];
  listSpacing?: UIScaleExtendedIncrements;
  termSpacing?: UIScaleExtendedIncrements;
};

export const DefinitionList: React.FC<DefinitionListProps> = ({
  listSpacing = 'MEDIUM',
  termSpacing = 'SMALLEST',
  items,
}) => (
  <DefinitionListContainer size={listSpacing}>
    {items.map(({ term, description }, index) => (
      <StackLayout key={`${index}-${term}`} size={termSpacing}>
        <DefinitionTerm>{term}</DefinitionTerm>
        <DefinitionDescription>{description}</DefinitionDescription>
      </StackLayout>
    ))}
  </DefinitionListContainer>
);
