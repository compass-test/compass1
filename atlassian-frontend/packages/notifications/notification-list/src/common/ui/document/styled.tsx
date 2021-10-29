import styled from '@emotion/styled';

import { N20A, N30A, N800 } from '@atlaskit/theme/colors';

export const SkeletonBox = styled.div`
  box-sizing: border-box;
  min-height: 38px;
  flex-basis: 100%;
  color: ${N800};
  margin: 4px 0 4px 0px;
  border: 1px solid ${N30A};
  border-radius: 3px;
  padding: 8px;
`;

export const ContentSkeleton = styled(SkeletonBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .skeleton-quote-wrapper {
    display: flex;
    align-items: center;
    border-left: 2px solid ${N20A};
  }

  .quote-avatar {
    background-color: ${N20A};
    border-radius: 50%;
  }

  .quote-avatar-positioner {
    opacity: 0;
  }
`;

export const ContentFailureMessage = styled.p`
  font-style: italic;
  user-select: none;
`;
