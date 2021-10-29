import React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import TableTree, { Headers, Header, Row, Cell } from '@atlaskit/table-tree';
import messages from './messages';
import styled from 'styled-components';
import { N20 } from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';
import { useFeatureFlags } from '../../../../controllers/feature-flags';

interface SkeletonProps {
  minWidth: number;
  height: number;
  widthPercent?: number;
}

const Skeleton = styled.span<SkeletonProps>`
  display: inline-block;
  min-width: ${(props) => props.minWidth}px;
  min-height: ${(props) => props.height}px;
  background-color: ${N20};
  border-radius: 2px;
  margin-right: ${gridSize()}px;
  align-self: center;
  ${(props) => (props.widthPercent ? `width: ${props.widthPercent}%;` : '')}
`;

// FIXME this feels really HAX
const Wrapper = styled.div`
  [role='gridcell'] {
    flex-grow: 1;
    align-self: center;
    > span {
      display: flex;
      width: 100%;
      min-height: 24px;
    }
  }

  [role='row']:nth-of-type(2) {
    border-bottom: 0;
  }
`;

const TreeEmptyState = ({ intl: { formatMessage } }: InjectedIntlProps) => {
  const {
    isProjectPagesProductionisation: hideEmptyPageTree,
  } = useFeatureFlags();
  return hideEmptyPageTree ? null : (
    <Wrapper>
      <TableTree>
        <Headers>
          <Header width="55%">{formatMessage(messages.pageName)}</Header>
          <Header width="25%">{formatMessage(messages.contributors)}</Header>
          <Header width="20%">{formatMessage(messages.lastModified)}</Header>
        </Headers>
        <Row>
          <Cell>
            <Skeleton minWidth={100} height={12} widthPercent={70} />
          </Cell>
          <Cell>
            <Skeleton minWidth={24} height={24} />
            <Skeleton minWidth={40} height={12} widthPercent={50} />
          </Cell>
          <Cell>
            <Skeleton minWidth={50} height={12} widthPercent={70} />
          </Cell>
        </Row>
      </TableTree>
    </Wrapper>
  );
};

export default injectIntl(TreeEmptyState);
