import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';
import * as colors from '@atlaskit/theme/colors';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';

type Props = {
  level: number;
};

const tier1Theme: any = {
  backgroundColor: colors.N800,
  textColor: colors.N0,
};

const tier2Theme: any = {
  backgroundColor: colors.N400,
  textColor: colors.N0,
};

const tier3Theme: any = {
  backgroundColor: colors.N100,
  textColor: colors.N0,
};

const tier4Theme: any = {
  backgroundColor: colors.N30,
  textColor: colors.N300,
};

const getTierAppearance = (level: number) => {
  switch (level) {
    case 1:
      return tier1Theme;
    case 2:
      return tier2Theme;
    case 3:
      return tier3Theme;
    // In case we add one more than the tier 4
    default:
      return tier4Theme;
  }
};

const TierLozenge = ({
  intl: { formatMessage },
  level,
}: Props & InjectedIntlProps) => {
  return (
    <Lozenge appearance={getTierAppearance(level)}>
      {formatMessage(CommonMessages.tierWithLevelParam, { level })}
    </Lozenge>
  );
};

export default injectIntl(TierLozenge);
