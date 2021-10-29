import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lozenge from '@atlaskit/lozenge';
import Icon from '@atlaskit/icon/glyph/bullet-list';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import Button from '@atlaskit/button';

import { colors, gridSize, themed } from '@atlaskit/theme';

import Changelog, { Logs } from '../../components/ChangeLog';
import LinkButton from '../../components/LinkButton';

const PREVIEW_HEIGHT = 300;
const NEWLINE_CUTOFF = 17;

const LatestChange = ({
  changelog,
  pkgId,
  groupId,
}: {
  changelog: Logs;
  pkgId: string;
  groupId: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [hasCollapsedUI, setHasCollapsedUI] = useState(false);

  useEffect(() => {
    if (changelog && changelog[0] && changelog[0].md) {
      setHasCollapsedUI(changelog[0].md.split('\n').length > NEWLINE_CUTOFF);
    }
  }, [changelog]);

  if (!changelog || !changelog[0] || !changelog[0].version) {
    return null;
  }

  return (
    <LogWrapper role="group" aria-label="Changelog">
      <RightButton
        aria-label="View full changelog"
        iconBefore={<Icon label="List icon" />}
        to={`/packages/${groupId}/${pkgId}/changelog`}
      >
        Changelog
      </RightButton>
      <CollapseContainer
        role="group"
        aria-label="Latest Change"
        expanded={hasCollapsedUI ? expanded : true}
      >
        <Latest />
        <Changelog
          changelog={changelog}
          range={changelog[0].version}
          packageName={pkgId}
        />
      </CollapseContainer>
      {hasCollapsedUI && (
        <ExpandButtonContainer>
          <Button
            aria-hidden={true}
            appearance="subtle-link"
            iconAfter={
              expanded ? (
                <ChevronUpIcon label={''} />
              ) : (
                <ChevronDownIcon label={''} />
              )
            }
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Show less' : 'Show more'}
          </Button>
        </ExpandButtonContainer>
      )}
    </LogWrapper>
  );
};

const ExpandButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CollapseContainer = styled.div<{ expanded: boolean }>`
  position: relative;
  margin-bottom: ${gridSize()}px;
  max-height: ${props => (props.expanded ? 'none' : `${PREVIEW_HEIGHT}px;`)};
  overflow: hidden;
`;

const LogWrapper = styled.div`
  border-top: 2px solid ${themed({ light: colors.N30, dark: colors.DN60 })};
  margin-bottom: 2em;
  padding-top: ${gridSize() * 3}px;
  position: relative;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  ul {
    padding-left: ${gridSize() * 4}px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
const RightButton = styled(LinkButton)`
  /* increase specificity to override default Button styles */
  && {
    position: absolute;
    right: 0;
    z-index: 1;
  }
`;

const Latest = ({ children, ...rest }: { children?: React.ReactChild }) => (
  <span style={{ position: 'relative', top: -3 }}>
    <Lozenge appearance="new" {...rest}>
      {children || 'Latest'}
    </Lozenge>
  </span>
);

export default LatestChange;
