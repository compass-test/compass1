import React from 'react';
import styled from 'styled-components';
import { gridSize, borderRadius } from '@atlaskit/theme/constants';
import { skeleton } from '@atlaskit/theme/colors';
import Document16Icon from '@atlaskit/icon-file-type/glyph/document/16';

export const SpaceIcon = styled.div<{ iconPath: string }>`
  background-image: url(${(props) => props.iconPath});
  background-color: ${skeleton()};
  background-size: contain;
  height: ${gridSize() * 2}px;
  width: ${gridSize() * 2}px;
  border-radius: ${borderRadius()}px;
`;

export const PageIcon = () => <Document16Icon label="Page" />;
