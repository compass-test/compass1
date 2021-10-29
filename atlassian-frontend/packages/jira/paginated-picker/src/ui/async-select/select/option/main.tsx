import React from 'react';

import InvalidIcon from '@atlaskit/icon/glyph/jira/failed-build-status';
import { CheckboxOption, OptionProps, OptionType } from '@atlaskit/select';
import { R400 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

import { StyledInvalidCheckboxOption } from '../../../../common/ui/picker/styled';

export const Option = (props: OptionProps<OptionType, true>) => {
  if (props.data?.invalid) {
    return (
      <StyledInvalidCheckboxOption>
        <CheckboxOption {...props} />
        <Tooltip content={props.selectProps.fieldInvalidLabel}>
          <InvalidIcon label="Test" primaryColor={R400} />
        </Tooltip>
      </StyledInvalidCheckboxOption>
    );
  }

  return <CheckboxOption {...props} />;
};
