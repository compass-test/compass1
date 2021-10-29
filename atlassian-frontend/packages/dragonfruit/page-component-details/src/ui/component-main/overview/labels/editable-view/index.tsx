import React, { useState } from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import InlineEdit from '@atlaskit/inline-edit';
import { OptionType, ValueType } from '@atlaskit/select';
import { fireUIAnalytics } from '@atlassian/analytics-bridge';
import { ContentSectionEmptyState } from '@atlassian/dragonfruit-common-ui';
import { CompassComponent } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { CompassComponentLabelForUI } from '../../../../../common/types';

import { ComponentLabelsEditor } from './editor-view';
import messages from './messages';
import { InlineEditWrapper } from './styled';
import { ComponentLabelsViewer } from './viewer';

type Props = {
  componentId: CompassComponent['id'];
  labels: Array<CompassComponentLabelForUI>;
};

export const LabelsEditableView: React.FC<Props> = (props: Props) => {
  const { componentId, labels } = props;

  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();
  const [isEditing, setEditing] = useState<boolean>(false);

  const fireUIAnalyticsEventForEditViewOpen = () => {
    const event = createAnalyticsEvent({
      action: 'opened',
      actionSubject: 'componentLabelsEditView',
    });
    fireUIAnalytics(event);
  };

  // We can't put the empty state on the readView because it adds a border on hover
  // We need to manage the isEditing to be able to open the Editor when clicking on empty state
  if (labels.length === 0 && !isEditing) {
    return (
      <ContentSectionEmptyState
        actionLabel={'Add a label'}
        onClick={() => {
          fireUIAnalyticsEventForEditViewOpen();
          setEditing(true);
        }}
        testId="pollinator.page-component-details.labels-editable-view.empty-state"
      >
        {formatMessage(messages.labelsSectionEmptyState)}
      </ContentSectionEmptyState>
    );
  }

  const EditView = (fieldProps: any) => (
    <ComponentLabelsEditor
      {...fieldProps}
      componentId={componentId}
      labels={labels}
    />
  );

  const ReadView = () => (
    <ComponentLabelsViewer
      labels={labels}
      testId="pollinator.page-component-details.labels-editable-view.read-view"
    />
  );

  return (
    <InlineEditWrapper>
      <InlineEdit<ValueType<OptionType, true>>
        hideActionButtons
        defaultValue={null}
        editView={EditView}
        readView={ReadView}
        readViewFitContainerWidth
        isEditing={isEditing}
        onEdit={() => {
          setEditing(true);
          fireUIAnalyticsEventForEditViewOpen();
        }}
        onCancel={() => setEditing(false)}
        onConfirm={(value: string) => {
          setEditing(false);
        }}
      />
    </InlineEditWrapper>
  );
};
