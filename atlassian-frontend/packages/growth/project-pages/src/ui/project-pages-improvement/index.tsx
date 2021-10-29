import React from 'react';
import { ProjectPagesImprovementWrapper } from './styled';
import PreExpand from './pre-expand';
import PostExpand from './post-expand/connected';

interface Props {
  children: React.ReactNode;
  isPostExpand: boolean;
}

const ProjectPagesImprovement = ({ children, isPostExpand }: Props) => {
  return (
    <ProjectPagesImprovementWrapper>
      {isPostExpand ? (
        <PostExpand>{children}</PostExpand>
      ) : (
        <PreExpand>{children}</PreExpand>
      )}
    </ProjectPagesImprovementWrapper>
  );
};
export default ProjectPagesImprovement;
