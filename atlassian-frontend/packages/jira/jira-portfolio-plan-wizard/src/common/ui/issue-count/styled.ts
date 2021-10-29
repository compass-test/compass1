import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';

type IssueCountNumberProps = { isOverLimit: boolean; loading: boolean };

export const IssueCountNumber = styled.div<IssueCountNumberProps>`
  font-weight: 600;
  min-width: 3rem;
  display: inline-block;
  color: ${(props) => {
    if (props.loading) {
      return colors.N60A;
    }

    if (props.isOverLimit) {
      return colors.R500;
    }

    return 'inherit';
  }};
  transition: color 300ms ease;
`;
