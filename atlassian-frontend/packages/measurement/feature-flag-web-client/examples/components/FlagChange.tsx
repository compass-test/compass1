import React, { ReactNode } from 'react';

import { action } from '@storybook/addon-actions';

import Button, { ButtonGroup } from '@atlaskit/button';
import DynamicTable from '@atlaskit/dynamic-table';
import { RowType } from '@atlaskit/dynamic-table/types';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import { Grid, GridColumn } from '@atlaskit/page';
import TextArea from '@atlaskit/textarea';

import FeatureFlagClient from '../../src/api';
import { uuidv4 } from '../../src/core/util';

import { ClientContext } from './Initialisation';
import { GridContent } from './styles';

const DEFAULT_FLAG_CHANGE_ARGS = {
  flagKey: 'ffs-test-string',
  defaultValue: 'blah',
  options: {
    oneOf: [],
    shouldSendExposureEvent: false,
  },
};

const HEADER = {
  cells: [
    {
      key: 'flagKey',
      content: 'flagKey',
    },
    {
      key: 'defaultValue',
      content: 'defaultValue',
    },
    {
      key: 'oneOf',
      content: 'oneOf',
    },
    {
      key: 'shouldSendExposureEvent',
      content: 'shouldSendExposureEvent',
    },
    {
      key: 'remove',
      content: 'remove',
    },
  ],
};

type Listener = {
  id: string;
  flagKey: string;
  defaultValue: string;
  oneOf: Array<any>;
  shouldSendExposureEvent: boolean;
  stop: () => void;
};

type FlagChangeState = {
  argsText: string;
  listeners: Array<Listener>;
};

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class FlagChange extends React.Component<
  Record<string, unknown>,
  FlagChangeState
> {
  state: Readonly<FlagChangeState> = {
    argsText: JSON.stringify(DEFAULT_FLAG_CHANGE_ARGS, null, 2),
    listeners: [],
  };

  componentWillUnmount(): void {
    const { listeners } = this.state;
    listeners.forEach((listener) => listener.stop());
  }

  updateArgsText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      argsText: event.target.value,
    });
  };

  handleFlagValueChange = (flagKey: string, flagValue: unknown): void => {
    action('value changed')({ flagKey, flagValue });
  };

  addListener = (client?: FeatureFlagClient): void => {
    if (client) {
      const { argsText, listeners } = this.state;
      const args = JSON.parse(argsText);
      const stop = client.on(
        args.flagKey,
        args.defaultValue,
        (flagValue) => this.handleFlagValueChange(args.flagKey, flagValue),
        args.options,
      );

      listeners.push({
        id: uuidv4(),
        flagKey: args.flagKey,
        defaultValue: args.defaultValue,
        oneOf: args.options?.oneOf || [],
        shouldSendExposureEvent: args.options?.shouldSendExposureEvent,
        stop,
      });

      this.setState({ listeners });
    }
  };

  removeListener = (id: string): void => {
    const { listeners } = this.state;
    const listener = listeners.find((l) => l.id === id);
    listener?.stop();
    this.setState({
      listeners: listeners.filter((l) => l.id !== id),
    });
  };

  renderControls = (client?: FeatureFlagClient): ReactNode => {
    const disabled = !client;

    return (
      <Button
        appearance="primary"
        isDisabled={disabled}
        onClick={(): void => this.addListener(client)}
      >
        Add Listener
      </Button>
    );
  };

  renderShouldSendExposureEvent = (
    shouldSendExposureEvent: boolean,
  ): ReactNode => {
    if (shouldSendExposureEvent) {
      return <CheckCircleIcon label="Yes" primaryColor="#00875A" />;
    }
    return <CrossCircleIcon label="No" primaryColor="#C1C7D0" />;
  };

  renderListeners = (): ReactNode => {
    const { listeners } = this.state;

    const rows = listeners.map(
      (listener): RowType => {
        return {
          key: listener.id,
          cells: [
            {
              content: listener.flagKey,
            },
            {
              content: listener.defaultValue,
            },
            {
              content: listener.oneOf,
            },
            {
              content: this.renderShouldSendExposureEvent(
                listener.shouldSendExposureEvent,
              ),
            },
            {
              content: (
                <Button onClick={(): void => this.removeListener(listener.id)}>
                  Remove
                </Button>
              ),
            },
          ],
        };
      },
    );

    return <DynamicTable rows={rows} head={HEADER} />;
  };

  render(): ReactNode {
    const { argsText } = this.state;
    return (
      <Grid layout="fluid">
        <GridColumn medium={12}>
          <GridContent>
            <h2>Listen For Flag Change</h2>
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
          <h3>Listeners</h3>
          <GridContent>{this.renderListeners()}</GridContent>
        </GridColumn>
      </Grid>
    );
  }
}
