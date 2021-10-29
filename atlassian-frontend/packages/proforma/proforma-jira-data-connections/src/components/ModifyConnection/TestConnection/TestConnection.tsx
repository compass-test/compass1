import React, { useEffect } from 'react';

import { observer } from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import Lozenge from '@atlaskit/lozenge';
import SectionMessage from '@atlaskit/section-message';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import TextArea from '@atlaskit/textarea';
import {
  LoadingSpinner,
  PfLink,
} from '@atlassian/proforma-common-core/jira-common';
import { usePfBrowserUtils } from '@atlassian/proforma-common-core/jira-common-context';

import { ConnectionItemLocationsResponse } from '../../../models/ConnectionItemLocationsResponse';
import { ConnectionType } from '../../../models/ConnectionType';
import { DataConnectionStore } from '../../../stores/DataConnectionStore';
import { Footer } from '../Footer';
import { WizardSection } from '../styled';

import {
  IntlTestConnectionMessages,
  TestConnectionMessage,
} from './TestConnectionMessages.intl';

interface TestConnectionProps {
  dataConnectionStore: DataConnectionStore;
  previousWizardStep: () => void;
  nextWizardStep: () => void;
}

export const TestConnection = observer(
  ({
    dataConnectionStore,
    previousWizardStep,
    nextWizardStep,
  }: TestConnectionProps) => {
    useEffect(() => {
      dataConnectionStore.testConnection();
    }, [dataConnectionStore]);

    const itemsResponse = dataConnectionStore.testItemLocationsResponse;
    const enableNextStep =
      itemsResponse &&
      (isHttp2xx(itemsResponse.code) || isHttp3xx(itemsResponse.code));
    return (
      <>
        <WizardSection>
          <h2>{dataConnectionStore.name}</h2>
          <br />
          {dataConnectionStore.testing && (
            <LoadingSpinner
              message={
                IntlTestConnectionMessages[
                  TestConnectionMessage.TestingConnectionTo
                ]
              }
              values={{ source: dataConnectionStore.detailsStore?.getSource() }}
            />
          )}
          {itemsResponse && (
            <ConnectionItemLocationsResponseField
              itemsResponse={itemsResponse}
              connectionType={dataConnectionStore.type}
            />
          )}
        </WizardSection>
        <Footer
          previousWizardStep={previousWizardStep}
          nextWizardStep={nextWizardStep}
          disableNextStep={!enableNextStep}
        />
      </>
    );
  },
);

const TextAreaField = observer(({ text }: { text: string }) => {
  return (
    <TextArea
      appearance="standard"
      isCompact={false}
      isDisabled={false}
      isReadOnly={true}
      isRequired={true}
      isInvalid={false}
      minimumRows={20}
      maxHeight={'1000px'}
      isMonospaced={true}
      value={text}
      defaultValue={undefined}
      resize={'none'}
      spellCheck={false}
      theme={undefined}
      onBlur={undefined}
      onChange={undefined}
      onFocus={undefined}
    />
  );
});

