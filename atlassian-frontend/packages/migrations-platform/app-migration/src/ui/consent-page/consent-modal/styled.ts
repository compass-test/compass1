import styled from 'styled-components';

import { sizes } from '@atlaskit/icon';
import { B200, DN200, N0, N20 } from '@atlaskit/theme/colors';
import {
  borderRadius,
  fontSizeSmall,
  gridSize,
} from '@atlaskit/theme/constants';

const small = gridSize() * 2;
const medium = gridSize() * 3;
const large = gridSize() * 4;

export const Wrapper = styled.div`
  padding: 0px ${large}px ${small}px;
`;

export const Heading = styled.h4`
  padding: ${medium}px ${gridSize()}px;
`;

export const TermsWrapper = styled.div`
  background: ${N20};
  margin: ${small}px -${medium}px 0;
  padding: ${gridSize()}px ${large}px;
  font-size: ${fontSizeSmall()}px;
`;

export const VendorWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const VendorDescription = styled.div`
  color: ${DN200};
  font-size: ${fontSizeSmall()}px;
`;

export const VendorTop = styled.div`
  display: flex;
  align-items: center;
`;

export const VendorTopIcon = styled.div`
  color: ${N0};
  background: ${B200};
  border-radius: 50%;
  margin-left: ${gridSize()}px;
  margin-right: ${gridSize() / 2}px;
  display: flex;
  padding: 2px;
`;

export const VendorInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const Description = styled.p`
  margin-top: ${medium}px;
`;

export const ScopeList = styled.ul`
  padding-left: ${small}px;
`;

export const Image = styled.img`
  width: ${sizes.xlarge};
  height: ${sizes.xlarge};
  border-radius: ${borderRadius()}px;
  margin-right: ${small}px;
`;

export const ButtonWrapper = styled.div`
  padding: ${medium}px 0;
  display: flex;
  justify-content: flex-end;
`;
