import styled from 'styled-components';

import { N200, N50, N90 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const PageWrapper = styled.div`
  padding-top: ${gridSize() * 2}px;
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: ${gridSize() * 2}px;
`;

export const EpicExpandDiv = styled.div`
  display: flex;
  align-items: center;
  padding-top: 30px;
  cursor: pointer;
`;

export const IssueKeyWrapper = styled.div`
  color: ${N90};
  font-size: 12px;
  padding-right: 6px;
  font-weight: 600;
  margin-top: 1px;
  cursor: pointer;
`;

export const EmptySectionWrapper = styled.div`
  color: ${N200};
  border: 2px;
  border-color: ${N50};
  border-radius: 5px;
  border-style: dashed;
  text-align: center;
  padding: 10px;
`;

export const ErrorSectionWrapper = styled(EmptySectionWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;
