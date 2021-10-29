import styled from 'styled-components';

import { N700 } from '@atlaskit/theme/colors';

export const eventWrapperPaddingTop = 2;
export const eventWrapperPaddingLeft = 4;
export const eventWrapperText = {
  fontSize: {
    default: 14,
    min: 11,
  },
  lineHeight: {
    default: 20,
    min: 1,
  },
};

export const ContentWrapper = styled.div<{
  shouldDisplayInline: boolean;
  shouldShrinkTitle: boolean;
  textColor?: string;
}>`
  overflow: hidden;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: left;
  padding-left: ${eventWrapperPaddingLeft}px;
  flex-direction: ${(props) => (props.shouldDisplayInline ? 'row' : 'column')};
  padding-top: ${(props) =>
    props.shouldShrinkTitle ? 0 : eventWrapperPaddingTop}px;
  font-size: ${(props) =>
    props.shouldShrinkTitle
      ? eventWrapperText.fontSize.min
      : eventWrapperText.fontSize.default}px;
  line-height: ${(props) =>
    props.shouldShrinkTitle
      ? eventWrapperText.lineHeight.min
      : eventWrapperText.lineHeight.default}px;
  color: ${(props) => props.textColor || N700};
`;

ContentWrapper.displayName = 'ContentWrapper';

export const TitleWrapper = styled.span<{
  shouldDisplayInline: boolean;
  shouldWrapText: boolean;
  maxHeight: number;
  order: number;
}>`
  font-weight: 600;
  order: ${(props) => props.order};
  ${(props) => !props.shouldDisplayInline && 'overflow: hidden; width: 100%;'}
  ${(props) => props.shouldWrapText && 'white-space: nowrap;'}
  ${(props) =>
    props.maxHeight && `max-height: ${props.maxHeight}px`};
`;

TitleWrapper.displayName = 'TitleWrapper';

export const TimeWrapper = styled.span<{
  shouldDisplayInline: boolean;
  order: number;
}>`
  font-weight: 400;
  white-space: nowrap;
  order: ${(props) => props.order};
  ${(props) => props.order === 1 && 'margin-right:4px'}
  ${(props) => !props.shouldDisplayInline && 'width: 100%;'}
`;
TimeWrapper.displayName = 'TimeWrapper';
