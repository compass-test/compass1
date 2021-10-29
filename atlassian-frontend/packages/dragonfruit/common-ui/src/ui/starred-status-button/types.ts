import { ButtonProps } from '@atlaskit/button';
import { GlyphProps } from '@atlaskit/icon';

export type Props = {
  isStarred: boolean;
  onClick: () => void;
} & Pick<ButtonProps, 'appearance'> &
  Pick<GlyphProps, 'size'>;
