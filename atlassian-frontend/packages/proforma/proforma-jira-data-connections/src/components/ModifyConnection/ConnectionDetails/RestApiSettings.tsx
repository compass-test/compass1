import React from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import Select from '@atlaskit/select';
import TextField from '@atlaskit/textfield';
import { FormField } from '@atlassian/proforma-common-core/jira-common';
import { AuthenticationType } from '@atlassian/proforma-common-core/jira-common-models';

import { CachingTimeout } from '../../../models/CachingTimeout';
import { IntlDataConnectionMessages } from '../../../stores/DataConnectionMessages.intl';
import {
  CustomAuthConfigurationStore,
  RestConnectionDetailsStore,
  UsernameAndPasswordConfigurationStore,
} from '../../../stores/RestConnectionDetailsStore';

import {
  IntlRestApiSettingsMessages,
  RestApiSettingsMessage,
} from './RestApiSettingsMessages.intl';

interface RestApiSettingsProps {
  store: RestConnectionDetailsStore;
}

export const RestApiSettings = observer(({ store }: RestApiSettingsProps) => {
  const { authStore } = store;
  return (
    <div>
      <UrlField store={store} />
      <AuthenticationTypeField store={store} />
      {authStore &&
        (authStore.type === AuthenticationType.Basic ||
          authStore.type === AuthenticationType.Digest) && (
          <UsernameAndPasswordAuthField
            store={authStore as UsernameAndPasswordConfigurationStore}
          />
        )}
      {authStore && authStore.type === AuthenticationType.Custom && (
        <CustomAuthField store={authStore as CustomAuthConfigurationStore} />
      )}
      <CachePeriodField store={store} />
    </div>
  );
});

const UrlField = injectIntl(
  observer(({ store, intl }: RestApiSettingsProps & InjectedIntlProps) => {
    const error = store.validateUrl();
    const intlErrorMsg = error && (
      <FormattedMessage {...IntlDataConnectionMessages[error]} />
    );
    return (
      <FormField
        label={
          <FormattedMessage
            {...IntlRestApiSettingsMessages[RestApiSettingsMessage.UrlLabel]}
          />
        }
        error={intlErrorMsg}
        required
      >
        <TextField
          placeholder={intl.formatMessage(
            IntlRestApiSettingsMessages[RestApiSettingsMessage.UrlPlaceholder],
          )}
          value={store.url}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            store.updateUrl(e.target.value)
          }
        />
      </FormField>
    );
  }),
);

const AuthenticationTypeField = injectIntl(
  observer(({ store, intl }: RestApiSettingsProps & InjectedIntlProps) => {
    const options = [
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.AuthenticationOptionBasicLabel
          ],
        ),
        value: AuthenticationType.Basic,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.AuthenticationOptionDigestLabel
          ],
        ),
        value: AuthenticationType.Digest,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.AuthenticationOptionCustomLabel
          ],
        ),
        value: AuthenticationType.Custom,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.AuthenticationOptionNoneLabel
          ],
        ),
        value: undefined,
      },
    ];
    const selected = options.find(
      o =>
        (store.authStore && o.value === store.authStore.type) ||
        (store.authStore === undefined && o.value === undefined),
    );

    return (
      <FormField
        label={
          <FormattedMessage
            {...IntlRestApiSettingsMessages[
              RestApiSettingsMessage.AuthenticationLabel
            ]}
          />
        }
      >
        <Select
          placeholder={intl.formatMessage(
            IntlRestApiSettingsMessages[
              RestApiSettingsMessage.AuthenticationPlaceholder
            ],
          )}
          value={selected}
          onChange={selection =>
            store.updateAuthenticationType((selection as any).value)
          }
          options={options}
        />
      </FormField>
    );
  }),
);

const CachePeriodField = injectIntl(
  observer(({ store, intl }: RestApiSettingsProps & InjectedIntlProps) => {
    const options = [
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionNoneLabel
          ],
        ),
        value: CachingTimeout.None,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionOneMinuteLabel
          ],
        ),
        value: CachingTimeout.Min1,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionFiveMinutesLabel
          ],
        ),
        value: CachingTimeout.Min5,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionFifteenMinutesLabel
          ],
        ),
        value: CachingTimeout.Min15,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionOneHourLabel
          ],
        ),
        value: CachingTimeout.Hour1,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionEightHoursLabel
          ],
        ),
        value: CachingTimeout.Hour8,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionOneDayLabel
          ],
        ),
        value: CachingTimeout.Day1,
      },
      {
        label: intl.formatMessage(
          IntlRestApiSettingsMessages[
            RestApiSettingsMessage.CacheResultsOptionSevenDaysLabel
          ],
        ),
        value: CachingTimeout.Day7,
      },
    ];
    const selected = options.find(o => o.value === store.cachingTimeout);

    return (
      <FormField
        label={
          <FormattedMessage
            {...IntlRestApiSettingsMessages[
              RestApiSettingsMessage.CacheResultsLabel
            ]}
          />
        }
      >
        <Select
          placeholder=""
          value={selected}
          onChange={selection =>
            selection && store.updateCachingTimeout((selection as any).value)
          }
          options={options}
        />
      </FormField>
    );
  }),
);

const UsernameAndPasswordAuthField = injectIntl(
  observer(
    ({
      store,
      intl,
    }: {
      store: UsernameAndPasswordConfigurationStore;
    } & InjectedIntlProps) => {
      const error = null; // TODO: store.urlValidationError;
      return (
        <div>
          <FormField
            label={
              <FormattedMessage
                {...IntlRestApiSettingsMessages[
                  RestApiSettingsMessage.UsernameLabel
                ]}
              />
            }
            error={error}
          >
            <TextField
              placeholder={intl.formatMessage(
                IntlRestApiSettingsMessages[
                  RestApiSettingsMessage.UsernamePlaceholder
                ],
              )}
              value={store.username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                store.updateUsername(e.target.value)
              }
            />
          </FormField>
          <FormField
            label={
              <FormattedMessage
                {...IntlRestApiSettingsMessages[
                  RestApiSettingsMessage.PasswordLabel
                ]}
              />
            }
            error={error}
          >
            <TextField
              placeholder={intl.formatMessage(
                IntlRestApiSettingsMessages[
                  RestApiSettingsMessage.PasswordPlaceholder
                ],
              )}
              value={store.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                store.updatePassword(e.target.value)
              }
            />
          </FormField>
        </div>
      );
    },
  ),
);

const CustomAuthField = injectIntl(
  observer(
    ({
      store,
      intl,
    }: { store: CustomAuthConfigurationStore } & InjectedIntlProps) => {
      const error = null; // TODO: store.urlValidationError;
      return (
        <FormField
          label={
            <FormattedMessage
              {...IntlRestApiSettingsMessages[
                RestApiSettingsMessage.AuthenticationTokenLabel
              ]}
            />
          }
          error={error}
        >
          <TextField
            placeholder={intl.formatMessage(
              IntlRestApiSettingsMessages[
                RestApiSettingsMessage.AuthenticationTokenPlaceholder
              ],
            )}
            value={store.token}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              store.updateToken(e.target.value)
            }
          />
        </FormField>
      );
    },
  ),
);
