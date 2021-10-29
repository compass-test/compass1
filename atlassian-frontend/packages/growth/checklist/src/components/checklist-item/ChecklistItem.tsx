// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';
import {
  checklistClosedIndicator,
  checklistDescriptionWrapper,
  ChecklistTitleWrapper,
  ChecklistTaskDoneIndicator,
  ChecklistTitle,
} from './styled';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import ChevronRightLargeIcon from '@atlaskit/icon/glyph/chevron-right-large';

const ANIMATION_DURATION = 200;
const ClosedIndicator = checklistClosedIndicator(ANIMATION_DURATION);
const ChecklistDescriptionWrapper = checklistDescriptionWrapper(
  ANIMATION_DURATION,
);

export interface Task {
  id: string;
  completed: boolean;
  title?: string;
  maxHeight?: number;
  children?: JSX.Element;
}

export default ({ completed, title, children, maxHeight }: Task) => (
  <>
    <ChecklistTitleWrapper>
      <ChecklistTaskDoneIndicator done={completed}>
        <CheckCircleIcon label="checked" />
      </ChecklistTaskDoneIndicator>
      <ChecklistTitle>{title}</ChecklistTitle>
      <ClosedIndicator>
        <ChevronRightLargeIcon label="chevron" />
      </ClosedIndicator>
    </ChecklistTitleWrapper>
    <ChecklistDescriptionWrapper maxHeight={maxHeight}>
      {children}
    </ChecklistDescriptionWrapper>
  </>
);
