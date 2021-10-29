import React from 'react';

import { FormattedMessage } from 'react-intl';

import { Category, Plan } from '../../../common/types';
import {
  StyledCategoryRow,
  StyledCategoryRowCell,
} from '../../../common/ui/styled';

interface CategoryCellProps {
  plan: Plan;
  highlightedPlan?: Plan;
  isLastCol?: boolean;
}

const CategoryCell: React.FC<CategoryCellProps> = ({
  plan,
  highlightedPlan,
  isLastCol,
}) => {
  const isHighlighted = plan === highlightedPlan;

  return (
    <StyledCategoryRowCell
      isHighlighted={isHighlighted}
      isLastCol={isLastCol}
    ></StyledCategoryRowCell>
  );
};

interface CategoryRowProps {
  category: Category;
  highlightedPlan?: Plan;
}

export const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  highlightedPlan,
}) => {
  return (
    <StyledCategoryRow>
      <StyledCategoryRowCell isFirstCol={true}>
        <FormattedMessage {...category.name} />
      </StyledCategoryRowCell>
      {Object.values(Plan).map((plan, index) => (
        <CategoryCell
          plan={plan}
          highlightedPlan={highlightedPlan}
          isLastCol={index === Object.values(Plan).length - 1}
        />
      ))}
    </StyledCategoryRow>
  );
};

export default CategoryRow;
