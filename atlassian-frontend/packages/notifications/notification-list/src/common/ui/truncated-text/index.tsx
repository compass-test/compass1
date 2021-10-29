import React from 'react';

import Dotdotdot from 'react-dotdotdot';

import { BodyText } from './styled';

type TruncatedTypeProps = {
  text: string;
  clamp?: number;
};

export function TruncatedText({ clamp = 2, text }: TruncatedTypeProps) {
  return (
    /**
     * Do not use native clamp as it is not supported in all browsers and
     * uses deprecated css properties.
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-line-clamp
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/box-orient
     */
    <Dotdotdot clamp={clamp} useNativeClamp={false}>
      <BodyText>{text}</BodyText>
    </Dotdotdot>
  );
}
