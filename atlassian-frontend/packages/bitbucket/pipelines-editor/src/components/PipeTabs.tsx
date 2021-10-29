import React from 'react';

import Tabs, { Tab, TabList, TabPanel } from '@atlaskit/tabs';

import { SyntaxType } from '../types';
import { parsePipeReadmeRaw } from '../utils/parsePipeReadme';

import CopyableCode from './CopyableCode';
import { PipeTabsContent, PipeTabsText } from './styled';

type Props = {
  pipeReadme: string;
};

const PipeTabs: React.FC<Props> = ({ pipeReadme }) => {
  const sections = parsePipeReadmeRaw(pipeReadme) as any;
  const tabs = ['Intro', 'Details', 'Examples', 'Support']
    .filter((heading) => sections[heading.toLowerCase()])
    .map((heading) => {
      return {
        tab: heading,
        panel: (
          <PipeTabsContent>
            {sections[heading.toLowerCase()].map((syntax: any, index: any) =>
              syntax.type === SyntaxType.CodeBlock ? (
                <CopyableCode pipeReadmeSyntax={syntax} />
              ) : (
                <PipeTabsText>
                  <div dangerouslySetInnerHTML={{ __html: syntax.html }}></div>
                </PipeTabsText>
              ),
            )}
          </PipeTabsContent>
        ),
      };
    });

  return pipeReadme ? (
    <Tabs id="pipe-tabs" shouldUnmountTabPanelOnChange>
      <TabList>
        {tabs.map((tab, index) => (
          <Tab key={index}>{tab.tab}</Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel key={index}>{tab.panel}</TabPanel>
      ))}
    </Tabs>
  ) : null;
};

export default React.memo(PipeTabs);
