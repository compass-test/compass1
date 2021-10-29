import React from 'react';

import styled from 'styled-components';

import InlineMessage from '@atlaskit/inline-message';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

const MoreInfoStyle = styled.span`
  font-weight: normal;
  color: ${colors.N200};
`;

const MessageStyle = styled.span`
  margin-left: 8px;
`;

type Props = {
  children: React.ReactNode;
};

const InlineMoreInfoTooltip = ({ children }: Props) => {
  return (
    <MessageStyle>
      <InlineMessage
        title={<MoreInfoStyle>More info</MoreInfoStyle>}
        type="info"
      >
        {children}
      </InlineMessage>
    </MessageStyle>
  );
};

export default InlineMoreInfoTooltip;
