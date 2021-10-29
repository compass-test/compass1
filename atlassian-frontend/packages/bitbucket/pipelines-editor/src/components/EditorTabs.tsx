import React, { useEffect, useState } from 'react';

import DocumentIcon from '@atlaskit/icon/glyph/document';
import EditorAttachmentIcon from '@atlaskit/icon/glyph/editor/attachment';
import EditorCodeIcon from '@atlaskit/icon/glyph/editor/code';
import SettingsIcon from '@atlaskit/icon/glyph/settings';
import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';
import Tooltip from '@atlaskit/tooltip';

import { VariablesProps } from '../types';

import TemplateIcon from './assets/TemplateIcon';
import ConfigurePipesPanel from './ConfigurePipesPanel';
import ConfigureStepsPanel from './ConfigureStepsPanel';
import ConfigureTemplatesPanel from './ConfigureTemplatesPanel';
import ConfigureVariablesPanel from './ConfigureVariablesPanel';
import DocumentationTab from './DocumentationTab';
import {
  CollapsedIcon,
  CollapsedSidebar,
  CollapsedSidebarWrapper,
  ConfigureTabWrapper,
  Divider,
} from './styled';

export const editorTabCollapsedConfig = {
  changeTemplate: {
    title: 'Change the template',
    icon: <TemplateIcon />,
  },
  addSteps: {
    title: 'Add more steps',
    icon: <EditorCodeIcon label="Add more steps" size="medium" />,
  },
  addPipes: {
    title: 'Add Pipes (Integrations)',
    icon: (
      <EditorAttachmentIcon label="Add Pipes (Integrations)" size="medium" />
    ),
  },
  addVariables: {
    title: 'Add variables',
    icon: <SettingsIcon label="Add variables" size="medium" />,
  },
};

export const editorDocumentationTab = {
  title: 'Documentation',
  icon: <DocumentIcon label="Add Documentation" size="medium" />,
};

type ExpandPanelState = {
  [key: string]: boolean;
};

type Props = {
  variablesProps?: VariablesProps;
  onTemplateChange: (template: any) => void;
  code?: string;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (isCollapsed: boolean) => void;
};

const EditorTabs: React.FC<Props> = ({
  variablesProps,
  onTemplateChange,
  code,
  isSidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isSidebarCollapsed);
  const initialExpandPanelState: ExpandPanelState = {
    'Change the template': true,
    'Add more steps': false,
    'Add Pipes (Integrations)': false,
    'Add variables': false,
  };
  const [expandedPanel, setExpandedPanel] = useState(initialExpandPanelState);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleTogglePanel = (panelToExpand: string, expandStatus: boolean) => {
    setExpandedPanel({
      ...expandedPanel,
      [panelToExpand]: expandStatus,
    });
  };

  const handleToggleSidebar = (
    panelToExpand: string,
    expandStatus: boolean,
  ) => {
    setSidebarCollapsed(!isSidebarCollapsed);

    if (panelToExpand === editorDocumentationTab.title) {
      setSelectedIndex(1);
    }

    if (panelToExpand !== editorDocumentationTab.title) {
      setSelectedIndex(0);
      handleTogglePanel(panelToExpand, expandStatus);
    }
  };

  const tabs = [
    {
      tab: 'Configure',
      panel: (
        <ConfigureTabWrapper>
          <ConfigureTemplatesPanel
            onChange={onTemplateChange}
            isExpanded={expandedPanel['Change the template']}
            handleToggle={handleTogglePanel}
            code={code}
          />
          <ConfigureStepsPanel
            isExpanded={expandedPanel['Add more steps']}
            handleToggle={handleTogglePanel}
          />
          <ConfigurePipesPanel
            isExpanded={expandedPanel['Add Pipes (Integrations)']}
            handleToggle={handleTogglePanel}
          />
          {variablesProps ? (
            <ConfigureVariablesPanel
              {...variablesProps}
              isExpanded={expandedPanel['Add variables']}
              handleToggle={handleTogglePanel}
            />
          ) : null}
        </ConfigureTabWrapper>
      ),
    },
    { tab: 'Documentation', panel: <DocumentationTab /> },
  ];

  useEffect(() => {
    setIsCollapsed(isSidebarCollapsed);
  }, [isSidebarCollapsed]);

  return isCollapsed ? (
    <CollapsedSidebarWrapper>
      <CollapsedSidebar>
        {Object.entries(editorTabCollapsedConfig).map((config) => {
          return (
            <CollapsedIcon
              isSelected={expandedPanel[config[1].title]}
              onClick={() => handleToggleSidebar(config[1].title, true)}
            >
              <Tooltip content={config[1].title}>{config[1].icon}</Tooltip>
            </CollapsedIcon>
          );
        })}
        <Divider />
        <CollapsedIcon
          isSelected={selectedIndex === 1}
          onClick={() =>
            handleToggleSidebar(editorDocumentationTab.title, true)
          }
        >
          <Tooltip content={editorDocumentationTab.title}>
            {editorDocumentationTab.icon}
          </Tooltip>
        </CollapsedIcon>
      </CollapsedSidebar>
    </CollapsedSidebarWrapper>
  ) : (
    <Tabs
      selected={selectedIndex}
      onChange={setSelectedIndex}
      id="editor-tabs"
      shouldUnmountTabPanelOnChange
    >
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.tab}</Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index}>{tab.panel}</TabPanel>
      ))}
    </Tabs>
  );
};

export default React.memo(EditorTabs);
