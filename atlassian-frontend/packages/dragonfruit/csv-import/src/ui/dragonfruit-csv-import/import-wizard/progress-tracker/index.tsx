import React from 'react';

import { ProgressTracker, Stage } from '@atlaskit/progress-tracker';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { State } from '../../../../services/csv-import-reducer';

import messages from './messages';
import { Wrapper } from './styled';

type WizardProgressTrackerProps = { state: State };

export const WizardProgressTracker = ({
  state,
}: WizardProgressTrackerProps) => {
  const { formatMessage } = useIntl();

  // Set up initial items where everything is unvisited and incomplete
  const items = [
    {
      id: 'INITIAL',
      label: formatMessage(messages.progressStateUpload),
      noLink: true,
      percentageComplete: 0,
      status: 'unvisited',
    },
    {
      id: 'CONFIGURE',
      label: formatMessage(messages.progressStateValidation),
      noLink: true,
      percentageComplete: 0,
      status: 'unvisited',
    },
    {
      id: 'PREVIEW',
      label: formatMessage(messages.progressStatePreview),
      noLink: true,
      percentageComplete: 0,
      status: 'unvisited',
    },
    {
      id: 'IMPORTING',
      label: formatMessage(messages.progressStateImport),
      noLink: true,
      percentageComplete: 0,
      status: 'unvisited',
    },
    {
      id: 'COMPLETE',
      label: formatMessage(messages.progressStateFinish),
      noLink: true,
      percentageComplete: 0,
      status: 'unvisited',
    },
  ] as Stage[];

  // Update the items so that the current item is highlighted, previous items are marked as completed, and upcoming items are left as incomplete
  let passedCurrentStep = false;
  items.forEach(item => {
    if (item.id === state.step) {
      item.status = 'current';
      item.percentageComplete = 0;
      passedCurrentStep = true;
    } else {
      if (!passedCurrentStep) {
        item.status = 'visited';
        item.percentageComplete = 100;
      } else {
        item.status = 'unvisited';
        item.percentageComplete = 0;
      }
    }
  });

  return (
    <Wrapper>
      <ProgressTracker items={items} />
    </Wrapper>
  );
};
