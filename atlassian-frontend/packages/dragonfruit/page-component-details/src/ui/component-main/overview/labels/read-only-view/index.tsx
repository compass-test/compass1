import React from 'react';

import { CompassComponentLabelForUI } from '../../../../../common/types';

type Props = {
  labels: Array<CompassComponentLabelForUI>;
};

export const LabelsReadOnlyView = (props: Props) => {
  return <div>This will be the view for managed components</div>;
};
