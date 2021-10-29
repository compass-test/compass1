import React, { useCallback } from 'react';
import {
  IconWrapper,
  LabelWrapper,
  CheckboxWrapper,
} from './filter-item.styled';
import { grid } from '../../style-utils';
import { Checkbox } from '@atlaskit/checkbox';
import { css } from '@emotion/core';
export interface Props {
  /**
   * The icons of the filter.
   */
  icon?: JSX.Element;
  /**
   * The value of the filter that will be passed back through the `onChange` callback.
   */
  value: string;
  /**
   * The display text of the filter.
   */
  label: string;
  /**
   * Whether the filter is checked by default, this will only affect the state of the filter on mount.
   * This will only be used if the component is used not controlled (see \`isChecked\`).
   */
  defaultChecked?: boolean;
  /**
   * Whether the filter is checked or not.
   * If this is provided then the component is considered \`controlled\` and will not internally track the state of the filter.
   */
  isChecked?: boolean;
  /**
   * A callback that is called when the filter is selected / unselected. The value here is the same value as the \`value\` prop.
   */
  onChange?: (value: string, isChecked: boolean) => void;
  /**
   * A flag to determine if the checkbox is disabled
   */
  isDisabled?: boolean;
  /**
   * A react element to wrap the label text
   */
  LabelComponent: React.ElementType;
}

const FilterItem: React.FunctionComponent<Props> = ({
  value,
  onChange,
  label,
  isDisabled = false,
  icon,
  LabelComponent,
  ...rest
}) => {
  const onChangeCallback = useCallback(
    (e) => {
      onChange?.(e.target.value, e.target.checked);
    },
    [onChange],
  );

  return (
    <CheckboxWrapper>
      <Checkbox
        {...rest}
        value={value}
        onChange={onChangeCallback}
        // Target the svg to move to the left and down
        css={css`
          & + svg {
            margin: 2px 0 0 -${grid.multiple(0.5).px};
          }
        `}
        isDisabled={isDisabled}
        label={
          <LabelWrapper>
            {icon && <IconWrapper>{icon}</IconWrapper>}
            <LabelComponent>{label}</LabelComponent>
          </LabelWrapper>
        }
      />
    </CheckboxWrapper>
  );
};

export default React.memo(FilterItem);
