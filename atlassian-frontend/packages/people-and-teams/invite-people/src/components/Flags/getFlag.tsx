import React from 'react';
import { FormattedMessage, InjectedIntl } from 'react-intl';

import ErrorIcon from '@atlaskit/icon/glyph/error';
import SuccessIcon from '@atlaskit/icon/glyph/check-circle';
import PeopleIcon from '@atlaskit/icon/glyph/people';
import EmojiFrequentIcon from '@atlaskit/icon/glyph/emoji/frequent';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

import {
  BulkInviteFailureResponse,
  BulkInviteSuccessResponse,
  Flag,
  UserRole,
} from '../../types';
import { CLOUD_ADMIN_URL, getProductTitle } from '../../utils';
import {
  SLACK_SERVICE,
  MICROSOFT_SERVICE,
  GOOGLE_SERVICE,
} from '../ThirdParty/constants';
import { messages } from '../i18n/messages';

export const getFailureFlag = (
  result: BulkInviteFailureResponse,
  cloudId: string,
  userRole: UserRole,
  failedEmails: string[],
  isInviteInJiraFlow?: boolean,
): Flag | null => {
  const { failure } = result;

  if (!failure) {
    return null;
  }

  if (failure.code !== 'licence-exceeded') {
    return getGenericErrorFlag(userRole);
  }

  if (isInviteInJiraFlow) {
    return {
      appearance: 'warning',
      icon: (
        <PeopleIcon
          label={failure.code}
          primaryColor={colors.Y300}
          secondaryColor={colors.N0}
        />
      ),
      title: (
        <FormattedMessage
          {...messages.licenceExceededInJiraProjectFlagTitle}
          values={{
            failedInviteCount: failedEmails.length,
          }}
        />
      ),
      description: (
        <FormattedMessage
          {...messages.licenceExceededInJiraProjectFlagDescription}
          values={{
            emailFailedToInvite: failedEmails[0],
            failedInviteCount: failedEmails.length,
            userRole,
          }}
        />
      ),
      actions:
        userRole === 'admin'
          ? [
              {
                content: (
                  <FormattedMessage {...messages.upgradePlanActionLabel} />
                ),
                href: `${CLOUD_ADMIN_URL}/s/${cloudId}/billing/applications`,
                target: '_blank',
              },
              {
                content: (
                  <FormattedMessage {...messages.viewUsersActionLabel} />
                ),
                href: `${CLOUD_ADMIN_URL}/s/${cloudId}/users`,
                target: '_blank',
              },
            ]
          : [],
    };
  }

  return {
    appearance: 'warning',
    icon: (
      <PeopleIcon
        label={failure.code}
        primaryColor={colors.Y300}
        secondaryColor={colors.N0}
      />
    ),
    title: <FormattedMessage {...messages.licenceExceededFlagTitle} />,
    description: (
      <FormattedMessage
        {...messages.licenceExceededFlagDescription}
        values={{
          failedInviteCount: failedEmails.length,
          userRole,
        }}
      />
    ),
    actions:
      userRole === 'admin'
        ? [
            {
              content: (
                <FormattedMessage {...messages.upgradePlanActionLabel} />
              ),
              href: `${CLOUD_ADMIN_URL}/s/${cloudId}/billing/applications`,
              target: '_blank',
            },
            {
              content: <FormattedMessage {...messages.viewUsersActionLabel} />,
              href: `${CLOUD_ADMIN_URL}/s/${cloudId}/users`,
              target: '_blank',
            },
          ]
        : [],
  };
};

