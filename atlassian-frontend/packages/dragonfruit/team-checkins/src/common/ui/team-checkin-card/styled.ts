import styled from 'styled-components';

import { N400, N800, N900 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h200 } from '@atlaskit/theme/typography';
import { Card } from '@atlassian/dragonfruit-common-ui';

export const CardWrapper = styled.div`
  display: flex;
  align-items: stretch;

  ${Card} {
    flex: 1;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  margin-bottom: ${gridSize() * 3}px;
  justify-content: space-between;
`;

export const HeadingLeft = styled.div`
  display: flex;
`;

export const HeadingRight = styled.div`
  display: flex;
`;

export const Title = styled.div`
  ${h200()};
  color: ${N900};
  font-size: 12px;
  line-height: 16px;
  margin: ${gridSize() * 0.5}px ${gridSize()}px 0px 0px;
`;

export const ActionsWrapper = styled.div`
  margin-left: ${gridSize()}px;
`;

export const BodyWrapper = styled.div`
  color: ${N400};
  display: flex;
  padding-right: ${gridSize() * 0.5}px;
  margin-bottom: ${gridSize() * 1.5}px;
  font-size: 11px;
  line-height: 14px;
`;

export const Body = styled.div`
  line-height: 20px;
  flex: 1;
  font-size: 12px;
  word-break: break-word;
  overflow: hidden;
`;

export const ResponseListWrapper = styled.div`
  & > :not(:last-child) {
    margin-bottom: ${gridSize() * 3}px;
  }
`;

export const ResponseWrapper = styled.div``;

export const Label = styled.p`
  ${h200()};
  color: ${N900};
  font-size: 12px;
  line-height: 16px;
`;

export const Response = styled.p`
  color: ${N800};
  font-size: 14px;
  line-height: 20px;
`;
