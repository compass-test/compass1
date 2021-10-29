import React, { useEffect, useState } from 'react';

import { EmojiProvider, OptionalEmojiDescription } from '@atlaskit/emoji';

import { HelpPointerCard, HelpPointerCardProps } from '../../index';

import { Wrapper } from './styled';
import { HelpPointerGridProps } from './types';

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

const HelpPointerList = (props: HelpPointerGridProps) => {
  const {
    testId,
    helpPointers,
    emojiProvider,
    showOwner,
    maxColumnCount,
    descriptionLineCount,
    renderRemoveModal,
    renderEditModal,
    searchTerms,
    tagClickCallback,
    linkClickCallback,
  } = props;

  return (
    <Wrapper data-testid={testId} maxColumnCount={maxColumnCount || 1}>
      {helpPointers.map((helpPointer) => (
        <ProviderAwareCard
          key={helpPointer.pointerId}
          {...helpPointer}
          testId={`${props.testId}-${helpPointer.name}`}
          showOwner={showOwner}
          descriptionLineCount={descriptionLineCount}
          emojiProvider={emojiProvider}
          renderRemoveModal={renderRemoveModal}
          renderEditModal={renderEditModal}
          searchTerms={searchTerms}
          tagClickCallback={tagClickCallback}
          linkClickCallback={linkClickCallback}
        />
      ))}
    </Wrapper>
  );
};

export default HelpPointerList;
