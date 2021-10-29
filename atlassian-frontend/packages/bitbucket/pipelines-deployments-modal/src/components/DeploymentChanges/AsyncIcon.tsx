import React from 'react';

import { AsyncIconImage, AsyncIconPlaceholder } from '../styled';

type Props = {
  url?: string;
  title?: string;
  alt?: string;
  width: number;
  height: number;
};

const AsyncIcon: React.FC<Props> = ({ url, title, alt, width, height }) => {
  const convertSize = (size: number) => (size ? `${size}px` : '0');
  const newWidth = convertSize(width);
  const newHeight = convertSize(height);

  return url ? (
    <AsyncIconImage
      src={url}
      width={newWidth}
      height={newHeight}
      title={title}
      alt={alt}
    />
  ) : (
    <AsyncIconPlaceholder width={newWidth} height={newHeight} />
  );
};

export default React.memo(AsyncIcon);
