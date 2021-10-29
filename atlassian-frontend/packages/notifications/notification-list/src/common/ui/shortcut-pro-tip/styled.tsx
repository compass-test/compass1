import styled from '@emotion/styled';

import Button from '@atlaskit/button';
import { N20, N200, N30A, N800 } from '@atlaskit/theme/colors';

export const ProTipContainer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 25px;
  border: 1px solid ${N30A};
  border-radius: 3px;
  padding: 14px 16px;
  color: ${N200};
`;

export const Header = styled.h4<{ mixin: any }>`
  ${(props) => props.mixin()};
`;

export const ShortcutKey = styled.kbd`
  background: ${N20};
  border-radius: 2px;
  text-align: center;
  color: ${N800};
  min-width: 20px;
  min-height: 20px;
  font-family: inherit;
  vertical-align: middle;
  line-height: 20px;
  font-size: 14px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LongShortcutKey = styled(ShortcutKey)`
  padding: 0px 3px;
`;

export const ProTipText = styled.p`
  display: flex;
  align-items: center;
  color: ${N800};
`;

export const ToggleDialogButton = styled(Button)`
  font-weight: 400;
  margin-left: 6px;
`;

export const ProTipKeys = styled.span`
  margin: 0 4px;

  display: flex;
  gap: 4px;
`;
