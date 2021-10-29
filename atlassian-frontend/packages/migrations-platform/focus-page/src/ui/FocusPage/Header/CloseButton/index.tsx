import React, { memo } from 'react';

import CrossIcon from '@atlaskit/icon/glyph/cross';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';
import { AnalyticsButton } from '@atlassian/mpt-elements';

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <AnalyticsButton
    analyticsId="closeButton"
    iconBefore={<CrossIcon label="Close" />}
    appearance="subtle"
    onClick={onClick}
    theme={(currentTheme: any, themeProps: any) => {
      const { buttonStyles, ...otherStyles } = currentTheme(themeProps);
      return {
        buttonStyles: {
          ...buttonStyles,
          color: colors.N800,
        },
        ...otherStyles,
      };
    }}
  >
    Close
  </AnalyticsButton>
);

export default memo(CloseButton);
