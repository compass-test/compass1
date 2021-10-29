import React, { useCallback } from 'react';

import { graphql, useMutation } from 'react-relay';
import { useRouterActions } from 'react-resource-router';

import { MetricFormData } from '../../types';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { MetricEditorModal, MetricModalProps } from '../metric-editor-modal';

import type { createMetricEditorModalMutation } from './__generated__/createMetricEditorModalMutation.graphql';
type CreateMetricEditorModalProps = Pick<
  MetricModalProps,
  'isOpen' | 'closeModalHandler'
>;

export const CreateMetricEditorModal = ({
  isOpen,
  closeModalHandler,
}: CreateMetricEditorModalProps) => {
  const [commitMutation, isInFlight] = useMutation<
    createMetricEditorModalMutation
  >(
    graphql`
      mutation createMetricEditorModalMutation($input: BrowserMetricInput!) {
        createBrowserMetric(input: $input) {
          success
          errors {
            message
          }
          browserMetric {
            id
            name
            product
            key
            owner {
              ... on Staff {
                id
                fullName
              }
              ... on Team {
                id
                teamName
              }
            }
            slackChannel
            ... on BrowserMetric {
              eventType
              eventKey
            }
            ... on PageLoadMetric {
              toplineGoals {
                id
                name
                value
                percentile
                toplineType
              }
            }
          }
        }
      }
    `,
  );
  const { push } = useRouterActions();
  const onSubmit: MetricModalProps['onSubmit'] = useCallback(
    (formData: MetricFormData) => {
      const inputPayload = {
        name: formData['metric-name'],
        key: formData['event-id'],
        eventType: formData['event-type'],
        product: formData.product,
        slackChannel: formData['slack-channel'],
        owner: {
          teamId: formData['team-id'],
        },
        toplineGoals: formData.goals
          ?.filter((g) => !g.isDeleted)
          .map((g) => {
            return {
              id: g.id,
              name: g.name,
              toplineType: g.toplineType,
              percentile: g.percentile,
              value: Number(g.value),
            };
          }),
      };

      commitMutation({
        variables: {
          input: inputPayload,
        },
        onCompleted: (response) => {
          closeModalHandler();
          const eventKey =
            response.createBrowserMetric?.browserMetric?.eventKey;
          push(`/metric/${eventKey}/?percentile=p90`);
        },
      });
    },
    [closeModalHandler, commitMutation, push],
  );
  return (
    <MetricEditorModal
      isOpen={isOpen}
      closeModalHandler={closeModalHandler}
      data={null}
      onSubmit={onSubmit}
      isSaving={isInFlight}
    />
  );
};
