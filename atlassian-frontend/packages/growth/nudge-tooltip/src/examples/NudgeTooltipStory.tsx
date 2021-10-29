import React from 'react';
import { NudgeTooltip } from '..';
import { FlexWrapper } from './HelperComponents';
import { action } from '@storybook/addon-actions';
import { MarginPaddingInner } from './HelperComponents';
import { radios, select, number, text } from '@storybook/addon-knobs';

export const NudgeTooltipStory = () => {
  const hidden = radios('Force Hidden', { Yes: '1', No: '0' }, '0') === '1';

  const minReadTime = number('Min. Read Time', 4800, {
    range: true,
    min: 0,
    max: 20000,
    step: 1000,
  });

  const hasMargin = radios('Extra Margin', { Yes: '1', No: '0' }, '1') === '1';

  const hasPadding =
    radios('Extra Padding', { Yes: '1', No: '0' }, '0') === '1';

  const hideTooltipOnClick =
    radios('Hide Tooltip on Click', { Yes: '1', No: '0' }, '1') === '1';

  const position = select(
    'Placement',
    [
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-start',
      'bottom',
      'bottom-end',
      'left-start',
      'left',
      'left-end',
    ],
    'bottom',
  );

  const content = text('Tooltip content', 'Wooo hooo');

  return (
    <FlexWrapper>
      <NudgeTooltip
        content={content}
        onShow={action('tooltip shown')}
        onHide={action('tooltip hidden')}
        onClick={action('tooltip target clicked')}
        hideTooltipOnClick={hideTooltipOnClick}
        position={position}
        hidden={hidden}
        minReadTime={minReadTime}
      >
        <MarginPaddingInner
          hasPadding={hasPadding}
          hasMargin={hasMargin}
          onClick={action('wrapped component clicked')}
        >
          Nudge Tooltip Target
        </MarginPaddingInner>
      </NudgeTooltip>
    </FlexWrapper>
  );
};
