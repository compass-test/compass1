import React, { Suspense, useCallback } from 'react';

import { graphql, useLazyLoadQuery, useMutation } from 'react-relay';
import { usePathParam } from 'react-resource-router';

import { MetricFormData } from '../../types';
import {
  MetricEditorModal,
  MetricEditorModalLoading,
  MetricModalProps,
  // eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
} from '../metric-editor-modal';

import type { editMetricEditorModal_deleteGoal_Mutation } from './__generated__/editMetricEditorModal_deleteGoal_Mutation.graphql';
import type { editMetricEditorModal_updateBrowserMetric_Mutation } from './__generated__/editMetricEditorModal_updateBrowserMetric_Mutation.graphql';
import type { editMetricEditorModalQuery } from './__generated__/editMetricEditorModalQuery.graphql';

type EditMetricEditorModalProps = Pick<
  MetricModalProps,
  'isOpen' | 'closeModalHandler'
>;

const EditMetricEditorModalMain = ({
  isOpen,
  closeModalHandler,
}: EditMetricEditorModalProps) => {
  const [eventKey] = usePathParam('eventKey');

  // eslint-disable-next-line relay/generated-flow-types
  const data = useLazyLoadQuery<editMetricEditorModalQuery>(
    graphql`
      query editMetricEditorModalQuery($eventKey: String!) {
        metricByEventKey(eventKey: $eventKey) {
          id
          ...metricEditorModalFragment
        }
      }
    `,
    { eventKey: eventKey! },
  );

  const metricId = data.metricByEventKey!.id;

  const [
    commitUpdateBrowserMetricMutation,
    isUpdateBrowserMetricInFlight,
  ] = useMutation<editMetricEditorModal_updateBrowserMetric_Mutation>(graphql`
    mutation editMetricEditorModal_updateBrowserMetric_Mutation(
      $input: UpdateBrowserMetricInput!
    ) {
      updateBrowserMetric(input: $input) {
        success
        errors {
          message
        }
        browserMetric {
          id
          name
          key
          eventType
          product
          slackChannel
          owner {
            ... on Team {
              id
              teamName
            }
          }
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
  `);

  const [commitDeleteGoalMutation, isDeleteGoalInFlight] = useMutation<
    editMetricEditorModal_deleteGoal_Mutation
  >(graphql`
    mutation editMetricEditorModal_deleteGoal_Mutation(
      $input: DeleteNodeInput!
    ) {
      deleteNode(input: $input) {
        success
      }
    }
  `);

  const onSubmit: MetricModalProps['onSubmit'] = useCallback(
    async (formData: MetricFormData) => {
      const goalsToDelete = formData.goals?.filter(
        (g) => g.id != null && g.isDeleted,
      );

      const patchPayload = {
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

      if (goalsToDelete) {
        await Promise.all(
          goalsToDelete.map((g) => {
            return new Promise((resolve) => {
              commitDeleteGoalMutation({
                variables: { input: { id: g.id! } },
                onCompleted: resolve,
              });
            });
          }),
        );
      }

      await new Promise((resolve) => {
        commitUpdateBrowserMetricMutation({
          variables: {
            input: {
              id: metricId,
              patch: patchPayload,
            },
          },
          onCompleted: resolve,
        });
      });

      closeModalHandler();
    },
    [
      closeModalHandler,
      commitDeleteGoalMutation,
      commitUpdateBrowserMetricMutation,
      metricId,
    ],
  );

  return (
    <MetricEditorModal
      isOpen={isOpen}
      closeModalHandler={closeModalHandler}
      data={data.metricByEventKey}
      onSubmit={onSubmit}
      isSaving={isUpdateBrowserMetricInFlight || isDeleteGoalInFlight}
    />
  );
};

export const EditMetricEditorModal = (props: EditMetricEditorModalProps) => {
  return (
    <Suspense fallback={<MetricEditorModalLoading />}>
      <EditMetricEditorModalMain {...props} />
    </Suspense>
  );
};
