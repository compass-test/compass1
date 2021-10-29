import React from 'react';

import Button from '@atlaskit/button';
import EmojiPicker, { EmojiId, EmojiProvider } from '@atlaskit/emoji';
import EmojiEmojiIcon from '@atlaskit/icon/glyph/emoji/emoji';
import { Popup } from '@atlaskit/popup';

import HelpPointerColorPicker from './color-picker';
import {
  DisabledCursorWrapper,
  EmojiPickerDiv,
  HelpPointerColorWrapper,
  SmileySpan,
} from './styled';

type Props = {
  isDisabled?: boolean;
  color: string;
  onChangeColor: (color: string) => void;
  iconEmoji: Omit<EmojiId, 'fallback'>;
  onChangeEmoji: (emoji: Omit<EmojiId, 'fallback'>) => void;
  isEmojiPickerOpen: boolean;
  setIsEmojiPickerOpen: (isOpen: boolean) => void;
  emojiProvider: Promise<EmojiProvider>;
};

export default (props: Props) => {
  return (
    <DisabledCursorWrapper isDisabled={!!props.isDisabled}>
      <HelpPointerColorWrapper isDisabled={!!props.isDisabled}>
        <HelpPointerColorPicker
          color={props.color}
          onChangeColor={props.onChangeColor}
          shortName={props.iconEmoji.shortName}
          emojiProvider={props.emojiProvider}
        />
        <Popup
          zIndex={510}
          isOpen={props.isEmojiPickerOpen}
          onClose={() => props.setIsEmojiPickerOpen(false)}
          placement="bottom"
          content={() => (
            <EmojiPickerDiv>
              <EmojiPicker
                emojiProvider={props.emojiProvider}
                onSelection={props.onChangeEmoji}
              />
            </EmojiPickerDiv>
          )}
          trigger={(triggerProps) => (
            <Button
              {...triggerProps}
              isSelected={props.isEmojiPickerOpen}
              onClick={() =>
                props.setIsEmojiPickerOpen(!props.isEmojiPickerOpen)
              }
              shouldFitContainer
            >
              <SmileySpan>
                <EmojiEmojiIcon label={'change-emoji-button-icon'} />
              </SmileySpan>
              Change emoji
            </Button>
          )}
        />
      </HelpPointerColorWrapper>
    </DisabledCursorWrapper>
  );
};
