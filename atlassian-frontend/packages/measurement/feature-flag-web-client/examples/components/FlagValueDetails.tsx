import React, { ReactNode } from 'react';

import Button, { ButtonGroup } from '@atlaskit/button';
import { Grid, GridColumn } from '@atlaskit/page';
import TextArea from '@atlaskit/textarea';

import FeatureFlagClient from '../../src/api';

import { ClientContext } from './Initialisation';
import { GridContent } from './styles';

const DEFAULT_FLAG_VALUE_ARGS = {
  flagKey: 'ffs-test-string',
  defaultValue: 'blah',
  options: {
    oneOf: [],
    shouldSendExposureEvent: false,
  },
};

type FlagValueState = {
  flagValue?: any;
  argsText: string;
};

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class FlagValueDetails extends React.Component<
  Record<string, unknown>,
  FlagValueState
> {
  state: Readonly<FlagValueState> = {
    argsText: JSON.stringify(DEFAULT_FLAG_VALUE_ARGS, null, 2),
  };

  updateArgsText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      argsText: event.target.value,
    });
  };

  getFlagDetails = (client?: FeatureFlagClient): void => {
    if (client) {
      const { argsText } = this.state;
      const args = JSON.parse(argsText);
      const flagValue = JSON.stringify(
        client.getFlagDetails(args.flagKey, args.defaultValue, args.options),
      );
      this.setState({ flagValue });
    }
  };

  renderControls = (client?: FeatureFlagClient): ReactNode => {
    const disabled = !client;

    return (
      <Button
        appearance="primary"
        isDisabled={disabled}
        onClick={(): void => this.getFlagDetails(client)}
      >
        Get Flag Value Details
      </Button>
    );
  };

  render(): ReactNode {
    const { argsText, flagValue } = this.state;
    return (
      <Grid layout="fluid">
        <GridColumn medium={12}>
          <GridContent>
            <h2>Get Flag Value</h2>
          </GridContent>
        </GridColumn>
        <GridColumn medium={6}>
          <h3>Arguments</h3>
          <GridContent>
            <TextArea
              maxHeight="500px"
              value={argsText}
              onChange={this.updateArgsText}
            />
          </GridContent>
        </GridColumn>
        <GridColumn medium={6}>
          <h3>Controls</h3>
          <GridContent>
            <ClientContext.Consumer>
              {(client): ReactNode => (
                <ButtonGroup>{this.renderControls(client)}</ButtonGroup>
              )}
            </ClientContext.Consumer>
          </GridContent>
          <h3>Flag Value</h3>
          <GridContent>{flagValue}</GridContent>
        </GridColumn>
      </Grid>
    );
  }
}
