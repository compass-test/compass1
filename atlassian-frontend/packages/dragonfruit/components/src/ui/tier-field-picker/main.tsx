import React, { useCallback } from 'react';

import { FormattedMessage } from 'react-intl';

import { useFlags } from '@atlaskit/flag';
import { useErrorAnalytics } from '@atlassian/dragonfruit-analytics';
import { BaseErrorFlagProps } from '@atlassian/dragonfruit-common-ui';
import { useComponentTypeFieldDefinitions } from '@atlassian/dragonfruit-field-definitions-context';
import {
  checkCompassMutationSuccess,
  CompassMutationError,
  UpdateComponentFieldTierHandledErrors,
  useUpdateComponentFieldTier,
} from '@atlassian/dragonfruit-graphql';
import { useIntl, withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ANALYTICS_PACKAGE_NAME } from '../../common/constants';

import messages from './messages';
import { TierPicker } from './tier-picker';
import { Props } from './types';

const FIELD_ID = 'compass:tier';

const TierFieldPicker = (props: Props) => {
  const { component, isDisabled = false } = props;
  const { formatMessage } = useIntl();
  const { showFlag } = useFlags();

  const definitions = useComponentTypeFieldDefinitions(component.type);

  const tierOptions: string[] | null =
    definitions[FIELD_ID]?.options?.values ?? null;

  const tierField = component.fields?.find(
    (field) => field.definition?.id === FIELD_ID,
  );

  const currentTier: string | null = tierField?.value?.[0] ?? null;

  const { fireCompassMutationErrorAnalytics } = useErrorAnalytics();

  const showUpdateComponentFieldTierErrorFlag = useCallback(
    (description: FormattedMessage.MessageDescriptor) => {
      showFlag({
        ...BaseErrorFlagProps,
        title: formatMessage(messages.errorTitle),
        description: formatMessage(description),
      });
    },
    [formatMessage, showFlag],
  );

  const [handleMutate] = useUpdateComponentFieldTier();
  const handleChange = useCallback(
    (tier: string) => {
      if (tier !== currentTier) {
        handleMutate({ componentId: component.id, tier })
          .then((mutationResult) =>
            checkCompassMutationSuccess(
              mutationResult?.data?.compass?.updateComponent,
            ),
          )
          .catch((error) => {
            if (error instanceof CompassMutationError) {
              const errorType = error.getFirstErrorType();
              if (
                errorType ===
                UpdateComponentFieldTierHandledErrors.COMPONENT_NOT_FOUND
              ) {
                showUpdateComponentFieldTierErrorFlag(
                  messages.errorComponentNotFound,
                );
                return;
              }
              fireCompassMutationErrorAnalytics({
                error,
                componentName: 'TierFieldPicker',
                packageName: ANALYTICS_PACKAGE_NAME,
              });
            }
            showUpdateComponentFieldTierErrorFlag(messages.errorSaving);
          });
      }
    },
    [
      component,
      currentTier,
      handleMutate,
      fireCompassMutationErrorAnalytics,
      showUpdateComponentFieldTierErrorFlag,
    ],
  );

  if (tierOptions === null || currentTier === null) {
    return null;
  }

  return (
    <TierPicker
      currentValue={currentTier}
      options={tierOptions}
      onChange={handleChange}
      isDisabled={isDisabled}
    />
  );
};

export default withErrorBoundary(TierFieldPicker, { reportErrors: false });
