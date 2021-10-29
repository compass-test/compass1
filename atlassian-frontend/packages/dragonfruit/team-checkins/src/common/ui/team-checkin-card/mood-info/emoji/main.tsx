import React from 'react';

import { useIntl } from '@atlassian/dragonfruit-utils';

import { Bad, Good, Great, NotGreat, Ok } from '../../../assets';
import messages from '../messages';
import { Emoji } from '../styled';

interface Props {
  /**
   * A `testId` prop is provided for specified elements, which is a unique
   * string that appears as a data attribute `data-testid` in the rendered code,
   * serving as a hook for automated tests */
  testId?: string;
  mood: number;
}

const EmojiSrc = (mood: number) => {
  switch (mood) {
    case 1:
      return Bad;
    case 2:
      return NotGreat;
    case 3:
      return Ok;
    case 4:
      return Good;
    case 5:
      return Great;
  }
};

const EmojiAltText = (mood: number) => {
  const { formatMessage } = useIntl();

  switch (mood) {
    case 1:
      return formatMessage(messages.bad);
    case 2:
      return formatMessage(messages.notGreat);
    case 3:
      return formatMessage(messages.ok);
    case 4:
      return formatMessage(messages.good);
    case 5:
      return formatMessage(messages.great);
  }
};

const MoodAsEmoji = ({ testId = 'emoji', mood }: Props) => {
  const emojiTestId = testId && `${testId}-${mood}`;
  const emojiSrc = EmojiSrc(mood);
  const emojiAltText = EmojiAltText(mood);

  return <Emoji src={emojiSrc} alt={emojiAltText} data-testid={emojiTestId} />;
};

export default MoodAsEmoji;
