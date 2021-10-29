import React, { ComponentType, FC } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import { G300, N70, R400 } from '@atlaskit/theme/colors';

import LoadingPlaceholder from '../../loading-placeholder';

import messages from './messages';
import { Text, Wrapper } from './styled';

type AppearanceType = 'Success' | 'Error' | 'NoopSuccess' | 'NoopError';

type Appearance = {
  Icon: ComponentType<{ label: string; primaryColor?: string }>;
  iconColor: string;
  message: FormattedMessage.MessageDescriptor;
};

const baseAppearanceObj: Record<AppearanceType, Appearance> = {
  Success: {
    Icon: CheckCircleIcon,
    iconColor: G300,
    message: messages.success,
  },
  Error: {
    Icon: ErrorIcon,
    iconColor: R400,
    message: messages.error,
  },
  NoopSuccess: {
    Icon: CheckCircleIcon,
    iconColor: N70,
    message: messages.noopSuccess,
  },
  NoopError: {
    Icon: CrossCircleIcon,
    iconColor: N70,
    message: messages.noopError,
  },
};

type Props = {
  appearance: AppearanceType;
  isLoading?: boolean;
};

const AppStatusValue: FC<InjectedIntlProps & Props> = ({
  appearance,
  children,
  isLoading = false,
  intl,
}) => {
  const { Icon, iconColor, message } = baseAppearanceObj[appearance];

  if (isLoading) {
    return <LoadingPlaceholder />;
  }
  return (
    <Wrapper>
      <Icon label={intl.formatMessage(message)} primaryColor={iconColor} />
      <Text>{children}</Text>
    </Wrapper>
  );
};

export default injectIntl(AppStatusValue);
