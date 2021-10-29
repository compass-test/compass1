import React from 'react';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import CreateIcon from '@atlaskit/icon/glyph/add';
import {
  fireTrackAnalytics,
  fireUIAnalytics,
} from '@atlassian/analytics-bridge';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { CreateComponentForm } from './create-component-form';
import messages from './messages';
import { CreateComponentWrapper } from './styled';

interface InlineCreateComponentProps {
  componentType: CompassComponentType;
  onCancel: () => void;
  onSuccess: () => void;
  formShown: boolean;
  setFormShown: (formShown: boolean) => void;
}

export const InlineCreateComponent = (props: InlineCreateComponentProps) => {
  const { componentType, onCancel, onSuccess, formShown, setFormShown } = props;
  const { formatMessage } = useIntl();
  const { createAnalyticsEvent } = useAnalyticsEvents();

  if (formShown) {
    return (
      <CreateComponentForm
        componentType={componentType}
        onCancel={(event, analyticsEvent) => {
          fireUIAnalytics(analyticsEvent, 'cancelInlineCreateComponent', {
            componentType,
          });
          onCancel();
        }}
        onSuccess={() => {
          fireTrackAnalytics(
            createAnalyticsEvent({}),
            'inlineComponent created',
            'inlineCreateComponent',
            {
              componentType,
            },
          );
          onSuccess();
        }}
      />
    );
  }

  return (
    <CreateComponentWrapper>
      <Button
        appearance="link"
        iconBefore={
          <CreateIcon
            label={formatMessage(messages.createComponentButtonIcon)}
            size="small"
          />
        }
        testId="dragonfruit.component-list.inline-create-component.open-inline-form-button"
        onClick={(event, analyticsEvent) => {
          fireUIAnalytics(analyticsEvent, 'inlineCreateComponent', {
            componentType,
          });
          setFormShown(true);
        }}
      >
        {formatMessage(messages.createComponentButton)}
      </Button>
    </CreateComponentWrapper>
  );
};
