import React, { FunctionComponent } from 'react';
import {
  IconWrapper,
  LabelWrapper,
  FilterColLabelText,
} from '../filter-item/filter-item.styled';

export interface Props {
  /**
   * The icon to show before the text.
   */
  icon?: JSX.Element;
  /**
   * The display text of the item
   */
  label: JSX.Element | string;
}

export const FilterShowMoreItem: FunctionComponent<Props> = ({
  label,
  icon,
  ...rest
}) => {
  return (
    <LabelWrapper {...rest}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <FilterColLabelText>{label}</FilterColLabelText>
    </LabelWrapper>
  );
};
