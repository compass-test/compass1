import React, { ReactNode } from 'react';

import { action } from '@storybook/addon-actions';

import Button, { ButtonGroup } from '@atlaskit/button';
import { Grid, GridColumn } from '@atlaskit/page';
import TextArea from '@atlaskit/textarea';

import { Identifiers } from '../../src';
import FeatureFlagClient from '../../src/api';

import { ClientContext } from './Initialisation';
import { GridContent } from './styles';

const DEFAULT_USER = {
  identifier: {
    type: Identifiers.TRELLO_USER_ID,
    value: '56789',
  },
  isAnonymous: false,
  custom: {
    attrKey1: 'attrVal1',
    attrKey2: 1234,
    attrKey3: false,
  },
};

type UpdateUserState = {
  userText: string;
};

// eslint-disable-next-line @repo/internal/react/no-class-components
export default class UpdateUser extends React.Component<
  Record<string, unknown>,
  UpdateUserState
> {
  state: Readonly<UpdateUserState> = {
    userText: JSON.stringify(DEFAULT_USER, null, 2),
  };

  updateUserText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    this.setState({
      userText: event.target.value,
    });
  };

  updateUser = (client?: FeatureFlagClient): void => {
    if (client) {
      const { userText } = this.state;
      const user = JSON.parse(userText);
      client
        .updateFeatureFlagUser(user)
        .then(() => action('user updated')(user));
    }
  };

  renderControls = (client?: FeatureFlagClient): ReactNode => {
    const disabled = !client;
    return (
      <Button
        appearance="primary"
        isDisabled={disabled}
        onClick={(): void => this.updateUser(client)}
      >
        Update User
      </Button>
    );
  };

  render(): ReactNode {
    const { userText } = this.state;
    return (
      <Grid layout="fluid">
        <GridColumn medium={12}>
          <GridContent>
            <h2>Update Flag User</h2>
          </GridContent>
        </GridColumn>
        <GridColumn medium={6}>
          <h3>Arguments</h3>
          <GridContent>
            <TextArea
              maxHeight="500px"
              value={userText}
              onChange={this.updateUserText}
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
        </GridColumn>
      </Grid>
    );
  }
}
