import React from 'react';

import { graphql, useFragment } from 'react-relay';

import Button from '@atlaskit/button';
import { Field } from '@atlaskit/form';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';

import { ThresholdItemFormValue } from '../../../../types';

import type { thresholdItem_alertConfig_Fragment$key } from './__generated__/thresholdItem_alertConfig_Fragment.graphql';
import type { thresholdItem_metric_Fragment$key } from './__generated__/thresholdItem_metric_Fragment.graphql';
import { AdvanceEditThresholdItem } from './advanced-edit-threshold-item';
import { SimpleEditThresholdItem } from './simple-edit-threshold-item';
import { FieldWrapper, ThresholdItemWrapper } from './styled';
export interface Props {
  threshold: ThresholdItemFormValue;
  index: number;
  alertConfigData: thresholdItem_alertConfig_Fragment$key | null;
  metricData: thresholdItem_metric_Fragment$key;
  setFieldValue: (name: string, value: any) => void;
  showAdvancedView: boolean;
}
export const ThresholdItem = (props: Props) => {
  const { threshold, index, showAdvancedView, setFieldValue } = props;
  const alertConfigData = useFragment(
    graphql`
      fragment thresholdItem_alertConfig_Fragment on AlertConfig {
        id
        ...simpleEditThresholdItemFragment
        ...advancedEditThresholdItem_alertConfig_Fragment
      }
    `,
    props.alertConfigData,
  );

  const metricData = useFragment(
    graphql`
      fragment thresholdItem_metric_Fragment on Metric {
        ...simpleEditThresholdItem_metricData_Fragment
        ...advancedEditThresholdItem_metricData_Fragment
      }
    `,
    props.metricData,
  );
  return (
    <ThresholdItemWrapper key={threshold.id ?? `new-threshold-${index}`}>
      {showAdvancedView ? (
        <AdvanceEditThresholdItem
          thresholdFormValue={threshold}
          alertConfigData={alertConfigData}
          metricData={metricData}
          index={index}
          setFieldValue={setFieldValue}
        />
      ) : (
        <SimpleEditThresholdItem
          data={alertConfigData}
          metricData={metricData}
          index={index}
        />
      )}
      <FieldWrapper>
        <Field name={`thresholds[${index}].isDeleted`} defaultValue={false}>
          {({ fieldProps }) => (
            <Button
              appearance={'subtle'}
              iconAfter={<CrossCircleIcon label="" />}
              onClick={() => {
                fieldProps.onChange(true);
              }}
              style={{
                marginTop: `32px`,
                marginBottom: `2px`,
              }}
            />
          )}
        </Field>
      </FieldWrapper>
    </ThresholdItemWrapper>
  );
};
