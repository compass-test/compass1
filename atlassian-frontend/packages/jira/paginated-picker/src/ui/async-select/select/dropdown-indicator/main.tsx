import React from 'react';

import CloseIcon from '@atlaskit/icon/glyph/cross-circle';
import SearchIcon from '@atlaskit/icon/glyph/search';
import { components, IndicatorProps } from '@atlaskit/select';

import { SingleOption } from '../../../../common/types';
import {
  CloseIconWrapper,
  DisplayWrapper,
  DropdownIndicatorWrapper,
} from '../../../../common/ui/picker/styled';

// EM-2028 TODO: We are rendering both icons and hiding them via CSS display rule because
// the Popup component's ref is not correctly updated when this react-select component
// re-renders. i.e. it does not  update the refs when one of these components re-renders.
export const DropdownIndicator = (
  props: IndicatorProps<SingleOption, true>,
) => (
  <components.DropdownIndicator {...props}>
    <DropdownIndicatorWrapper>
      <DisplayWrapper displayFlag={!!props.selectProps.inputValue}>
        <CloseIconWrapper
          onClick={event => {
            event.preventDefault();
            props.selectProps.onInputChange?.('', { action: 'input-change' });
          }}
        >
          <CloseIcon size="small" label="" />
        </CloseIconWrapper>
      </DisplayWrapper>
      <DisplayWrapper displayFlag={!props.selectProps.inputValue}>
        <SearchIcon size="small" label="" />
      </DisplayWrapper>
    </DropdownIndicatorWrapper>
  </components.DropdownIndicator>
);
