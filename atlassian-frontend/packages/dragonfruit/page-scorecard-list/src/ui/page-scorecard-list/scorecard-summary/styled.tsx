import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { h600 } from '@atlaskit/theme/typography';
import { Card } from '@atlassian/dragonfruit-common-ui';

export const CardWrapper = styled.div`
  height: 224px;
  display: flex;
  align-items: stretch;

  ${Card} {
    flex: 1;
  }
`;

export const HeadingWrapper = styled.div`
  display: flex;
  margin-bottom: ${gridSize}px;
  word-break: break-all;
`;

export const Heading = styled.div`
  ${h600}
  margin-top: 0;
  flex: 1;
`;

export const StandardDescriptionWrapper = styled.div`
  color: ${colors.N400};
  display: flex;
  padding-right: ${gridSize() * 0.5}px;
  margin-bottom: ${gridSize() * 1.5}px;
  font-size: 11px;
  line-height: 14px;
`;

export const StandardIconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImportanceDescription = styled.div`
  align-self: center;
  margin-left: ${gridSize() * 0.5}px;
  font-size: 12px;
`;

export const Description = styled.div`
  line-height: 20px;
  flex: 1;
  font-size: 12px;
  word-break: break-word;
  overflow: hidden;
`;

export const FooterWrapper = styled.div<{
  scorecardDetailsPageEnabled?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props && props.scorecardDetailsPageEnabled ? 'space-between' : 'flex-end'};
`;
