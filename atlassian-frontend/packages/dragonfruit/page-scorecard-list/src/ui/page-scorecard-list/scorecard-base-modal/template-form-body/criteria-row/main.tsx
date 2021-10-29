import React, { useEffect, useState } from 'react';

import { di } from 'react-magnetic-di';

import Select, { OptionType } from '@atlaskit/select';
import { ProgressCheck } from '@atlassian/dragonfruit-scorecards';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useAvailableFields } from '../../../../../controllers/available-fields';
import { OPTIONS } from '../../../../../controllers/available-fields/constants';
import { useErrors } from '../../../../../services/errors';

import Actions from './actions';
import messages from './messages';
import { FieldDescription, SectionRowWrapper, WeightItems } from './styled';
import WeightSetter from './weight-setter';

interface Values {
  id: string | null | undefined;
  field: string | null | undefined;
  weight: string | null | undefined;
}

interface Props {
  id: string;
  weight?: string | null;
  field?: string | null;
  onChange?: (values: Values | null) => void;
  onDelete?: (id: string) => void;
  testId?: string;
  error?: string;
}

const getFieldOptionFromValue = (
  fields: OptionType[],
  value: string | null | undefined,
): OptionType | null => {
  if (fields.length === 0) {
    return null;
  }

  const option = fields.find((field: OptionType) => field.value === value);

  return option === undefined ? null : option;
};

const CriteriaRow: React.FC<Props> = ({
  onChange,
  onDelete,
  id,
  weight,
  field,
  testId,
  error,
}) => {
  di(useAvailableFields);

  const [{ fields }, { claimField }] = useAvailableFields();
  const [currentWeight, setCurrentWeight] = useState(weight);
  const [currentField, setCurrentField] = useState(field);
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (onChange) {
      onChange({ weight: currentWeight, field: currentField, id: id });
    }
    // onChange does not have a stable reference, so it causes infinite re-rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeight, currentField, id]);

  const handleWeightChange = (value: string) => {
    setCurrentWeight(value);
  };

  const handleSelectOnChange = (option: any) => {
    const valueSelected = option.value;
    setCurrentField(valueSelected);
    claimField(currentField, valueSelected);
  };

  const handleDelete = () => {
    if (onDelete) {
      if (currentField) {
        setCurrentField(null);
        claimField(currentField, null);
      }

      onDelete(id);
    }
  };

  const weightSetterTestId = testId ? `${testId}.weight-setter` : testId;
  const actionsTestId = testId ? `${testId}.actions` : testId;

  const { handleValidationState } = useErrors();

  return (
    <SectionRowWrapper data-testid={testId}>
      <ProgressCheck />
      <FieldDescription>
        {formatMessage(messages.fieldDescriptionMessage)}
      </FieldDescription>
      <Select<OptionType>
        value={getFieldOptionFromValue(OPTIONS, currentField)}
        className="criteria-row"
        classNamePrefix="fields"
        options={fields}
        placeholder={formatMessage(messages.placeholderMessage)}
        onChange={handleSelectOnChange}
        validationState={handleValidationState(error)}
        styles={{
          container: (base) => ({ ...base, width: 224 }),
          dropdownIndicator: (base) => ({ ...base, paddingLeft: 0 }),
          menu: (base) => ({ ...base, width: 300 }),
        }}
      />
      <WeightItems>
        <WeightSetter
          value={currentWeight}
          onEdit={handleWeightChange}
          testId={weightSetterTestId}
        />
        <Actions testId={actionsTestId} onDelete={handleDelete} />
      </WeightItems>
    </SectionRowWrapper>
  );
};

export default CriteriaRow;