export const getSuccessFlag = (
  result: BulkInviteSuccessResponse,
  cloudId: string,
  products: string[],
  userRole: UserRole,
  intl: InjectedIntl,
): Flag | null => {
  const { invited = [], accessRequested = [] } = result;

  if (invited.length || accessRequested.length) {
    let descriptionMessage: FormattedMessage.MessageDescriptor =
      messages.hybridSuccessFlagDescription;

    const isInviteOnly = invited.length && !accessRequested.length;
    const isAccessRequestOnly = !invited.length && accessRequested.length;

    if (isInviteOnly) {
      descriptionMessage = messages.inviteSuccessFlagDescription;
    } else if (isAccessRequestOnly) {
      descriptionMessage = messages.requestAccessSuccessFlagDescription;
    }

    const formattedMessageValues = {
      inviteCount: invited.length,
      requestAccessCount: accessRequested.length,
      emailInvited: invited.length ? invited[0].email : '',
      emailRequestedAccess: accessRequested.length
        ? accessRequested[0].email
        : '',
      product: products.length > 1 ? null : getProductTitle(products[0]),
      productCount: products.length,
    };

    return {
      appearance: 'success',
      icon: (
        <SuccessIcon
          label="success"
          primaryColor={colors.G400}
          secondaryColor={colors.N0}
        />
      ),
      title: <FormattedMessage {...messages.genericSuccessFlagTitle} />,
      description: (
        <FormattedMessage
          {...descriptionMessage}
          values={{
            ...formattedMessageValues,
            invitedPlural: intl.formatMessage(
              messages.invitedPlural,
              formattedMessageValues,
            ),
            productsPlural: intl.formatMessage(
              messages.productsPlural,
              formattedMessageValues,
            ),
            invitedHybridPlural: intl.formatMessage(
              messages.invitedHybridPlural,
              formattedMessageValues,
            ),
            requestAccessHybridPlural: intl.formatMessage(
              messages.requestAccessHybridPlural,
              formattedMessageValues,
            ),
          }}
        />
      ),
      actions:
        isInviteOnly && userRole === 'admin'
          ? [
              {
                content: (
                  <FormattedMessage {...messages.viewUsersActionLabel} />
                ),
                href: `${CLOUD_ADMIN_URL}/s/${cloudId}/users`,
                target: '_blank',
              },
            ]
          : [],
    };
  }

  return null;
};

export const getSuccessFlagForInviteToJiraProject = (
  result: BulkInviteSuccessResponse,
  cloudId: string,
  products: string[],
  userRole: UserRole,
  source: string,
  intl: InjectedIntl,
  {
    continueUrl,
    jiraProjectName,
    jiraProjectKey,
  }: {
    continueUrl: string;
    jiraProjectName: string;
    jiraProjectKey: string;
  },
): Flag | null => {
  const { invited = [], accessRequested = [] } = result;

  if (invited.length || accessRequested.length) {
    let titleMessage = messages.hybridToJiraProjectSuccessFlagTitle;
    let descriptionMessage: FormattedMessage.MessageDescriptor =
      messages.hybridToJiraProjectSuccessFlagDescription;

    const isInviteOnly = invited.length && !accessRequested.length;
    const isAccessRequestOnly = !invited.length && accessRequested.length;

    if (isInviteOnly) {
      titleMessage = messages.inviteToJiraProjectSuccessFlagTitle;
      descriptionMessage = messages.inviteToJiraProjectSuccessFlagDescription;
    } else if (isAccessRequestOnly) {
      titleMessage = messages.requestAccessToJiraProjectSuccessFlagTitle;
      descriptionMessage =
        messages.requestAccessToJiraProjectSuccessFlagDescription;
    }

    const formattedMessageValues = {
      inviteCount: invited.length,
      requestAccessCount: accessRequested.length,
      emailInvited: invited.length ? invited[0].email : '',
      emailRequestedAccess: accessRequested.length
        ? accessRequested[0].email
        : '',
      product: products.length > 1 ? null : getProductTitle(products[0]),
      productCount: products.length,
      jiraProjectName,
      isAdmin: userRole === 'admin',
      combination:
        invited.length > 0 && accessRequested.length > 0
          ? invited.length === 1 && accessRequested.length === 1
            ? 'singleHybrid'
            : 'multipleHybrid'
          : undefined,
    };

    return {
      appearance: 'success',
      icon: isAccessRequestOnly ? (
        <EmojiFrequentIcon
          label="success"
          primaryColor={colors.Y400}
          secondaryColor={colors.N0}
        />
      ) : (
        <SuccessIcon
          label="success"
          primaryColor={colors.G400}
          secondaryColor={colors.N0}
        />
      ),
      title: (
        <FormattedMessage
          {...titleMessage}
          values={{
            inviteCount: invited.length,
            requestAccessCount: accessRequested.length,
          }}
        />
      ),
      description: (
        <FormattedMessage
          {...descriptionMessage}
          values={{
            ...formattedMessageValues,
            multipleHybridDescription: intl.formatMessage(
              messages.multipleHybridDescription,
              {
                ...formattedMessageValues,
                multipleHybridInvitePlural: intl.formatMessage(
                  messages.multipleHybridInvitePlural,
                  formattedMessageValues,
                ),
                multipleHybridRequestAccessPlural: intl.formatMessage(
                  messages.multipleHybridRequestAccessPlural,
                  formattedMessageValues,
                ),
              },
            ),
          }}
        />
      ),
      actions:
        isInviteOnly && userRole === 'admin'
          ? [
              {
                content: (
                  <FormattedMessage
                    {...messages.jiraProjectSettingsLabel}
                    values={{ jiraProjectName }}
                  />
                ),
                href: `${
                  new URL(continueUrl!).origin
                }/jira/software/projects/${jiraProjectKey}/settings/access`,
                target: '_blank',
              },
            ]
          : [],
    };
  }

  return null;
};

