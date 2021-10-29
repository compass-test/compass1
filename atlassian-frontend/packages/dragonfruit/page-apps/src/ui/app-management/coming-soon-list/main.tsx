import React from 'react';

import githubLogo from './assets/GithubLogo.svg';
import gitlabLogo from './assets/GitlabLogo.svg';
import observabilityTools from './assets/ObservabilityTools.png';
import ComingSoonAppCard from './coming-soon-app-card';
import { ComingSoonListWrapper } from './styled';

export default function ComingSoonList() {
  return (
    <ComingSoonListWrapper>
      <ComingSoonAppCard name="Github" imageUrl={githubLogo} />
      <ComingSoonAppCard name="Gitlab" imageUrl={gitlabLogo} />
      <ComingSoonAppCard
        name="Observability Tools"
        imageUrl={observabilityTools}
      />
    </ComingSoonListWrapper>
  );
}
