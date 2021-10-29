import React from 'react';

import { MutationUpdaterFn } from '@apollo/client';

import Button from '@atlaskit/button';
import EmptyState from '@atlaskit/empty-state';
import { Dependencies } from '@atlassian/dragonfruit-common-ui/assets';
import { CONFIG_AS_CODE_DAC_LINK } from '@atlassian/dragonfruit-external-component-management/constants';
import {
  CompassComponentDataManager,
  CompassComponentInRelationshipViewFragment,
  CreateRelationshipMutation,
} from '@atlassian/dragonfruit-graphql';
import { openInNewTab, useIntl } from '@atlassian/dragonfruit-utils';

import { EmptyStateForm } from './empty-state-form';
import messages from './messages';
import { FormContainer } from './styled';

export type RelationshipsEmptyStateProps = {
  currentComponent: CompassComponentInRelationshipViewFragment;
  dataManager?: CompassComponentDataManager | null;
  updateCreateMutation?: MutationUpdaterFn<CreateRelationshipMutation>;
};

export const RelationshipsEmptyState = (
  props: RelationshipsEmptyStateProps,
) => {
  const { currentComponent, dataManager, updateCreateMutation } = props;
  const { formatMessage } = useIntl();
  const isManagedComponent = Boolean(dataManager);

  const emptyStateDescription = isManagedComponent ? (
    <>
      {formatMessage(messages.emptyStateDescription)}{' '}
      <a
        href={CONFIG_AS_CODE_DAC_LINK}
        target="_blank"
        rel="noopener noreferrer"
      >
        {formatMessage(messages.learnMore)}
      </a>
    </>
  ) : (
    <>{formatMessage(messages.emptyStateDescription)}</>
  );

  const externalSourceButton = (
    <Button
      appearance="primary"
      onClick={() => openInNewTab(dataManager?.externalSourceURL)}
    >
      {formatMessage(messages.configAsCodePrompt)}
    </Button>
  );

  const addRelationshipForm = (
    <FormContainer>
      <EmptyStateForm
        currentComponent={currentComponent}
        updateCreateMutation={updateCreateMutation}
      />
    </FormContainer>
  );

  return (
    <EmptyState
      header={formatMessage(messages.emptyStateHeading)}
      description={emptyStateDescription}
      imageUrl={Dependencies}
      tertiaryAction={
        isManagedComponent ? externalSourceButton : addRelationshipForm
      }
    />
  );
};
