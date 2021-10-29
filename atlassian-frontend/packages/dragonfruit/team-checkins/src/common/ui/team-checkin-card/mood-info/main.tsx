import React from 'react';

import { MoodAsEmoji } from './emoji';
import { MoodAsLozenge } from './lozenge';
import { EmojiWrapper, LozengeWrapper, MoodInfoWrapper } from './styled';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  mood: number;
}

function MoodInfo({ testId = 'mood-info', mood }: Props) {
  const emojiTestId = testId && `${testId}.emoji`;
  const lozengeTestId = testId && `${testId}.lozenge`;

  return (
    <MoodInfoWrapper data-testid={testId}>
      <EmojiWrapper>
        <MoodAsEmoji mood={mood} testId={emojiTestId} />
      </EmojiWrapper>
      <LozengeWrapper>
        <MoodAsLozenge mood={mood} testId={lozengeTestId} />
      </LozengeWrapper>
    </MoodInfoWrapper>
  );
}

export default MoodInfo;
