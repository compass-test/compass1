import React, { forwardRef } from 'react';

import styled from 'styled-components';

import { PopupComponentProps } from '@atlaskit/popup/types';
import { N0, N50A, N60A } from '@atlaskit/theme/colors';
import { borderRadius, layers } from '@atlaskit/theme/constants';

export const Trigger = styled.div<{
  top: number;
  left: number;
  width: number;
}>`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
`;

Trigger.displayName = 'Trigger';

// These styles are copied from @atlaskit/popup's container styles
const StyledPopupComponent = styled.div`
  background-color: ${N0};
  border-radius: ${borderRadius()}px;
  box-shadow: 0 4px 8px 0 ${N50A}, 0 0 1px 0 ${N60A};
  box-sizing: border-box;
  display: block;
  flex: 1 1 auto;
  overflow: auto;
  z-index: ${layers.layer()};
  &:focus {
    outline: none;
  }
`;

export const PopupComponentWithDropShadow = forwardRef<
  HTMLDivElement,
  PopupComponentProps
>(
  // styled-components has a very permissive type saying that _any_ DOM element could be
  // set as the inner ref (which sort of makes sense because of the .withComponent(type) function)
  // but in this case it'll never not be a div because we don't use that tomfoolery!
  // @ts-expect-error: incorrect innerRef typing
  (props, ref) => <StyledPopupComponent {...props} innerRef={ref} />,
);
