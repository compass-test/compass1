import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';

import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import SectionMessage from '@atlaskit/section-message';
import {
  LearnMoreLink,
  LoadingSpinner,
} from '@atlassian/proforma-common-core/jira-common';
import { DataConnectionItem } from '@atlassian/proforma-common-core/jira-common-models';

import { CachingTimeout } from '../../../models/CachingTimeout';
import { ConnectionType } from '../../../models/ConnectionType';
import { DataConnectionStore } from '../../../stores/DataConnectionStore';
import { RestConnectionDetailsStore } from '../../../stores/RestConnectionDetailsStore';
import {
  DataConnectionsMessage,
  IntlDataConnectionsMessages,
} from '../../DataConnectionsMessages.intl';
import { Footer } from '../Footer';
import { WizardSection } from '../styled';

import {
  ConfirmConnectionMessage,
  IntlConfirmConnectionMessages,
} from './ConfirmConnectionMessages.intl';

interface ConfirmConnectionProps {
  dataConnectionStore: DataConnectionStore;
  editing: boolean;
  previousWizardStep: () => void;
  nextWizardStep: () => void;
}

export const ConfirmConnection = injectIntl(
  observer(
    ({
      dataConnectionStore,
      editing,
      previousWizardStep,
      nextWizardStep,
      intl,
    }: ConfirmConnectionProps & InjectedIntlProps) => {
      useEffect(() => {
        dataConnectionStore.getConnectionItems();
      }, [dataConnectionStore]);

      const name = dataConnectionStore.name;
      const connectionType = dataConnectionStore.type;
      const connectionSourceField = connectionType && (
        <ConnectionSourceField
          source={dataConnectionStore.detailsStore?.getSource()}
        />
      );
      let connectionTypeDescription;
      let authenticationField;
      if (connectionType) {
        if (connectionType === ConnectionType.RestApi) {
          connectionTypeDescription = (
            <FormattedMessage
              {...IntlDataConnectionsMessages[
                DataConnectionsMessage.TypeOptionRestApiLabel
              ]}
            />
          );
          if (
            dataConnectionStore.detailsStore instanceof
            RestConnectionDetailsStore
          ) {
            authenticationField = (
              <RestAuthenticationField
                detailsStore={dataConnectionStore.detailsStore}
              />
            );
          }
        }
      }

      let connectionContentType =
        IntlConfirmConnectionMessages[
          ConfirmConnectionMessage.ContentTypeUnknown
        ];
      if (dataConnectionStore.testItemLocationsResponse) {
        const contentType = dataConnectionStore.testItemLocationsResponse.contentType.toLowerCase();
        if (contentType.indexOf('application/json') !== -1) {
          connectionContentType =
            IntlConfirmConnectionMessages[
              ConfirmConnectionMessage.ContentTypeJson
            ];
        } else if (
          contentType.indexOf('application/xml') !== -1 ||
          contentType.indexOf('text/xml') !== -1
        ) {
          connectionContentType =
            IntlConfirmConnectionMessages[
              ConfirmConnectionMessage.ContentTypeXml
            ];
        }
      }

      const connectionItems: DataConnectionItem[] =
        dataConnectionStore.connectionItems;
      const hasNonNumericIds =
        connectionItems.findIndex(
          connectionItem => !isLong(connectionItem.id),
        ) >= 0;

      const tableHeaders = {
        cells: [
          {
            key: 'id',
            content: intl.formatMessage(
              IntlDataConnectionsMessages[DataConnectionsMessage.IdLabel],
            ),
            isSortable: true,
            width: 20,
          },
          {
            key: 'label',
            content: intl.formatMessage(
              IntlDataConnectionsMessages[DataConnectionsMessage.LabelLabel],
            ),
            isSortable: true,
            width: 50,
          },
        ],
      };

      return (
        <>
          <WizardSection>
            <h2>{name}</h2>
            <p>
              <FormattedMessage
                {...IntlConfirmConnectionMessages[
                  ConfirmConnectionMessage.Para1
                ]}
              />
            </p>
            <h3>
              <FormattedMessage
                {...IntlConfirmConnectionMessages[
                  ConfirmConnectionMessage.ConnectionHeading
                ]}
              />
            </h3>
            <h6>
              <FormattedMessage
                {...IntlConfirmConnectionMessages[
                  ConfirmConnectionMessage.ConnectionTypeHeading
                ]}
              />
            </h6>
            {dataConnectionStore.type && (
              <div>
                {connectionTypeDescription}{' '}
                <FormattedMessage
                  {...IntlConfirmConnectionMessages[
                    ConfirmConnectionMessage.ConnectionIsReturnDataOfType
                  ]}
                  values={{
                    contentType: intl.formatMessage(connectionContentType),
                  }}
                />
              </div>
            )}
            {
              <div>
                <br />
                {connectionSourceField}
              </div>
            }
            {authenticationField && (
              <div>
                <br />
                {authenticationField}
              </div>
            )}
            {dataConnectionStore && (
              <div>
                <br />
                <CacheResultsField dataConnectionStore={dataConnectionStore} />
              </div>
            )}
            <h3>
              <FormattedMessage
                {...IntlConfirmConnectionMessages[
                  ConfirmConnectionMessage.ItemsHeading
                ]}
              />
            </h3>
            {dataConnectionStore.loadingConnectionItems && (
              <LoadingSpinner
                message={
                  IntlConfirmConnectionMessages[
                    ConfirmConnectionMessage.ItemsLoadingMessage
                  ]
                }
              />
            )}
            {!dataConnectionStore.loadingConnectionItems && connectionItems && (
              <DynamicTableStateless
                head={tableHeaders}
                rows={createRows(connectionItems)}
                loadingSpinnerSize="large"
                isLoading={false}
                isFixedSize
              />
            )}
            {!dataConnectionStore.loadingConnectionItems && hasNonNumericIds && (
              <>
                <SectionMessage
                  appearance="warning"
                  title={intl.formatMessage(
                    IntlConfirmConnectionMessages[
                      ConfirmConnectionMessage
                        .LegacyFormTemplateIncompatibilityHeading
                    ],
                  )}
                >
                  <p>
                    <FormattedMessage
                      {...IntlConfirmConnectionMessages[
                        ConfirmConnectionMessage
                          .LegacyFormTemplateIncompatibilityPara1
                      ]}
                      values={{
                        fieldId: (
                          <b>
                            "{dataConnectionStore.detailsStore?.getItemId()}"
                          </b>
                        ),
                      }}
                    />{' '}
                    <LearnMoreLink href="http://links.thinktilt.net/data-lookups" />
                  </p>
                  <p>
                    <FormattedMessage
                      {...IntlConfirmConnectionMessages[
                        ConfirmConnectionMessage
                          .LegacyFormTemplateIncompatibilityPara2
                      ]}
                    />
                  </p>
                </SectionMessage>
              </>
            )}
            {dataConnectionStore.savingConnection && (
              <LoadingSpinner
                message={
                  IntlConfirmConnectionMessages[
                    ConfirmConnectionMessage.SavingConnectionMessage
                  ]
                }
              />
            )}
          </WizardSection>
          <Footer
            editing={editing}
            previousWizardStep={previousWizardStep}
            nextWizardStep={nextWizardStep}
            confirming
          />
        </>
      );
    },
  ),
);

