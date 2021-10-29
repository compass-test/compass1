import React from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import { editorTabCollapsedConfig } from './EditorTabs';
import PipeList from './PipeList';

type Props = {
  isExpanded: boolean;
  handleToggle: (panelToExpand: string, expandStatus: boolean) => void;
};

const ConfigurePipesPanel: React.FC<Props> = ({ isExpanded, handleToggle }) => {
  return (
    <CollapsiblePanel
      {...editorTabCollapsedConfig.addPipes}
      panelIsExpanded={isExpanded}
      handleToggle={handleToggle}
    >
      <PipeList />
    </CollapsiblePanel>
  );
};

export default React.memo(ConfigurePipesPanel);
