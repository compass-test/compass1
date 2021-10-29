import React from 'react';
import BitbucketSourceIcon from '@atlaskit/icon/glyph/bitbucket/source';
import Tooltip from '@atlaskit/tooltip';
import Panel from '@atlaskit/panel';
import { B300, N0 } from '@atlaskit/theme/colors';
import styled from 'styled-components';
import { branchPrefix } from '@atlaskit/branch-deploy-product-integrator/constants';
import { PullRequest } from '../../interfaces';

const PullRequestMergeDate = styled.div`
  font-size: 10px;
`;

const PanelStyle = styled.div`
  background-color: ${N0};
  margin: 0px 5px 0px 29px;
  > div:first-child {
    margin: 0 auto 0px;
    > div:first-child {
      margin: 5px 0px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
    }
  }
`;

const PanelStyleContainer = styled.div`
  background-color: ${N0};
  margin: 5px 8px;
  width: calc(100% - 20px);
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 6px;
  padding: 2px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
`;

function parseDate(datetime: string) {
  let date = datetime.substring(0, 10);
  let split = date.split('-', 3);
  return split.reverse().join('/');
}

const BitbucketURLContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -4px;
  outline: none !important;
`;
const BranchURLContainer = styled.a`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: -4px;
  outline: none !important;
`;

function BranchDeployLink(props: { branch: string }) {
  const { branch } = props;
  if (branch) {
    const branchName = branch.replace('/', '-');
    return (
      <BranchURLContainer
        href={`https://hello.atlassian.net/wiki/?useFrontendBranch=${branchPrefix}${branchName}`}
        target="_blank"
      >
        <BitbucketSourceIcon label="" primaryColor={B300} size="medium" />
        View branch deploy
      </BranchURLContainer>
    );
  }
  return null;
}

export function Card(props: PullRequest) {
  const { branch, title, mergeDate, bitbucketUrl, author } = props;
  const date = parseDate(mergeDate);
  const header = (
    <Tooltip delay={500} content={title}>
      <HeaderContainer>
        <TitleContainer>{title}</TitleContainer>
        <PullRequestMergeDate>{date}</PullRequestMergeDate>
      </HeaderContainer>
    </Tooltip>
  );
  return (
    <PanelStyleContainer>
      <PanelStyle>
        <Panel header={header}>
          <div>
            <em>Author:</em> {author}
          </div>
          <BitbucketURLContainer href={bitbucketUrl} target="_blank">
            <BitbucketSourceIcon label="" primaryColor={B300} size="medium" />
            See it in Bitbucket
          </BitbucketURLContainer>
          <BranchDeployLink branch={branch} />
        </Panel>
      </PanelStyle>
    </PanelStyleContainer>
  );
}
