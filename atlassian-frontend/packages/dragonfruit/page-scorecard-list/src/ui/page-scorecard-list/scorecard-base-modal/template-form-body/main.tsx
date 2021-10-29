import React, { useEffect } from 'react';

import { di } from 'react-magnetic-di';

import Button from '@atlaskit/button';
import { Field } from '@atlaskit/form';
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
import { useIntl } from '@atlassian/dragonfruit-utils';

import { useAvailableFields } from '../../../../controllers/available-fields';
import { useCriteriaController } from '../../../../controllers/criteria-controller';
import { Criteria } from '../../../../controllers/criteria-controller/types';

import CriteriaRow from './criteria-row';
import messages from './messages';
import {
  AddCriteriaActionWrapper,
  CriteriaHeading,
  CriteriaInstructions,
  FormBodyWrapper,
} from './styled';

interface AddCriteriaActionProps {
  testId?: string;
  onAdd?: () => void;
}
interface TemplateFormBodyProps {
  initialCriteria?: Criteria[];
  testId?: string;
}

export const AddCriteriaAction: React.FC<AddCriteriaActionProps> = ({
  testId,
  onAdd,
}) => {
  const intl = useIntl();
  const { formatMessage } = intl;
  const addCriteriaLink = testId ? `${testId}.add-criteria-link` : testId;

  return (
    <AddCriteriaActionWrapper>
      <Button
        testId={addCriteriaLink}
        appearance="link"
        iconBefore={
          <EditorAddIcon label={formatMessage(messages.addCriterion)} />
        }
        onClick={onAdd}
      >
        {formatMessage(messages.addCriterion)}
      </Button>
    </AddCriteriaActionWrapper>
  );
};

const CriteriaHeader = () => {
  const intl = useIntl();
  const { formatMessage } = intl;

  return (
    <>
      <CriteriaHeading>
        {formatMessage(messages.criteriaHeader)}
      </CriteriaHeading>
      <CriteriaInstructions>
        {formatMessage(messages.criteriaInstructions)}
      </CriteriaInstructions>
    </>
  );
};

const TemplateFormBody: React.FC<TemplateFormBodyProps> = ({
  initialCriteria,
  testId,
}) => {
  di(useAvailableFields, useCriteriaController);

  const rowTestId = testId ? `${testId}.criteria-row` : testId;
  const actionTestId = testId ? `${testId}.add-criteria` : testId;

  const [{ fields }] = useAvailableFields();
  const [
    { criteria },
    { addCriteria, removeCriteria, updateCriteria },
  ] = useCriteriaController(initialCriteria);

  // We should be rendering an empty criteria row when a user first opens the modal.
  // Since CriteriaRow is not designed to exist without an underlying criterion, the most
  // efficient way to do this is to invoke addCriteria as if the add action were clicked.
  useEffect(() => {
    if (criteria.length === 0) {
      addCriteria();
    }
    // Since we only want this to run on mount, we can ignore warnings about missing dependencies
    // eslint-disable-next-line
  }, []);
  return (
    <FormBodyWrapper>
      <CriteriaHeader />

      {criteria.map(({ id, field, weight }, i) => {
        return (
          <Field
            key={`${id}-${i}`}
            name={`criterias[${id}]`}
            defaultValue={{ id: id, weight: weight, field: field }}
          >
            {({ fieldProps, error }) => {
              const { onChange, ...restFieldProps } = fieldProps;
              const handleOnChange = (values: any) => {
                updateCriteria(values.id, values.weight, values.field);
                onChange(values);
              };

              return (
                <CriteriaRow
                  {...restFieldProps}
                  id={id}
                  testId={rowTestId}
                  field={field}
                  weight={weight}
                  onChange={handleOnChange}
                  onDelete={removeCriteria}
                  error={error}
                />
              );
            }}
          </Field>
        );
      })}
      {fields.length > 0 && (
        <AddCriteriaAction testId={actionTestId} onAdd={addCriteria} />
      )}
    </FormBodyWrapper>
  );
};

export default TemplateFormBody;
