import styled from '@emotion/styled';

import { N20 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

const Skeleton = styled.div`
  display: inline-block;
  background-color: ${N20};
  font-size: ${headingSizes.h200.size / fontSize()}em;
  border-radius: 3px;
`;

export const BlockSkeleton = styled.div`
  margin-top: ${gridSize()}px;
`;

export const LabelSkeleton = styled(Skeleton)`
  width: 98px;
  margin-bottom: ${gridSize() / 2}px;
`;

export const BigLabelSkeleton = styled(LabelSkeleton)`
  margin-top: ${gridSize() / 2}px;
  margin-bottom: ${gridSize()}px;
`;

export const FieldSkeleton = styled(Skeleton)`
  width: 100%;
  padding: ${gridSize() + 2}px 0;
  margin: 0;
  box-sizing: border-box;
  border: 2px solid transparent;

  font-size: ${fontSize()}px;
  line-height: 1.2em;
`;
