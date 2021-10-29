import styled from '@emotion/styled';

import { heading, text } from '@atlaskit/theme/colors';
import { headingSizes } from '@atlaskit/theme/typography';
import {
  InlineLayout,
  SmallStackLayout,
  SpacingScale,
} from '@atlassian/commerce-layout';

const { h400, h500 } = headingSizes;
const { XXLARGE, LARGEST } = SpacingScale;

/// Layout
export const PaymentMethodBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: stretch;
`;

export const EditButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const PaymentContainer = styled(InlineLayout)`
  align-items: center;
  flex-grow: 1;
`;

export const DetailsContainer = styled(SmallStackLayout)`
  flex: 1 2 ${LARGEST}px;
  align-items: center;
  flex-grow: 1;
`;

export const IconWrapper = styled.div`
  line-height: 0;
  flex: 1 1 ${XXLARGE}px;
  max-width: 60px; // Fixed Value icon image max-width
  min-width: ${XXLARGE}px;

  > svg {
    width: 100%;
    height: auto;
  }
`;

///Text
export const PaymentMethodTitle = styled.div`
  font-size: ${h500.size}px;
  line-height: ${h500.lineHeight}px;
  color: ${heading};
  font-weight: 600;
  display: block;
`;

export const PaymentMethodText = styled.p`
  font-size: ${h400.size}px;
  line-height: ${h400.lineHeight}px;
  color: ${text};
  overflow-wrap: anywhere;
  word-break: break-word; // property set for safari compatibility
  hyphens: auto;
  margin: 0;
`;
