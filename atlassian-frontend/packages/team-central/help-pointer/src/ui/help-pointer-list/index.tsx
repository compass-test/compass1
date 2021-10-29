import React, { useEffect, useState } from 'react';

import { EmojiProvider, OptionalEmojiDescription } from '@atlaskit/emoji';

import {
  HelpPointerAppearance,
  HelpPointerCard,
  HelpPointerCardProps,
} from '../../index';

import { HelpPointerListProps } from './types';

const ProviderAwareCard = (
  props: HelpPointerCardProps & { emojiProvider: Promise<EmojiProvider> },
) => {
  const [emoji, setEmoji] = useState<OptionalEmojiDescription>(undefined);

  useEffect(() => {
    (async function () {
      if (props.icon) {
        const provider = await props.emojiProvider;
        const emoji = await provider.findByEmojiId(props.icon);
        setEmoji(emoji);
      }
    })();
  }, [props.icon, props.emojiProvider]);

  return <HelpPointerCard {...props} emojiIcon={emoji} />;
};

const HelpPointerList = (props: HelpPointerListProps) => {
  const {
    testId,
    helpPointers,
    emojiProvider,
    renderRemoveModal,
    renderEditModal,
    linkClickCallback,
  } = props;
  return (
    <div data-testid={testId}>
      {helpPointers.map((helpPointer) => (
        <ProviderAwareCard
          key={helpPointer.pointerId}
          {...helpPointer}
          testId={`${props.testId}-${helpPointer.name}`}
          emojiProvider={emojiProvider}
          renderRemoveModal={renderRemoveModal}
          renderEditModal={renderEditModal}
          appearance={HelpPointerAppearance.borderlessInline}
          linkClickCallback={linkClickCallback}
        />
      ))}
    </div>
  );
};

export default HelpPointerList;
