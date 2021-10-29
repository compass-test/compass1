import { useCallback, useMemo } from 'react';

import { graphql, useMutation } from 'react-relay';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import { SupportedEventType } from '../common/utils/threshold-item-default-value';
import { AlertConfigFormValues } from '../types';

import type { useFormSubmit_batchSaveAlertConfigs_Mutation } from './__generated__/useFormSubmit_batchSaveAlertConfigs_Mutation.graphql';
import type { useFormSubmit_udpateBrowserMetric_Mutation } from './__generated__/useFormSubmit_udpateBrowserMetric_Mutation.graphql';
import { toCreateAlertConfigInput } from './to-create-alert-config-input';
import { toUpdateAlertConfigInput } from './to-update-alert-config-input';

export const useFormSubmit = (
  metricId: string,
  eventType: SupportedEventType,
  closeModalHandler: () => void | Promise<void>,
) => {
  const { createAnalyticsEvent } = useAnalyticsEvents();

  const [
    commitSaveAlertConfigsMutation,
    isSaveAlertConfigsMutationInFlight,
  ] = useMutation<useFormSubmit_batchSaveAlertConfigs_Mutation>(graphql`
    mutation useFormSubmit_batchSaveAlertConfigs_Mutation(
      $input: BatchSaveAlertConfigs!
    ) {
      batchSaveAlertConfigs(input: $input) {
        success
        errors {
          message
        }
      }
    }
  `);

  const [
    commitUpdateBrowserMetricMutation,
    isUpdateBrowserMetricMutationInFlight,
  ] = useMutation<useFormSubmit_udpateBrowserMetric_Mutation>(graphql`
    mutation useFormSubmit_udpateBrowserMetric_Mutation(
      $input: UpdateBrowserMetricInput!
    ) {
      updateBrowserMetric(input: $input) {
        success
        errors {
          message
        }
        browserMetric {
          id
          opsgenieTeamId
          alertConfigs {
            id
            env
            pageLoadType
            metricType
            percentile
            cohortType
            cohortValue
            thresholdValue
            thresholdType
            comparisonType
            priority
            ignoreWeekend
          }
        }
      }
    }
  `);

  const onFormSubmit = useCallback(
    async (formData: AlertConfigFormValues) => {
      await new Promise((resolve, reject) => {
        const alertConfigsToCreate = formData.thresholds
          .filter((t) => t.id == null && !t.isDeleted)
          .map(toCreateAlertConfigInput(metricId, eventType));

        const alertConfigsToUpdate = formData.thresholds
          .filter((t) => t.id != null && !t.isDeleted)
          .map(toUpdateAlertConfigInput(eventType));

        const alertConfigsToDelete = formData.thresholds
          .filter((t) => t.id != null && t.isDeleted)
          .map((t) => t.id!);

        commitSaveAlertConfigsMutation({
          variables: {
            input: {
              alertConfigsToCreate,
              alertConfigsToUpdate,
              alertConfigsToDelete,
            },
          },
          onCompleted: resolve,
          onError: reject,
        });
      });

      await new Promise((resolve, reject) => {
        commitUpdateBrowserMetricMutation({
          variables: {
            input: {
              id: metricId,
              patch: {
                opsgenieTeamId: formData.opsgenieTeamId,
              },
            },
          },
          onCompleted: resolve,
          onError: reject,
        });
      });

      const analyticsEvent = createAnalyticsEvent({
        actionSubject: 'metricAlertsConfigForm',
        action: 'submitted',
        source: 'metricAlertsConfigForm',
      });
      sendUIEvent(analyticsEvent);
      await closeModalHandler();
    },
    [
      closeModalHandler,
      commitSaveAlertConfigsMutation,
      commitUpdateBrowserMetricMutation,
      createAnalyticsEvent,
      eventType,
      metricId,
    ],
  );

  const isSaving = useMemo(
    () =>
      isUpdateBrowserMetricMutationInFlight ||
      isSaveAlertConfigsMutationInFlight,
    [isSaveAlertConfigsMutationInFlight, isUpdateBrowserMetricMutationInFlight],
  );

  return { onFormSubmit, isSaving };
};
