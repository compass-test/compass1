import React from 'react';

import Tick from '@atlaskit/icon/glyph/check-circle';
import Error from '@atlaskit/icon/glyph/error';
import Info from '@atlaskit/icon/glyph/info';
import Warning from '@atlaskit/icon/glyph/warning';
import { G300, P300, R300, Y300 } from '@atlaskit/theme/colors';

export const iconMap = (key?: string): React.ReactNode => {
  const icons: { [key: string]: React.ReactElement } = {
    info: <Info label="Info icon" primaryColor={P300} />,
    success: <Tick label="Success icon" primaryColor={G300} />,
    warning: <Warning label="Warning icon" primaryColor={Y300} />,
    error: <Error label="Error icon" primaryColor={R300} />,
  };

  return key ? icons[key] : undefined;
};
