import React from 'react';

import styled from 'styled-components';

import MenuExpandIcon from '@atlaskit/icon/glyph/menu-expand';
import { B300, N80 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';

interface DragHandleProps {
  tooltipMsg: string | React.ReactNode;
}

export const DragHandle: React.FC<DragHandleProps> = ({ tooltipMsg }) => {
  return (
    <DragHandleWrapper>
      <Tooltip content={tooltipMsg} mousePosition="top">
        <MenuExpandIcon label="Drag Icon" />
      </Tooltip>
    </DragHandleWrapper>
  );
};

const DragHandleWrapper = styled.div`
  position: absolute;
  left: -35px;
  box-shadow: 2px 2px 3px ${N80};
  line-height: 0;
  border-radius: 3px;
  border: 1px solid ${B300};
`;
