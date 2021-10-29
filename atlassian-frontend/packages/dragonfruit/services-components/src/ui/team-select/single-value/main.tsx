import React from 'react';

import Avatar from '@atlaskit/avatar';
import PeopleGroupIcon from '@atlaskit/icon/glyph/people-group';
import { components } from '@atlaskit/select';
import { AvatarContentAction } from '@atlassian/dragonfruit-common-ui';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { AvatarContent } from '../../../common/ui/avatar-content';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ComponentProps, ErrorWithStatusCode } from '../types';

import messages from './messages';
import { DisabledText } from './styled';

type SingleValue = NonNullable<ComponentProps['SingleValue']>;

/**
 * Styles a single selected value to include the team avatar alongside the name.
 */
export const SingleValue: SingleValue = (props) => {
  const { children, ...forwardProps } = props;

  return (
    <components.SingleValue {...forwardProps}>
      <AvatarContent avatarUrl={props.data?.avatarUrl}>
        {children}
      </AvatarContent>
    </components.SingleValue>
  );
};

/**
 * Replaces the selected value to display a generic error.
 */
export const SingleValueGenericError: SingleValue = (props) => {
  const { children, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  return (
    <components.SingleValue {...forwardProps}>
      <AvatarContentAction avatar={<RestrictedIcon />}>
        <DisabledText>
          {formatMessage(messages.teamNameFetchFailureMessage)}
        </DisabledText>
      </AvatarContentAction>
    </components.SingleValue>
  );
};

/**
 * Replaces the selected value to display a 404 error message.
 */
export const SingleValueNotFound: SingleValue = (props) => {
  const { children, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  return (
    <components.SingleValue {...forwardProps}>
      <AvatarContentAction avatar={<RestrictedIcon />}>
        <DisabledText>
          {formatMessage(messages.teamNotFoundMessage)}
        </DisabledText>
      </AvatarContentAction>
    </components.SingleValue>
  );
};

/**
 * Replaces the selected value to display a restricted access message.
 */
export const SingleValueForbidden: SingleValue = (props) => {
  const { children, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  return (
    <components.SingleValue {...forwardProps}>
      <AvatarContentAction
        avatar={
          <Avatar
            size="small"
            appearance="circle"
            status="locked"
            children={() => <RestrictedIcon />}
          />
        }
      >
        <DisabledText>
          {formatMessage(messages.teamNameAccessRestrictedMessage)}
        </DisabledText>
      </AvatarContentAction>
    </components.SingleValue>
  );
};

function RestrictedIcon() {
  return <PeopleGroupIcon size="medium" label="" />;
}

const HTTP_FORBIDDEN = 403;
const HTTP_NOT_FOUND = 404;

/**
 * Returns the best SingleValue component for the given error.
 */
export function getSingleValueError(error: ErrorWithStatusCode): SingleValue {
  if (error.statusCode === HTTP_NOT_FOUND) {
    return SingleValueNotFound;
  }

  if (error.statusCode === HTTP_FORBIDDEN) {
    return SingleValueForbidden;
  }

  return SingleValueGenericError;
}