const ConnectionItemLocationsResponseField = observer(
  ({
    itemsResponse,
    connectionType,
  }: {
    itemsResponse: ConnectionItemLocationsResponse;
    connectionType?: ConnectionType;
  }) => {
    const responseCode = itemsResponse.code;

    return (
      <div>
        <Tabs id="proforma-data-connection-test">
          <TabList>
            <Tab>
              <FormattedMessage
                {...IntlTestConnectionMessages[
                  TestConnectionMessage.SummaryTabLabel
                ]}
              />
            </Tab>
            {connectionType === ConnectionType.RestApi && (
              <Tab>
                <FormattedMessage
                  {...IntlTestConnectionMessages[
                    TestConnectionMessage.RequestTabLabel
                  ]}
                />
              </Tab>
            )}
            <Tab>
              <FormattedMessage
                {...IntlTestConnectionMessages[
                  TestConnectionMessage.ResponseTabLabel
                ]}
              />
            </Tab>
          </TabList>
          <TabPanel>
            <div>
              <br />
              <div>
                <FormattedMessage
                  {...IntlTestConnectionMessages[
                    TestConnectionMessage.HttpResponse
                  ]}
                  values={{ responseCode }}
                />
                &nbsp;
                <LozengeField responseCode={responseCode} />
              </div>
              <br />
              <div>
                <ConnectionItemLocationsMessageField
                  responseCode={responseCode}
                />
              </div>
            </div>
          </TabPanel>
          {connectionType === ConnectionType.RestApi && (
            <TabPanel>
              <TextAreaField text={(itemsResponse.request || []).join('\n')} />
            </TabPanel>
          )}
          <TabPanel>
            <TextAreaField
              text={[itemsResponse.headers.join('\n'), itemsResponse.data]
                .filter(a => a)
                .join('\n\n')}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  },
);

const LozengeField = observer(({ responseCode }: { responseCode: number }) => {
  if (isHttp2xx(responseCode)) {
    return (
      <Lozenge appearance="success" isBold={true}>
        <FormattedMessage
          {...IntlTestConnectionMessages[TestConnectionMessage.SuccessMessage]}
        />
      </Lozenge>
    );
  } else if (isHttp3xx(responseCode)) {
    return (
      <Lozenge appearance="moved" isBold={true}>
        <FormattedMessage
          {...IntlTestConnectionMessages[TestConnectionMessage.MovedMessage]}
        />
      </Lozenge>
    );
  } else {
    return (
      <Lozenge appearance="removed" isBold={true}>
        <FormattedMessage
          {...IntlTestConnectionMessages[TestConnectionMessage.RemovedMessage]}
        />
      </Lozenge>
    );
  }
});

const ConnectionItemLocationsMessageField = observer(
  ({ responseCode }: { responseCode: number }) => {
    const browserUtils = usePfBrowserUtils();
    if (isHttp2xx(responseCode)) {
      return (
        <SectionMessage appearance="discovery">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseSuccessTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseSuccessPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (isHttp3xx(responseCode)) {
      return (
        <SectionMessage appearance="warning">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseRedirectionTitle
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 401) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseUnauthorisedTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseUnauthorisedPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 403) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseForbiddenTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseForbiddenPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 404) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseNotFoundTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseNotFoundPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 496) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response496Title
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response496Para1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 497) {
      const url = browserUtils.createJiraUrl('/plugins/servlet/whitelist');

      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response497Title
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response497Para1Part1
              ]}
            />
            &nbsp;
            {url ? (
              <PfLink
                href={url}
                message={
                  IntlTestConnectionMessages[
                    TestConnectionMessage.Response497Para1Part2
                  ]
                }
              />
            ) : (
              <FormattedMessage
                {...IntlTestConnectionMessages[
                  TestConnectionMessage.Response497Para1Part2
                ]}
              />
            )}
            &nbsp;
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response497Para1Part3
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response497Para2Part1
              ]}
            />
            &nbsp;
            <PfLink
              href="http://links.thinktilt.net/whitelist-docs"
              message={
                IntlTestConnectionMessages[
                  TestConnectionMessage.Response497Para2Part2
                ]
              }
            />
            &nbsp;
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response497Para2Part3
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 498) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response498Title
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response498Para1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 499) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response499Title
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.Response499Para1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 502) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseBadGatewayTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseBadGatewayPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    if (responseCode === 504) {
      return (
        <SectionMessage appearance="error">
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseGatewayTimeoutTitle
              ]}
            />
          </p>
          <p>
            <FormattedMessage
              {...IntlTestConnectionMessages[
                TestConnectionMessage.ResponseGatewayTimeoutPara1
              ]}
            />
          </p>
        </SectionMessage>
      );
    }
    return (
      <SectionMessage appearance="error">
        <p>
          <FormattedMessage
            {...IntlTestConnectionMessages[
              TestConnectionMessage.ResponseOtherErrorPara1
            ]}
          />
        </p>
      </SectionMessage>
    );
  },
);

const isHttp2xx = (code: number): boolean => {
  return code >= 200 && code <= 299;
};

const isHttp3xx = (code: number): boolean => {
  return code >= 300 && code <= 399;
};
