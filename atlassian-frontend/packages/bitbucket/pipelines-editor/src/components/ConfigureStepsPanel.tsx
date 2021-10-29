import React from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import { editorTabCollapsedConfig } from './EditorTabs';
import StepList from './StepList';

type Props = {
  isExpanded: boolean;
  handleToggle: (panelToExpand: string, expandStatus: boolean) => void;
};

const ConfigureStepsPanel: React.FC<Props> = ({ isExpanded, handleToggle }) => {
  return (
    <CollapsiblePanel
      {...editorTabCollapsedConfig.addSteps}
      panelIsExpanded={isExpanded}
      handleToggle={handleToggle}
    >
      <StepList />
    </CollapsiblePanel>
  );
};

export default React.memo(ConfigureStepsPanel);
