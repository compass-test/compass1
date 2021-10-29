import styled from 'styled-components';
import { h200 } from '@atlaskit/theme/typography';
import { N100, N200, N900 } from '@atlaskit/theme/colors';

export const Heading = styled.div`
  ${h200()}
  color: ${N200};
  margin-top: 0px;
`;

export const CheckboxDescription = styled.div`
  color: ${N900};
`;

export const CheckboxExtendedDescription = styled.div`
  color: ${N100};
  font-size: 11px;
`;

export const CheckboxItem = styled.div`
  padding-top: ${(props) => (props.theme === 'MODAL' ? '12px' : '6px')};
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Container = styled.div`
  padding-top: 26px;
`;

export const SlideAnimationWrapper = styled.div`
  overflow: hidden;
`;