// https://stackoverflow.com/a/1830844
const isLong = (n: any) => {
  // eslint-disable-next-line eqeqeq
  return !isNaN(parseFloat(n)) && isFinite(n) && parseInt(n, 10) == n;
};

const createRows = (items: DataConnectionItem[]) => {
  return items.map(item => ({
    key: `row-${item.id}`,
    cells: [
      {
        key: 'id',
        content: item.id,
      },
      {
        key: 'label',
        content: item.label,
      },
    ],
  }));
};

const ConnectionSourceField = observer(({ source }: { source?: string }) => {
  return (
    <div>
      <h6>
        <FormattedMessage
          {...IntlConfirmConnectionMessages[
            ConfirmConnectionMessage.SourceHeading
          ]}
        />
      </h6>
      {source}
    </div>
  );
});

const RestAuthenticationField = observer(
  ({ detailsStore }: { detailsStore: RestConnectionDetailsStore }) => {
    return (
      <div>
        <h6>
          <FormattedMessage
            {...IntlConfirmConnectionMessages[
              ConfirmConnectionMessage.AuthenticationHeading
            ]}
          />
        </h6>
        {detailsStore.authStore && detailsStore.authStore.description()}
        {!detailsStore.authStore && (
          <FormattedMessage
            {...IntlConfirmConnectionMessages[
              ConfirmConnectionMessage.NoAuthentication
            ]}
          />
        )}
      </div>
    );
  },
);

const CacheResultsField = observer(
  ({ dataConnectionStore }: { dataConnectionStore: DataConnectionStore }) => {
    let cachingDescription;
    const cachingTimeout =
      dataConnectionStore.detailsStore &&
      dataConnectionStore.detailsStore.cachingTimeout;
    if (cachingTimeout === CachingTimeout.None) {
      cachingDescription = (
        <FormattedMessage
          {...IntlConfirmConnectionMessages[
            ConfirmConnectionMessage.CachingDisabled
          ]}
        />
      );
    } else if (cachingTimeout) {
      cachingDescription = (
        <FormattedMessage
          {...IntlConfirmConnectionMessages[
            ConfirmConnectionMessage.CachingFor
          ]}
          values={{ cachingTimeout: cachingTimeout }}
        />
      );
    }
    return (
      <div>
        <h6>
          <FormattedMessage
            {...IntlConfirmConnectionMessages[
              ConfirmConnectionMessage.CacheResultsHeading
            ]}
          />
        </h6>
        {dataConnectionStore.detailsStore && cachingDescription}
      </div>
    );
  },
);
