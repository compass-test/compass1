/** @jsx jsx */
import React from 'react';
import AnimateHeight from 'react-animate-height';
import format from 'date-fns/format';
import { jsx, css } from '@emotion/core';
import { SimpleTag as Tag, TagColor } from '@atlaskit/tag';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import CrossCircleIcon from '@atlaskit/icon/glyph/cross-circle';
import RecentIcon from '@atlaskit/icon/glyph/recent';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

import { TagManager } from './TagManager';
import { RollbackManager } from './RollbackManager';
import {
  flexGrow,
  cardContainer,
  topSection,
  small,
  inlineText,
  expandCardSection,
  expandedSection,
  successColor,
  failColor,
  inprogressColor,
  cardLink,
  link,
  tagContainer,
  tagMarginOverride,
  secondaryText,
} from './styles';

export type Deployment = {
  deploymentId: string;
  env: string;
  commit: string;
  branch: string;
  packageVersion: string;
  pipelineUuid: string;
  artefactUrl?: string;
  id: string;
  isRollback: boolean;
  status: 'INPROGRESS' | 'SUCCESSFUL' | 'FAILED';
  updatedDate: string;
  tags: string[];
};

const TagColour: Record<string, TagColor> = {
  BROKEN: 'redLight',
  TEST: 'blueLight',
};

const statusIcons = {
  SUCCESSFUL: (
    <CheckCircleIcon label="Successful" primaryColor={successColor} />
  ),
  FAILED: <CrossCircleIcon label="Failed" primaryColor={failColor} />,
  INPROGRESS: <RecentIcon label="In Progress" primaryColor={inprogressColor} />,
};

const formatDate = (date: string) => format(new Date(date), 'h:mma d MMM yyyy');

type State = {
  expanded: boolean;
  rollbackModalIsOpen: boolean;
  tags: string[];
  pipelineUrl?: string;
};

export class DeploymentCard extends React.Component<Deployment, State> {
  constructor(props: Deployment) {
    super(props);
    this.state = {
      expanded: false,
      rollbackModalIsOpen: false,
      tags: props.tags,
    };
  }

  toggleExpanded = () => {
    this.setState(prevState => ({
      expanded: !prevState.expanded,
    }));
  };

  renderChevron = () => {
    const { expanded } = this.state;
    return (
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={this.toggleExpanded}
      >
        {!expanded && <ChevronRightIcon label="collapsed" size="medium" />}
        {expanded && <ChevronDownIcon label="expanded" size="medium" />}
      </div>
    );
  };

  renderLinks = () => {
    const { pipelineUuid, artefactUrl } = this.props;
    return (
      <div>
        <a
          href={`https://bitbucket.org/atlassian/atlassian-frontend/addon/pipelines/home#!/results/${pipelineUuid}`}
          target="_blank"
          css={cardLink}
        >
          Deployment Pipeline
        </a>
        {artefactUrl && (
          <a href={artefactUrl} target="_blank" css={cardLink}>
            Statlas Artefact
          </a>
        )}
      </div>
    );
  };

  renderCommit = () => {
    return (
      <p>
        <a
          href={`https://bitbucket.org/atlassian/atlassian-frontend/commits/${this.props.commit}`}
          target="_blank"
          css={link}
        >
          {this.props.commit.substring(0, 7)}
        </a>{' '}
        • {this.props.branch}
      </p>
    );
  };

  renderTags = () => {
    const tags = this.state.tags;
    if (!tags) {
      return null;
    }

    if (tags.length === 0) {
      return (
        <div css={tagContainer}>
          <p
            css={css`
              color: grey;
            `}
          >
            No tags
          </p>
        </div>
      );
    }

    return (
      <div css={tagContainer}>
        {tags.map(tag => (
          <div css={tagMarginOverride} key={tag}>
            <Tag text={tag} color={TagColour[tag] || 'greyLight'} />
          </div>
        ))}
      </div>
    );
  };

  updateDisplayedTags = (tags: string[]) => {
    this.setState({ tags });
  };

  render() {
    const {
      id,
      pipelineUuid,
      isRollback,
      updatedDate,
      packageVersion,
      status,
      deploymentId,
      artefactUrl,
    } = this.props;
    const { expanded, tags } = this.state;

    return (
      <div css={cardContainer}>
        {this.renderChevron()}
        <div css={flexGrow}>
          <div css={topSection} onClick={this.toggleExpanded}>
            <div>
              <p css={inlineText}>
                <strong>Deployment #{pipelineUuid}</strong>
                <span css={secondaryText}>v{packageVersion}</span>
              </p>
              <p css={small}>
                {formatDate(updatedDate)}
                {isRollback && (
                  <span css={{ fontWeight: 'bold', color: '#707070' }}>
                    {' '}
                    • rollback
                  </span>
                )}
              </p>
            </div>
            {statusIcons[status]}
          </div>
          <AnimateHeight
            duration={200}
            easing="ease"
            height={expanded ? 'auto' : 0}
          >
            <div css={expandedSection}>
              <div>{this.renderCommit()}</div>
              <div css={expandCardSection}>
                {this.renderLinks()}
                <div>
                  <RollbackManager
                    artefactUrl={artefactUrl}
                    status={status}
                    deploymentId={deploymentId}
                    pipelineUuid={pipelineUuid}
                  />
                </div>
              </div>
              <div css={expandCardSection}>
                {this.renderTags()}
                <TagManager
                  deploymentStateId={id}
                  pipelineUuid={pipelineUuid}
                  tags={tags}
                  updateDisplayedTags={this.updateDisplayedTags}
                />
              </div>
            </div>
          </AnimateHeight>
        </div>
      </div>
    );
  }
}
