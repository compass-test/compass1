import React, { useCallback, useEffect, useState } from 'react';

import {
  Emoji,
  EmojiDescription,
  EmojiProvider,
  OptionalEmojiDescription,
} from '@atlaskit/emoji';

import { ColorEmojiContainer, sizeMap } from './styled';

export type Props = {
  color: string;
  shortName: string;
  onClick?: () => void;
  emojiProvider: Promise<EmojiProvider>;
};

const ColorPickerIcon = (props: Props) => {
  const { shortName, color, onClick } = props;

  const [emoji, setEmoji] = useState<OptionalEmojiDescription>(undefined);
  useEffect(() => {
    (async () => {
      const provider = await props.emojiProvider;
      const resolvedEmoji = await provider.findByEmojiId({ shortName });
      setEmoji(resolvedEmoji);
    })();
  }, [shortName, props.emojiProvider]);

  const ResolvedEmojiComponent = useCallback(
    () =>
      (emoji && (
        <Emoji
          emoji={emoji as EmojiDescription}
          fitToHeight={sizeMap.large.emojiSize}
        />
      )) || <div />,
    [emoji],
  );

  return (
    <ColorEmojiContainer
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      size={'large'}
      color={color}
    >
      <ResolvedEmojiComponent />
    </ColorEmojiContainer>
  );
};

export default ColorPickerIcon;
