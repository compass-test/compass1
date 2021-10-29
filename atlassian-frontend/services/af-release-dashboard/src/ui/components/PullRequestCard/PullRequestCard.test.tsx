import React from 'react';
import { render } from '@testing-library/react';
import { branchPrefix } from '@atlaskit/branch-deploy-product-integrator';
import { Card } from './PullRequestCard';

describe('PullRequestCard', () => {
  describe('BranchURLContainer', () => {
    it('should show "View branch deploy" Button when branch value is not null', async () => {
      const { findByText } = render(
        <Card
          branch="TestValue"
          title=""
          mergeDate=""
          bitbucketUrl=""
          author=""
          bitbucketId={0}
          commitHash=""
        />,
      );
      const branchButton = await findByText('View branch deploy');
      expect(branchButton).not.toBeNull();
    });

    it('should not show "View branch deploy" Button when branch value is null', async () => {
      const { queryByText } = render(
        <Card
          branch=""
          title=""
          mergeDate=""
          bitbucketUrl=""
          author=""
          bitbucketId={0}
          commitHash=""
        />,
      );
      const branchButton = await queryByText('View branch deploy');
      expect(branchButton).toBeNull();
    });

    it('should link to correct URL', async () => {
      const { findByText } = render(
        <Card
          branch="feature/branchTestName"
          title=""
          mergeDate=""
          bitbucketUrl=""
          author=""
          bitbucketId={0}
          commitHash=""
        />,
      );
      const branchButton = await findByText('View branch deploy');
      expect(branchButton).toHaveAttribute(
        'href',
        `https://hello.atlassian.net/wiki/?useFrontendBranch=${branchPrefix}feature-branchTestName`,
      );
    });
  });
});
