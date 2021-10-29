import React, { Fragment } from 'react';
import { Field, FormSection } from '@atlaskit/form';
import TextArea from '@atlaskit/textarea';

const ScheduleB = () => {
  return (
    <FormSection title="Schedule B">
      <Field
        name="schedule_b"
        label="Identification of optional concurrent software grant"
        defaultValue=""
      >
        {({ fieldProps }) => (
          <Fragment>
            <TextArea {...fieldProps} minimumRows={4} />
          </Fragment>
        )}
      </Field>
    </FormSection>
  );
};

export default ScheduleB;
