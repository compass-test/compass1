import styled from '@emotion/styled';

import { N20 } from '@atlaskit/theme/colors';
import { fontSize, gridSize } from '@atlaskit/theme/constants';
import { headingSizes } from '@atlaskit/theme/typography';

import { FormGrid } from '../../../common/ui/FormGrid/styled';

export interface LoadingFormProps {
  visible: boolean;
}

export const LoadingForm = styled(FormGrid)<LoadingFormProps>`
  transition-property: opacity;
  transition-duration: 300ms;
  background-color: white;
  text-align: left;

  opacity: ${({ visible }) => (visible ? 1 : 0)};
  z-index: 1;
  pointer-events: ${({ visible }) => (visible ? 'auto' : 'none')};
`;

const Skeleton = styled.div`
  display: inline-block;
  background-color: ${N20};
  font-size: ${headingSizes.h200.size / fontSize()}em;
  border-radius: 3px;
`;

export const LabelSkeleton = styled(Skeleton)`
  width: 98px;
  margin-bottom: ${gridSize() / 2}px;
`;

export const FieldSkeleton = styled(Skeleton)`
  width: 100%;
  padding: ${gridSize() + 2}px 0;
  margin: 0;
  box-sizing: border-box;
  border: 2px solid transparent;

  line-height: 1.2em;
`;
