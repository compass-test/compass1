import React from 'react';

import { OverrideInfoString } from './styled';

interface Props {
  overrideAt?: Nullable<Date>;
  overrideSourceName?: Nullable<string>;
}

export const TooltipDataOverrideInfoSection = ({
  overrideSourceName,
}: Props) => {
  if (!overrideSourceName) {
    return null;
  }
  return (
    <OverrideInfoString>
      Data sourced from {overrideSourceName}
    </OverrideInfoString>
  );
};
