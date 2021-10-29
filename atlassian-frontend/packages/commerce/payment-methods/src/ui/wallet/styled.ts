import css from '@emotion/css';
import styled from '@emotion/styled';

import { Radio } from '@atlaskit/radio';
import { N800 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';
import { Panel, stackLayoutFactory } from '@atlassian/commerce-layout';

const { h400 } = headingSizes;

type PaymentMethodsListProps = {
  expanded: boolean;
};

const centerAligned = css`
  align-items: center;
`;

export const WalletPaymentMethodBox = styled.div`
  ${centerAligned}
  ${stackLayoutFactory({
    size: 'MEDIUM',
    direction: 'HORIZONTAL',
  })}
  grid-auto-columns: minmax(min-content, max-content);
`;

export const WalletPaymentMethodPanel = styled(Panel)`
  cursor: pointer;
`;

export const PaymentMethodRadio = styled(Radio)`
  margin: 0;
`;

export const PaymentMethodsList = styled.ul`
  ${stackLayoutFactory({ size: 'MEDIUM' })}
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    margin: 0;
  }
`;

export const MainWalletContainer = styled.div<PaymentMethodsListProps>`
  ${stackLayoutFactory({ size: 'LARGE' })}
  max-height: ${gridSize() * 68}px;
  ${(props) => (props.expanded ? 'overflow-y: auto' : '')};
`;

export const DefaultPaymentMethodCopy = styled.p`
  font-size: ${h400.size}px;
  line-height: ${h400.lineHeight}px;
  color: ${N800};
  margin: 0;
`;

export const RightAligned = styled.div`
  display: flex;
  justify-content: flex-end;
`;
