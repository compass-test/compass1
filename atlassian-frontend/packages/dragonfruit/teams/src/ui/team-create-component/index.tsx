import React from 'react';

import Button from '@atlaskit/button';
import CreateIcon from '@atlaskit/icon/glyph/add';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { CreateComponentForm } from './create-component-form';
import messages from './messages';
import { CreateComponentFormWrapper, CreateComponentWrapper } from './styled';

interface TeamCreateComponentProps {
  teamId: CompassComponent['id'];
  onCancel: () => void;
  onSuccess: () => void;
  formShown: boolean;
  emptyState: boolean;
  formKey: number;
  setFormShown: (formShown: boolean) => void;
}

export const TeamCreateComponent = (props: TeamCreateComponentProps) => {
  const {
    teamId,
    onCancel,
    onSuccess,
    formShown,
    formKey,
    setFormShown,
    emptyState,
  } = props;
  const { formatMessage } = useIntl();

  if (formShown) {
    // Empty state version of the form has slightly different styling
    return emptyState ? (
      <CreateComponentFormWrapper
        data-testid={
          'dragonfruit.page-team-details.team-dashboard.components-list.empty-state.create-component-form'
        }
      >
        <CreateComponentForm
          onCancel={onCancel}
          onSuccess={onSuccess}
          formKey={formKey}
          teamId={teamId}
        />
      </CreateComponentFormWrapper>
    ) : (
      <CreateComponentForm
        onCancel={onCancel}
        onSuccess={onSuccess}
        formKey={formKey}
        teamId={teamId}
      />
    );
  }

  return (
    <CreateComponentWrapper>
      <Button
        appearance="subtle-link"
        iconBefore={
          <CreateIcon
            label={formatMessage(messages.createComponentButtonIcon)}
            size="small"
          />
        }
        testId="dragonfruit.teams.team-create-component-button"
        onClick={() => setFormShown(true)}
      >
        {formatMessage(messages.createComponentButton)}
      </Button>
    </CreateComponentWrapper>
  );
};