export const getErrorFlag = (
  result: BulkInviteSuccessResponse,
  userRole: UserRole,
): Flag | null => {
  const { error } = result;
  const isAdmin = userRole === 'admin';

  if (error && error.length) {
    return {
      appearance: 'error',
      icon: (
        <ErrorIcon
          label="error"
          primaryColor={colors.R400}
          secondaryColor={colors.N0}
        />
      ),
      title: (
        <FormattedMessage
          {...messages.inviteFailedFlagTitle}
          values={{
            isAdmin,
            failedInviteCount: error.length,
          }}
        />
      ),
      description: (
        <FormattedMessage
          {...messages.inviteFailedFlagDescription}
          values={{
            isAdmin,
            emailFailedToInvite: error[0] && error[0].email,
            failedInviteCount: error.length,
          }}
        />
      ),
      actions: isAdmin
        ? [
            {
              content: (
                <FormattedMessage {...messages.contactSupportActionLabel} />
              ),
              href: 'https://support.atlassian.com/contact/',
              target: '_blank',
            },
          ]
        : [],
    };
  }

  return null;
};

export const getGenericErrorFlag = (userRole: UserRole): Flag => {
  const isAdmin = userRole === 'admin';

  return {
    appearance: 'error',
    icon: (
      <ErrorIcon
        label="error"
        primaryColor={colors.R400}
        secondaryColor={colors.N0}
      />
    ),
    title: <FormattedMessage {...messages.genericFailedFlagTitle} />,
    description: (
      <FormattedMessage
        {...messages.genericFailedFlagDescription}
        values={{ isAdmin }}
      />
    ),
    actions: isAdmin
      ? [
          {
            content: (
              <FormattedMessage {...messages.contactSupportActionLabel} />
            ),
            href: 'https://support.atlassian.com/contact/',
            target: '_blank',
          },
        ]
      : [],
  };
};

export const getSuccessIntegrationFlag = (
  serviceKey: string,
  workspace?: string,
): Flag => {
  let title: React.ReactNode;
  let description: React.ReactNode;

  switch (serviceKey) {
    case SLACK_SERVICE:
      title = (
        <FormattedMessage
          {...messages.slackConnectSuccessFlagTitle}
          values={{ workspace }}
        />
      );
      description = (
        <FormattedMessage {...messages.slackConnectSuccessFlagDescription} />
      );
      break;
    case MICROSOFT_SERVICE:
      title = (
        <FormattedMessage {...messages.microsoftConnectSuccessFlagTitle} />
      );
      description = (
        <FormattedMessage
          {...messages.microsoftConnectSuccessFlagDescription}
        />
      );
      break;
    case GOOGLE_SERVICE:
      title = <FormattedMessage {...messages.googleConnectSuccessFlagTitle} />;
      description = (
        <FormattedMessage {...messages.googleConnectSuccessFlagDescription} />
      );
      break;
  }

  return {
    appearance: 'success',
    icon: (
      <SuccessIcon
        label="success"
        primaryColor={colors.G400}
        secondaryColor={colors.N0}
      />
    ),
    title,
    description,
  };
};

export const getSlackDisconnectedFlag = (): Flag => {
  return {
    appearance: 'success',
    icon: (
      <SuccessIcon
        label="success"
        primaryColor={colors.G400}
        secondaryColor={colors.N0}
      />
    ),
    title: <FormattedMessage {...messages.slackDisconnectSuccessFlagTitle} />,
    description: (
      <FormattedMessage {...messages.slackDiscnnectSuccessFlagDescription} />
    ),
  };
};

const getOpenInviteSuccessFlag = (cloudId: string, product: string): Flag => {
  return {
    appearance: 'success',
    icon: (
      <SuccessIcon
        label="success"
        primaryColor={colors.G400}
        secondaryColor={colors.N0}
      />
    ),
    title: (
      <FormattedMessage
        {...messages.openInviteSuccessFlagTitle}
        values={{ product }}
      />
    ),
    description: (
      <FormattedMessage {...messages.openInviteSuccessFlagDescription} />
    ),
    actions: [
      {
        content: (
          <FormattedMessage {...messages.viralSettingsSuccessFlagActionLabel} />
        ),
        href: `${CLOUD_ADMIN_URL}/s/${cloudId}/signup`,
        target: '_blank',
      },
    ],
  };
};

