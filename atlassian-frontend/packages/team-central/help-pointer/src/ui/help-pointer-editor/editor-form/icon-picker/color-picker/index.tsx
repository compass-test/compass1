import React from 'react';

import { EmojiProvider } from '@atlaskit/emoji';

import { HelpPointerColors } from '../../../../../common/utils/icon-color';

import HelpPointerColorPickerIcon from './color-picker-emoji';
import { ColorPickerContainer, HelpPointerIconContainer } from './styled';

export type Props = {
  color: string;
  shortName: string;
  onChangeColor: (color: string) => void;
  emojiProvider: Promise<EmojiProvider>;
};

const ColorPicker = (props: Props) => {
  return (
    <ColorPickerContainer>
      {HelpPointerColors.map((tileColor) => (
        <HelpPointerIconContainer
          key={tileColor}
          isSelected={tileColor === props.color}
        >
          <HelpPointerColorPickerIcon
            emojiProvider={props.emojiProvider}
            shortName={props.shortName}
            color={tileColor}
            onClick={() => props.onChangeColor(tileColor)}
          />
        </HelpPointerIconContainer>
      ))}
    </ColorPickerContainer>
  );
};

export default ColorPicker;
