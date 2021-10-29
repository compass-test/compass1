import React from 'react';

import type { SectionProps } from '@atlaskit/menu';
import Section from '@atlaskit/menu/section';

import { CheckboxGroupContext } from '../internal/context/checkbox-group-context';

interface DropdownItemCheckboxGroupProps extends SectionProps {
  /**
   * Unique identifier for the checkbox group.
   */
  id: string;
}

const DropdownItemCheckboxGroup = (props: DropdownItemCheckboxGroupProps) => {
  const { children, id } = props;

  return (
    <CheckboxGroupContext.Provider value={id}>
      <Section {...props}>{children}</Section>
    </CheckboxGroupContext.Provider>
  );
};

export default DropdownItemCheckboxGroup;
