import React from 'react';

import { InjectedIntlProps, injectIntl } from 'react-intl';

import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import {
  ContentSection,
  ContentSectionEmptyState,
} from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponentDataManager,
  CompassComponentDetailViewFragment,
} from '@atlassian/dragonfruit-graphql';
import {
  InlineDescription,
  SummaryField,
} from '@atlassian/dragonfruit-services-components';
import { openInNewTab, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import messages from './messages';
import { EmptySummaryContainer, SummaryContainer } from './styled';

interface ComponentSummaryProps {
  componentId: CompassComponentDetailViewFragment['id'];
  componentDescription: CompassComponentDetailViewFragment['description'];
  dataManager?: CompassComponentDataManager;
}

function ComponentSummary(props: ComponentSummaryProps & InjectedIntlProps) {
  const { intl, componentId, componentDescription, dataManager } = props;

  if (!componentDescription && dataManager) {
    return (
      <EmptySummaryContainer>
        <ContentSection
          title={intl.formatMessage(CommonMessages.description)}
          name="description"
          position="main"
        >
          <ContentSectionEmptyState
            actionLabel="Add description"
            onClick={() => openInNewTab(dataManager.externalSourceURL)}
            testId="dragonfruit-page-component-details.ui.description.content-section.empty-state"
          >
            {intl.formatMessage(messages.disabledDescriptionPlaceholder)}
          </ContentSectionEmptyState>
        </ContentSection>
      </EmptySummaryContainer>
    );
  }

  return (
    <SummaryContainer>
      <SummaryField
        heading={intl.formatMessage(CommonMessages.description)}
        testId="dragonfruit-page-component-details.ui.description-field"
      >
        <InlineDescription
          componentId={componentId}
          description={componentDescription}
          isDisabled={!!dataManager}
          placeholder={intl.formatMessage(messages.descriptionPlaceholder)}
          alignText
          keepEditViewOpenOnBlur
          testId="dragonfruit-page-component-details.ui.description.inline-description"
        />
      </SummaryField>
    </SummaryContainer>
  );
}

export default withErrorBoundary(injectIntl(ComponentSummary), {
  componentName: 'componentSummary',
});
