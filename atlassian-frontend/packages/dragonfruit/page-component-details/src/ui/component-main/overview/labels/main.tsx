import React from 'react';

import { ContentSection } from '@atlassian/dragonfruit-common-ui';
import {
  CompassComponent,
  CompassComponentLabel,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { CompassComponentLabelForUI } from '../../../../common/types';

import { LabelsEditableView } from './editable-view';
import messages from './messages';
import { LabelsReadOnlyView } from './read-only-view';

type Props = {
  componentId: CompassComponent['id'];
  isManagedComponent?: boolean;
  componentLabels?: Array<CompassComponentLabel> | null;
};

const LabelsSection: React.FC<Props> = (props: Props) => {
  const {
    componentId,
    isManagedComponent,
    componentLabels: labelsFromProps,
  } = props;

  const { formatMessage } = useIntl();

  const componentLabels = labelsFromProps ? labelsFromProps : [];
  // Filter any labels that are not loaded correctly and have an empty name
  const labels: CompassComponentLabelForUI[] = componentLabels.filter(
    (label) => !!label.name,
  ) as CompassComponentLabelForUI[];

  return (
    <ContentSection
      title={formatMessage(messages.labelsSectionTitle)}
      name={'labels'}
    >
      {isManagedComponent ? (
        <LabelsReadOnlyView labels={labels} />
      ) : (
        <LabelsEditableView componentId={componentId} labels={labels} />
      )}
    </ContentSection>
  );
};

export default withErrorBoundary(LabelsSection, {
  componentName: 'ComponentsLabels',
});
