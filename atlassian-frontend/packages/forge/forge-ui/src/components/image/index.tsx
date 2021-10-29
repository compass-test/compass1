import React from 'react';
import { ImageProps } from '@atlassian/forge-ui-types';
import { Props } from '..';

export const maxWidths = {
  xsmall: '25%',
  small: '37.5%',
  medium: '50%',
  large: '75%',
  xlarge: '100%',
} as const;

export default function Image({ src, alt, size = 'xlarge' }: ImageProps) {
  const maxWidth = maxWidths[size] || '100%';

  return (
    <img
      style={{
        display: 'block',
        margin: 'auto',
        maxWidth,
        textAlign: 'center',
      }}
      src={src}
      alt={alt}
    />
  );
}

export const ImageFn: React.FunctionComponent<Props> = ({ props }) => {
  const { src, alt, size } = props as ImageProps;
  return <Image src={src} alt={alt} size={size} />;
};
