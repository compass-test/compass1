import React from 'react';

import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

import { Step } from '../types';
import { Syntax } from '../utils/parsePipeReadme';

import CopyableCode from './CopyableCode';
import { StepTabsContent, StepTabsDescription } from './styled';

type Props = {
  step: Step;
};

const StepTabs: React.FC<Props> = ({ step }) => {
  const syntax = new Syntax({ innerText: step.yml, language: 'yaml' });
  const tabs = [
    {
      tab: 'Overview',
      panel: (
        <StepTabsContent>
          <StepTabsDescription>{step.description}</StepTabsDescription>
          <CopyableCode pipeReadmeSyntax={syntax} />
        </StepTabsContent>
      ),
    },
  ];

  return (
    <Tabs id="step-tabs" shouldUnmountTabPanelOnChange>
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

export default React.memo(StepTabs);
