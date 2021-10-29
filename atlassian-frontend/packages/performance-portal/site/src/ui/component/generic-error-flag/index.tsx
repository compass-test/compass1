import React from 'react';

import Flag, { FlagGroup } from '@atlaskit/flag';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { R400 } from '@atlaskit/theme/colors';

export const GenericErrorFlag = () => (
  <FlagGroup>
    <Flag
      id="gql-error-flag"
      appearance="error"
      icon={<ErrorIcon label="Error" secondaryColor={R400} />}
      title="Oops! Something went wrong"
      actions={[
        {
          content: 'Reload',
          onClick: () => {
            location.reload();
          },
        },
      ]}
    />
  </FlagGroup>
);
