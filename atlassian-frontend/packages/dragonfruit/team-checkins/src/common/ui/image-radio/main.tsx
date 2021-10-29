import React from 'react';

import {
  ImageWrapper,
  LabelWrapper,
  RadioDisplay,
  RadioWrapper,
} from './styled';

interface ImageRadioProps {
  name: string;
  image: JSX.Element;
  value: string;
  currentValue?: string;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
}

export const ImageRadio: React.FC<ImageRadioProps> = ({
  name,
  image,
  value,
  currentValue,
  label,
  onChange,
  testId,
}) => {
  const props = {
    ...(testId && {
      'data-testid': testId,
    }),
  };

  const inputProps = {
    name,
    value,
    onChange,
    ...(value === currentValue && {
      checked: true,
    }),
    ...(testId && {
      'data-testid': `${testId}.input`,
    }),
  };

  const clickAreaProps = {
    ...(testId && {
      'data-testid': `${testId}.click-area`,
    }),
  };

  return (
    <RadioWrapper {...props}>
      <input type="radio" {...inputProps} />
      <RadioDisplay {...clickAreaProps}>
        <ImageWrapper>{image}</ImageWrapper>
        {label && <LabelWrapper>{label}</LabelWrapper>}
      </RadioDisplay>
    </RadioWrapper>
  );
};
