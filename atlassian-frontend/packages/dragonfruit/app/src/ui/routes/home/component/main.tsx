import React from 'react';

import { useRouterActions } from 'react-resource-router';

import { useUserHomePage } from '@atlassian/dragonfruit-feature-flags';
import { PageUserHome } from '@atlassian/dragonfruit-page-user-home';
import { routes } from '@atlassian/dragonfruit-routes';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'home';

/**
 * For now, since Compass does not have a proper homepage,
 * we simply redirect the user to the component list route.
 */
export default withErrorBoundary(
  () => {
    const userHome = useUserHomePage();
    const { replace } = useRouterActions();

    if (userHome) {
      return <PageUserHome />;
    }

    replace(routes.COMPONENTS());
    return <></>;
  },
  {
    componentName: PAGE,
    Fallback: ErrorPage,
  },
);
