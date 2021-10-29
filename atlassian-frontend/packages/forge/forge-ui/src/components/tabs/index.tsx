/** @jsx jsx */
import React, { useRef, useState } from 'react';
import View from '../view';
import type { TabData } from '@atlaskit/tabs/types';
import { jsx } from '@emotion/core';
import { Props } from '..';
import { useUID } from 'react-uid';

const AKTabs = React.lazy(() =>
  import('@atlaskit/tabs').then((module) => ({
    default: module.default,
  })),
);
const AKTab = React.lazy(() =>
  import('@atlaskit/tabs').then((module) => ({
    default: module.Tab,
  })),
);
const AKTabList = React.lazy(() =>
  import('@atlaskit/tabs').then((module) => ({
    default: module.TabList,
  })),
);
const AKTabPanel = React.lazy(() =>
  import('@atlaskit/tabs').then((module) => ({
    default: module.TabPanel,
  })),
);

// Tabs must be stateful so we don't reset to the first tab on re-renders
const Tabs: React.FunctionComponent<any> = ({ tabs }: { tabs: [TabData] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const id = useRef(useUID());
  return (
    <AKTabs
      selected={selectedIndex}
      onChange={setSelectedIndex}
      id={id.current}
      shouldUnmountTabPanelOnChange
    >
      <AKTabList>
        {tabs.map((tab, index) => (
          <AKTab key={index}>{tab.label}</AKTab>
        ))}
      </AKTabList>
      {tabs.map((tab, index) => (
        <AKTabPanel key={index}>{tab.content}</AKTabPanel>
      ))}
    </AKTabs>
  );
};

export default Tabs;

export const TabsFn: React.FunctionComponent<Props> = ({
  children,
  dispatch,
  Components,
  render,
  renderChildren,
}) => {
  const tabData = children
    .map((child) => {
      const { props, type } = child;
      if (type === 'Tab') {
        return {
          label: props?.label,
          content: (
            <View nonVisibleChildren={null}>
              {renderChildren({
                children: child.children,
                dispatch,
                Components,
                render,
              })}
            </View>
          ),
        };
      }
    })
    .filter((child) => child != null);
  return <Tabs tabs={tabData} />;
};
