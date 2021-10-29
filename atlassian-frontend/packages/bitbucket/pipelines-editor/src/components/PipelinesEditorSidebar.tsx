import React, { useState } from 'react';

import { VariablesProps } from '../types';

import EditorTabs from './EditorTabs';
import { Arrow, SidebarControls, SidebarWrapper, SplitBar } from './styled';

type Props = {
  variablesProps?: VariablesProps;
  onTemplateChange: (template: any) => void;
  code?: string;
  updateCode: () => void;
};

const PipelinesEditorSidebar: React.FC<Props> = ({
  variablesProps,
  onTemplateChange,
  code,
  updateCode,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    updateCode();
  };

  return (
    <SidebarWrapper isCollapsed={isSidebarCollapsed}>
      <SidebarControls>
        <Arrow
          aria-expanded={!isSidebarCollapsed}
          isCollapsed={isSidebarCollapsed}
          onClick={toggleSidebar}
          role="button"
          data-testid={
            isSidebarCollapsed
              ? 'expand-sidebar-button'
              : 'collapse-sidebar-button'
          }
        />
        <SplitBar isCollapsed={isSidebarCollapsed} onClick={toggleSidebar} />
      </SidebarControls>
      <EditorTabs
        variablesProps={variablesProps}
        onTemplateChange={onTemplateChange}
        code={code}
        isSidebarCollapsed={isSidebarCollapsed}
        setSidebarCollapsed={toggleSidebar}
      />
    </SidebarWrapper>
  );
};

export default React.memo(PipelinesEditorSidebar);
