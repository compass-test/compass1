import React, { Fragment, ReactChild, useEffect, useState } from 'react';

import AnimateHeight from 'react-animate-height';

import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';

import {
  Chevron,
  Icon,
  Panel,
  PanelBody,
  PanelHeading,
  PanelHeadingLabel,
} from './styled';

type Props = {
  title: string;
  icon?: ReactChild;
  isOverflowVisible?: boolean;
  children: any;
  panelIsExpanded: boolean;
  handleToggle: (panelToExpand: string, expandStatus: boolean) => void;
};

const CollapsiblePanel: React.FC<Props> = ({
  title,
  children,
  isOverflowVisible,
  icon,
  panelIsExpanded,
  handleToggle,
}) => {
  const [isExpanded, setIsExpanded] = useState(panelIsExpanded);

  useEffect(() => {
    setIsExpanded(panelIsExpanded);
  }, [panelIsExpanded]);

  const renderHeading = () => {
    return (
      <Fragment>
        {icon ? <Icon>{icon}</Icon> : null}
        <Fragment>
          <PanelHeadingLabel>{title}</PanelHeadingLabel>
        </Fragment>
        <Chevron>
          {isExpanded ? (
            <ChevronDownIcon label="stepsCollapse" />
          ) : (
            <ChevronRightIcon label="stepsExpand" />
          )}
        </Chevron>
      </Fragment>
    );
  };

  return (
    <Panel>
      <PanelHeading
        isCollapsed={!isExpanded}
        isExpandable={!isExpanded}
        onClick={() => handleToggle(title, !isExpanded)}
      >
        {renderHeading()}
      </PanelHeading>
      <AnimateHeight
        duration={200}
        easing="linear"
        height={!isExpanded ? 0 : 'auto'}
      >
        <PanelBody isOverflowVisible={isOverflowVisible}>{children}</PanelBody>
      </AnimateHeight>
    </Panel>
  );
};

export default React.memo(CollapsiblePanel);
