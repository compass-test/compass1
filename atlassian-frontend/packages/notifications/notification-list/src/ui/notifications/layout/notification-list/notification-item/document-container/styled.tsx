import styled from '@emotion/styled';

import { N20A } from '@atlaskit/theme/colors';
import { focusRing } from '@atlaskit/theme/constants';

import { SkeletonBox } from '../../../../../../common/ui/document';

export const ContentBox = styled(SkeletonBox)`
  ${focusRing()}

  cursor: pointer;
  word-break: break-word;
  &:hover {
    background-color: ${N20A};
  }
`;
