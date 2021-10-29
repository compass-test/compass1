import React from 'react';

import CollapsiblePanel from './CollapsiblePanel';
import { editorTabCollapsedConfig } from './EditorTabs';
import TemplateList from './TemplateList';

type Props = {
  isExpanded: boolean;
  onChange: (template: any) => void;
  code?: string;
  handleToggle: (panelToExpand: string, expandStatus: boolean) => void;
};

const ConfigureTemplatesPanel: React.FC<Props> = ({
  onChange,
  code,
  isExpanded,
  handleToggle,
}) => {
  return (
    <CollapsiblePanel
      isOverflowVisible
      {...editorTabCollapsedConfig.changeTemplate}
      panelIsExpanded={isExpanded}
      handleToggle={handleToggle}
    >
      <TemplateList onChange={onChange} code={code} />
    </CollapsiblePanel>
  );
};

export default React.memo(ConfigureTemplatesPanel);
