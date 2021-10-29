import React, { FC, memo } from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import ScaleLargeIcon from '@atlaskit/icon/glyph/media-services/scale-large';
import { N60 } from '@atlaskit/theme/colors';

import { toTitleCase } from '../../utils';
import LoadingPlaceholder from '../loading-placeholder';

import messages from './messages';
import { Logo, Text, Wrapper } from './styled';

type Props = {
  name: string;
  logoUrl?: string;
  isLoading?: boolean;
};

const AppNameValue: FC<InjectedIntlProps & Props> = ({
  name,
  logoUrl,
  isLoading = false,
  intl,
}) => {
  const title = toTitleCase(name);

  if (isLoading) {
    return <LoadingPlaceholder />;
  }
  return (
    <Wrapper>
      {logoUrl ? (
        <Logo alt={name} src={logoUrl} />
      ) : (
        <ScaleLargeIcon
          label={intl.formatMessage(messages.noLogo)}
          primaryColor={N60}
          size="medium"
        />
      )}
      <Text title={title}>{title}</Text>
    </Wrapper>
  );
};

export default memo(injectIntl(AppNameValue));
