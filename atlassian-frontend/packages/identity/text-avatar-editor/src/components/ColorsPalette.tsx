import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Color from './Color';
import { ColorPaletteWrapper } from './styled';
import { PaletteColor } from './types';

export interface Props {
  palette: PaletteColor[];
  selectedColor: string;
  onChange: (colorHexValue: string) => void;
}

const ColorPalette = (props: Props & InjectedIntlProps) => {
  const { palette, onChange, selectedColor } = props;

  return (
    <ColorPaletteWrapper key={`row-first-color-${palette[0].value}`}>
      {palette.map(({ value, label }) => (
        <Color
          key={value}
          value={value}
          label={label}
          onChange={onChange}
          isSelected={value === selectedColor}
        />
      ))}
    </ColorPaletteWrapper>
  );
};

export default injectIntl(ColorPalette);
