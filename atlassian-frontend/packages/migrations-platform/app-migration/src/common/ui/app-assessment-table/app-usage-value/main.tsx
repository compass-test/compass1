import React, { FC, memo } from 'react';

import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/jira/failed-build-status';
import { N90 } from '@atlaskit/theme/colors';
import Tooltip from '@atlaskit/tooltip';
import { pluralize } from '@atlassian/mpt-utils';

import LoadingPlaceholder from '../../loading-placeholder';

import messages from './messages';
import { CenteredWrapper, NoWrapWrapper } from './styled';

export type Props = {
  unit: 'page' | 'user';
  value: number;
  hasMacros: boolean;
  isEnabled: boolean;
  status?: 'Success' | 'Running' | 'Error';
};

const AppUsageValue: FC<InjectedIntlProps & Props> = ({
  intl,
  isEnabled,
  hasMacros,
  unit,
  value,
  status = 'Running',
}) => {
  if (status === 'Running') {
    return <LoadingPlaceholder />;
  }

  if (status === 'Success' && !isEnabled) {
    return (
      <NoWrapWrapper>
        <FormattedMessage {...messages.disabledMessage} />
      </NoWrapWrapper>
    );
  }

  if (status === 'Success' && !hasMacros && unit === 'page') {
    return (
      <Tooltip content={intl.formatMessage(messages.notApplicableTooltipPage)}>
        <NoWrapWrapper>
          <FormattedMessage {...messages.notApplicableMessage} />
        </NoWrapWrapper>
      </Tooltip>
    );
  }

  if (status === 'Success' && !hasMacros && unit === 'user') {
    return (
      <Tooltip content={intl.formatMessage(messages.notApplicableTooltipUser)}>
        <NoWrapWrapper>
          <FormattedMessage {...messages.notApplicableMessage} />
        </NoWrapWrapper>
      </Tooltip>
    );
  }

  if (status === 'Success' && hasMacros) {
    return (
      <NoWrapWrapper>{`${value} ${pluralize(value, unit)}`}</NoWrapWrapper>
    );
  }

  // Status Error
  return (
    <Tooltip content={`We couldn't check how many ${pluralize(0, unit)}`}>
      <CenteredWrapper>
        <ErrorIcon label="Error" primaryColor={N90} />
      </CenteredWrapper>
    </Tooltip>
  );
};

export default memo(injectIntl(AppUsageValue));
