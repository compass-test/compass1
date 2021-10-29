import React from 'react';

// TODO: Migrate `Clause`:
// import type { Clause } from '@atlassiansox/jql-ast';
import noop from 'lodash/noop';

import { formatLabel } from './format-label';
import PickerTrigger from './picker-trigger';

interface PickerFallbackProps {
  // clause?: Clause;
  fieldId: string;
  fieldDisplayName?: string;
}

const PickerFallback = ({
  // clause,
  fieldId,
  fieldDisplayName,
}: PickerFallbackProps) => {
  // if (clause) {
  //   return (
  //     <PickerTrigger
  //       isInvalid={false}
  //       isSelected={false}
  //       hasValues
  //       onClick={noop}
  //       testId={`paginated-picker.ui.picker.filter-button.${fieldId}.loading`}
  //       isLoading
  //     >
  //       {formatLabel(fieldDisplayName)}
  //     </PickerTrigger>
  //   );
  // }

  return (
    <PickerTrigger
      isInvalid={false}
      isSelected={false}
      hasValues={false}
      onClick={noop}
      testId={`paginated-picker.ui.picker.filter-button.${fieldId}`}
    >
      {formatLabel(fieldDisplayName)}
    </PickerTrigger>
  );
};

export default PickerFallback;
