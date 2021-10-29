import React from 'react';

import { AVATAR_DIMENSIONS } from './constants';
import { AvatarPreviewCanvas, AvatarPreviewWrapper } from './styled';
import { AvatarCanvas } from './types';
import { useAvatarCanvas } from './useAvatarImage';

const Preview = (props: AvatarCanvas) => {
  const canvasRef = useAvatarCanvas(props);

  return (
    <AvatarPreviewWrapper>
      <AvatarPreviewCanvas
        width={AVATAR_DIMENSIONS}
        height={AVATAR_DIMENSIONS}
        innerRef={canvasRef}
      />
    </AvatarPreviewWrapper>
  );
};

export default Preview;