const getDirectAccessSuccessFlag = (
  domains: string[],
  cloudId: string,
  product: string,
): Flag => {
  return {
    appearance: 'success',
    icon: (
      <SuccessIcon
        label="success"
        primaryColor={colors.G400}
        secondaryColor={colors.N0}
      />
    ),
    title: (
      <FormattedMessage
        {...messages.directAccessSuccessFlagTitle}
        values={{ product }}
      />
    ),
    description: (
      <FormattedMessage
        {...messages.directAccessSuccessFlagDescription}
        values={{ domains: domains.map((domain) => `@${domain}`).join(', ') }}
      />
    ),
    actions: [
      {
        content: (
          <FormattedMessage {...messages.viralSettingsSuccessFlagActionLabel} />
        ),
        href: `${CLOUD_ADMIN_URL}/s/${cloudId}/signup`,
        target: '_blank',
      },
    ],
  };
};

const getViralSettingsSuccessFlag = (
  domains: string[],
  cloudId: string,
  product: string,
): Flag => {
  return {
    appearance: 'success',
    icon: (
      <SuccessIcon
        label="success"
        primaryColor={colors.G400}
        secondaryColor={colors.N0}
      />
    ),
    title: (
      <FormattedMessage
        {...messages.viralSettingsSuccessFlagTitle}
        values={{ product }}
      />
    ),
    description: (
      <FormattedMessage
        {...messages.viralSettingsSuccessFlagDescription}
        values={{
          domains: domains.map((domain) => `@${domain}`).join(', '),
        }}
      />
    ),
    actions: [
      {
        content: (
          <FormattedMessage {...messages.viralSettingsSuccessFlagActionLabel} />
        ),
        href: `${CLOUD_ADMIN_URL}/s/${cloudId}/signup`,
        target: '_blank',
      },
    ],
  };
};

const getOpenInviteFailureFlag = (cloudId: string, product: string): Flag => {
  return {
    appearance: 'error',
    icon: (
      <ErrorIcon
        label="error"
        primaryColor={colors.R400}
        secondaryColor={colors.N0}
      />
    ),
    title: <FormattedMessage {...messages.openInviteFailureFlagTitle} />,
    description: (
      <FormattedMessage
        {...messages.openInviteFailureFlagDescription}
        values={{ product }}
      />
    ),
    actions: [
      {
        content: (
          <FormattedMessage {...messages.viralSettingsFailureFlagActionLabel} />
        ),
        href: `${CLOUD_ADMIN_URL}/s/${cloudId}/signup`,
        target: '_blank',
      },
    ],
  };
};

const getDirectAccessFailureFlag = (
  domain: string,
  cloudId: string,
  product: string,
): Flag => {
  return {
    appearance: 'error',
    icon: (
      <ErrorIcon
        label="error"
        primaryColor={colors.R400}
        secondaryColor={colors.N0}
      />
    ),
    title: <FormattedMessage {...messages.directAccessFailureFlagTitle} />,
    description: (
      <FormattedMessage
        {...messages.directAccessFailureFlagDescription}
        values={{ domain: `@${domain}`, product }}
      />
    ),
    actions: [
      {
        content: (
          <FormattedMessage {...messages.viralSettingsFailureFlagActionLabel} />
        ),
        href: `${CLOUD_ADMIN_URL}/s/${cloudId}/signup`,
        target: '_blank',
      },
    ],
  };
};

export const getViralSettingsFlags = (
  openInviteEnabled: boolean | undefined,
  directAccessAllDomainsEnabled: boolean | undefined,
  domains: string[],
  cloudId: string,
  product: string,
) => {
  let flags: Flag[] = [];
  if (openInviteEnabled && directAccessAllDomainsEnabled) {
    return [getViralSettingsSuccessFlag(domains, cloudId, product)];
  }

  if (openInviteEnabled) {
    flags.push(getOpenInviteSuccessFlag(cloudId, product));
  } else if (openInviteEnabled === false) {
    flags.push(getOpenInviteFailureFlag(cloudId, product));
  }

  if (directAccessAllDomainsEnabled) {
    flags.push(getDirectAccessSuccessFlag(domains, cloudId, product));
  } else if (directAccessAllDomainsEnabled === false) {
    domains.forEach((domain) =>
      flags.push(getDirectAccessFailureFlag(domain, cloudId, product)),
    );
  }

  return flags;
};
