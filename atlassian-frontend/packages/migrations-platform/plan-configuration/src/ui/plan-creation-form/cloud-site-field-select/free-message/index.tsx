import React, { FC } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import InfoIcon from '@atlaskit/icon/glyph/info';
import { P500 as infoColor } from '@atlaskit/theme/colors';
import { ExternalLink } from '@atlassian/mpt-elements';

import messages from './messages';
import { Section } from './styled';

type Props = {
  plansUrl: string;
};

const CloudSiteSelectFreeMessage: FC<Props & InjectedIntlProps> = ({
  plansUrl,
  intl,
}) => {
  return (
    <Section>
      <InfoIcon
        primaryColor={infoColor}
        label={intl.formatMessage(messages.infoIconLabel)}
      />
      <p>
        {intl.formatMessage(messages.mainMessage)}
        <ExternalLink
          subtle
          href={plansUrl}
          title={intl.formatMessage(messages.learnMoreLinkTitle)}
        >
          {intl.formatMessage(messages.learnMoreLink)}
        </ExternalLink>
      </p>
    </Section>
  );
};

export default injectIntl(CloudSiteSelectFreeMessage);
