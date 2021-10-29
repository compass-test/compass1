import React, { ReactNode } from 'react';

import AnalyticsWebClient from '@atlassiansox/analytics-web-client';
import { action } from '@storybook/addon-actions';

import Button, { ButtonGroup } from '@atlaskit/button';
import Lozenge from '@atlaskit/lozenge';
import Page, { Grid, GridColumn } from '@atlaskit/page';
import TextArea from '@atlaskit/textarea';

import FeatureFlagClient, {
  AnalyticsClientInterface,
  EnvironmentType,
  Identifiers,
  ReadyResponse,
} from '../../src';
import { STORAGE_KEY_PREFIX } from '../../src/storage/Storage';

import { GridContent } from './styles';

import '@atlaskit/css-reset';

export const ClientContext = React.createContext<FeatureFlagClient | undefined>(
  undefined,
);

const DEFAULT_CLIENT_SETTINGS = {
  apiKey: '2649ebec-e1f7-4f61-8be0-40edd400ec27',
  featureFlagUser: {
    identifier: {
      type: Identifiers.TRELLO_USER_ID,
      value: '123456',
    },
    isAnonymous: false,
    custom: {
      attrKey1: 'attrVal1',
      attrKey2: 1234,
      attrKey3: false,
    },
  },
  options: {
    productKey: 'someProductKey',
    environment: EnvironmentType.DEV,
    pollingInterval: 5000,
    readyTimeoutInMilliseconds: 3000,
  },
};

enum ClientStatus {
  NOT_INITIALISED = 'Not Initialised',
  INITIALISED = 'Initialised',
}

type InitialisationState = {
  client?: FeatureFlagClient;
  clientStatus: ClientStatus;
  settingsText: string;
  analyticsClient: AnalyticsClientInterface;
  initialisationStart?: number;
  unsubscribeAllFlags?: () => void;
};

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class Initialisation extends React.Component<
  Record<string, unknown>,
  InitialisationState
> {
  state: Readonly<InitialisationState> = {
    clientStatus: ClientStatus.NOT_INITIALISED,
    settingsText: JSON.stringify(DEFAULT_CLIENT_SETTINGS, null, 2),
    analyticsClient: new AnalyticsWebClient({
      env: 'local',
      product: 'featureFlagWebClient',
      origin: 'web',
    }),
  };

  componentWillUnmount(): void {
    const { unsubscribeAllFlags } = this.state;
    if (unsubscribeAllFlags) {
      unsubscribeAllFlags();
    }
    const { client } = this.state;
    client?.destroy();
  }

  initialiseClient = (): void => {
    const { settingsText, analyticsClient } = this.state;
    const settings = JSON.parse(settingsText);

    this.setState({ initialisationStart: Date.now() });

    const client = new FeatureFlagClient(
      settings.apiKey,
      {
        sendOperationalEvent: (event): void => {
          action('feature exposed event')(event);
          analyticsClient.sendOperationalEvent(event);
        },
      },
      settings.featureFlagUser,
      settings.options,
    );

    client.ready().then((readyReason: ReadyResponse) => {
      const initialisationEnd = Date.now();
      // eslint-disable-next-line react/destructuring-assignment
      const initialisationStart = this.state.initialisationStart || 0;
      const timeTaken = `${initialisationEnd - initialisationStart}ms`;
      action('client.ready() resolved')(
        `Reason: ${JSON.stringify(readyReason)}, Time taken: ${timeTaken}`,
      );
      const unsubscribeAllFlags = client.onAnyFlagUpdated(
        this.anyFlagChangeCallback,
      );
      this.setState({ unsubscribeAllFlags });
    });

    this.setState({
      client,
      clientStatus: ClientStatus.INITIALISED,
    });
  };

  anyFlagChangeCallback = (): void => {
    action('Some flag has been updated')();
  };

  printAllFlags = (): void => {
    const { client } = this.state;
    if (client) {
      action('All flags')(client.getFlags());
    }
  };

  updateSettingsText = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ): void => {
    this.setState({
      settingsText: event.target.value,
    });
  };

  stopClient = (): void => {
    const { client } = this.state;
    client?.destroy();

    this.setState({
      clientStatus: ClientStatus.NOT_INITIALISED,
      initialisationStart: undefined,
    });
  };

  purgeLocalstorage = (): void => {
    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith(STORAGE_KEY_PREFIX),
    );

    if (keys.length !== 0) {
      action('purging localStorage keys')(...keys);
      keys.forEach((key) => localStorage.removeItem(key));
    } else {
      action('no keys to remove from localStorage')();
    }
  };

  renderClientControls = (): ReactNode => {
    const { clientStatus } = this.state;
    if (clientStatus === ClientStatus.NOT_INITIALISED) {
      return (
        <Button appearance="primary" onClick={this.initialiseClient}>
          Initialise
        </Button>
      );
    }
    return <Button onClick={this.stopClient}>Stop</Button>;
  };

  renderControls = (): ReactNode => {
    const { client } = this.state;
    return (
      <ButtonGroup>
        {this.renderClientControls()}
        <Button onClick={this.purgeLocalstorage}>Purge storage</Button>
        <Button onClick={this.printAllFlags} isDisabled={client === undefined}>
          Print all flags
        </Button>
      </ButtonGroup>
    );
  };

  renderStatus = (): ReactNode => {
    const { clientStatus } = this.state;
    const appearance =
      ClientStatus.INITIALISED === clientStatus ? 'success' : 'default';
    return <Lozenge appearance={appearance}>{clientStatus}</Lozenge>;
  };

  render(): ReactNode {
    const { settingsText, client } = this.state;
    const { children } = this.props;
    return (
      <Page>
        <Grid layout="fluid">
          <GridColumn medium={12}>
            <GridContent>
              <h2>Client Initialisation</h2>
            </GridContent>
          </GridColumn>
          <GridColumn medium={6}>
            <h3>Settings</h3>
            <GridContent>
              <TextArea
                maxHeight="500px"
                value={settingsText}
                onChange={this.updateSettingsText}
              />
            </GridContent>
          </GridColumn>
          <GridColumn medium={6}>
            <h3>Controls</h3>
            <GridContent>{this.renderControls()}</GridContent>
            <h3>Status</h3>
            <GridContent>{this.renderStatus()}</GridContent>
          </GridColumn>
        </Grid>
        <ClientContext.Provider value={client}>
          {children}
        </ClientContext.Provider>
      </Page>
    );
  }
}
