import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { graphql, useFragment } from 'react-relay';

import { useAnalyticsEvents } from '@atlaskit/analytics-next';
import Button from '@atlaskit/button';
import { Field, FieldProps } from '@atlaskit/form';
import AddCircleIcon from '@atlaskit/icon/glyph/add-circle';
import QuestionCircleIcon from '@atlaskit/icon/glyph/question-circle';
import Toggle from '@atlaskit/toggle';
import Tooltip from '@atlaskit/tooltip';
import { sendUIEvent } from '@atlassian/performance-portal-analytics';

import {
  getThresholdItemDefaultValue,
  isSupportedEventType,
  SupportedEventType,
} from '../../../common/utils/threshold-item-default-value';
import { ThresholdItemFormValue } from '../../../types';

import type { thresholdList_alertConfigs_Fragment$key } from './__generated__/thresholdList_alertConfigs_Fragment.graphql';
import type { thresholdList_metric_Fragment$key } from './__generated__/thresholdList_metric_Fragment.graphql';
import {
  AdvancedToggleHelpTooltip,
  AdvancedToggleLabel,
  AdvancedToggleWrapper,
  ThresholdTitle,
} from './styled';
import { ThresholdItem } from './threshold-item';

const isSimpleThresholdItem = (
  eventType: SupportedEventType,
  item: Partial<ThresholdItemFormValue>,
) => {
  if (item.isDeleted) {
    return true;
  }

  const wouldBeSubmittedItem = {
    ...getThresholdItemDefaultValue(eventType),
    ...item,
  };
  const {
    env,
    pageLoadType,
    cohortType,
    cohortValue,
    comparisonType,
    ignoreWeekend,
  } = wouldBeSubmittedItem;
  return (
    (!env || env === 'PROD') &&
    (!pageLoadType || pageLoadType === 'COMBINED') &&
    (!cohortType || cohortType === 'ALL') &&
    (!cohortValue || cohortValue === 'all') &&
    (!comparisonType || comparisonType === 'WoW') &&
    ignoreWeekend
  );
};

export interface Props {
  fieldProps: FieldProps<any>;
  alertConfigsData: thresholdList_alertConfigs_Fragment$key | null;
  metricData: thresholdList_metric_Fragment$key;
  setFieldValue: (name: string, value: any) => void;
}
export const ThresholdList = (props: Props) => {
  const { setFieldValue, fieldProps } = props;
  const thresholds = useMemo(() => (fieldProps.value as Array<any>) ?? [], [
    fieldProps.value,
  ]);

  const alertConfigData = useFragment(
    graphql`
      fragment thresholdList_alertConfigs_Fragment on AlertConfig
      @relay(plural: true) {
        id
        ...thresholdItem_alertConfig_Fragment
      }
    `,
    props.alertConfigsData,
  );

  const metricData = useFragment(
    graphql`
      fragment thresholdList_metric_Fragment on Metric {
        ... on BrowserMetric {
          eventType
        }
        ...thresholdItem_metric_Fragment
      }
    `,
    props.metricData,
  );

  if (!metricData.eventType) {
    throw new Error('Unexpected condition null eventType');
  }

  const eventType = metricData.eventType;

  if (!isSupportedEventType(eventType)) {
    throw new Error(`Unsupported Experience event type ${eventType}`);
  }

  const canShowInSimpleView = useMemo(() => {
    if (thresholds && thresholds.length > 0) {
      return (
        thresholds?.find((t) => !isSimpleThresholdItem(eventType, t)) == null
      );
    }

    if (alertConfigData && alertConfigData.length > 0) {
      return (
        alertConfigData?.find((t) => !isSimpleThresholdItem(eventType, t)) ==
        null
      );
    }

    return true;
  }, [alertConfigData, eventType, thresholds]);

  const [showAdvancedView, setShowAdvancedView] = useState(
    !canShowInSimpleView,
  );

  useEffect(() => {
    if (!canShowInSimpleView) {
      setShowAdvancedView(true);
    }
  }, [canShowInSimpleView]);

  const isAdvancedToggleDisabled = useMemo(() => !canShowInSimpleView, [
    canShowInSimpleView,
  ]);

  const { createAnalyticsEvent } = useAnalyticsEvents();
  const advancedToggleOnChangeHandler = useCallback(() => {
    setShowAdvancedView((prev) => {
      const newVal = !prev;

      const analyticsEvent = createAnalyticsEvent({
        actionSubject: 'advancedAlertConfigToggle',
        action: 'clicked',
        source: 'metricAlertsConfigForm',
        attributes: {
          value: newVal,
        },
      });
      sendUIEvent(analyticsEvent);

      return newVal;
    });
  }, [createAnalyticsEvent]);

  return (
    <>
      <ThresholdTitle>Thresholds</ThresholdTitle>
      <AdvancedToggleWrapper>
        <Toggle
          isChecked={showAdvancedView}
          onChange={advancedToggleOnChangeHandler}
          isDisabled={isAdvancedToggleDisabled}
        />
        <AdvancedToggleLabel isDisabled={isAdvancedToggleDisabled}>
          Advanced
        </AdvancedToggleLabel>
        <AdvancedToggleHelpTooltip>
          <Tooltip
            content={
              isAdvancedToggleDisabled
                ? 'Advanced mode locked in due to some values selected'
                : 'Advanced mode allows you to configure more options'
            }
          >
            <QuestionCircleIcon label="Help" size="small" />
          </Tooltip>
        </AdvancedToggleHelpTooltip>
      </AdvancedToggleWrapper>
      {thresholds.map((threshold, i) => {
        if (threshold.isDeleted === true) {
          return (
            <Field name={`thresholds[${i}].isDeleted`} defaultValue={true}>
              {() => null}
            </Field>
          );
        }
        return (
          <ThresholdItem
            key={threshold.id ?? `new-threshold-${i}`}
            threshold={threshold}
            index={i}
            alertConfigData={
              alertConfigData?.find(
                (thresholdData) => thresholdData.id === threshold.id,
              ) ?? null
            }
            metricData={metricData}
            showAdvancedView={showAdvancedView}
            setFieldValue={setFieldValue}
          />
        );
      })}
      <div>
        <Button
          appearance={'subtle'}
          iconAfter={<AddCircleIcon label="" />}
          onClick={() => {
            props.fieldProps.onChange([
              ...thresholds,
              {
                ...getThresholdItemDefaultValue(eventType),
                isDeleted: false,
              },
            ]);
          }}
        />
      </div>
    </>
  );
};
