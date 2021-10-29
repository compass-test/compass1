import styled from '@emotion/styled';

export type Size =
  | 'xxlarge'
  | 'xlarge'
  | 'large'
  | 'medium'
  | 'small'
  | 'xsmall';

type IconStyle = {
  borderRadius: number;
  emojiSize: number;
  iconSize: number;
  lineHeight?: number;
};

type SizeMap = { [size in Size]: IconStyle };

export const sizeMap: SizeMap = {
  xxlarge: {
    iconSize: 96,
    emojiSize: 64,
    borderRadius: 8,
  },
  xlarge: {
    iconSize: 74,
    emojiSize: 50,
    borderRadius: 3,
  },
  large: {
    iconSize: 40,
    emojiSize: 24,
    borderRadius: 3,
  },
  medium: {
    iconSize: 32,
    emojiSize: 20,
    borderRadius: 3,
  },
  small: {
    iconSize: 24,
    emojiSize: 14,
    borderRadius: 3,
    lineHeight: 0,
  },
  xsmall: {
    iconSize: 16,
    emojiSize: 12,
    borderRadius: 3,
  },
};

export const ColorEmojiContainer = styled.button<{ color: string; size: Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: ${(props) => props.color};
  width: ${(props) => sizeMap[props.size].iconSize}px;
  height: ${(props) => sizeMap[props.size].iconSize}px;

  border: none;
  cursor: pointer !important;

  border-radius: ${(props) => sizeMap[props.size].borderRadius}px;
  line-height: ${(props) => sizeMap[props.size].lineHeight};
`;
