import React from 'react';

import Tooltip from '@atlaskit/tooltip';

import { TagSelectOption } from '../../../types';
import { HashTag } from '../../ui/hash-tag';
import { PickerTagByline, TooltipContentsWrapper } from '../../ui/styled';
import { getUsageText } from '../usage';

export const formatLabelOption = (
  option: TagSelectOption,
  { context }: { context: string },
) => {
  if (context === 'value') {
    return option.label;
  } else if (option.__isNew__) {
    return (
      <TooltipContentsWrapper>
        <span>
          Create a new <HashTag label={option.value} /> tag
        </span>
      </TooltipContentsWrapper>
    );
  } else if (option.usage === undefined) {
    return (
      <TooltipContentsWrapper>
        <HashTag label={option.label} />
      </TooltipContentsWrapper>
    );
  }

  const usage = getUsageText(option.usage);
  return (
    <TooltipContentsWrapper>
      <HashTag label={option.label} />
      <Tooltip content={usage.toolTipContent}>
        <PickerTagByline>{usage.optionText}</PickerTagByline>
      </Tooltip>
    </TooltipContentsWrapper>
  );
};
