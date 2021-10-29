import React, { FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import WarningIcon from '@atlaskit/icon/glyph/warning';
import { Y500 } from '@atlaskit/theme/colors';

import type { ProductFamilyKey } from '../../../common/types';

import messages from './messages';
import { Wrapper } from './styled';

type Props = {
  productFamilyKey: ProductFamilyKey;
};

const messageForProductFamily: Partial<Record<
  ProductFamilyKey,
  FormattedMessage.MessageDescriptor
>> = {
  jira: messages.projectsAvailableToPublic,
};

const AnonymousAccessContent: FC<InjectedIntlProps & Props> = ({
  productFamilyKey,
  intl,
}) => {
  const message = messageForProductFamily[productFamilyKey];
  if (!message) {
    return null;
  }
  return (
    <Wrapper>
      <WarningIcon primaryColor={Y500} label={intl.formatMessage(message)} />
      &nbsp;
      {intl.formatMessage(message)}
    </Wrapper>
  );
};

export default injectIntl(AnonymousAccessContent);
