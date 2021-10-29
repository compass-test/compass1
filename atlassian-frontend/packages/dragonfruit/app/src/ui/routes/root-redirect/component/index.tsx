import { useEffect } from 'react';

import { routes } from '@atlassian/dragonfruit-routes';
import { withErrorBoundary } from '@atlassian/dragonfruit-utils';

import { ErrorPage } from '../../../../common/ui/error-page';

const PAGE = 'root';

// This component redirects the user to "/compass" if they land on "/". This can only happen in the localhost:3000 dev server
const RootRedirectComponent = () => {
  useEffect(() => {
    window.location.href = routes.HOME();
  });

  return null;
};

export default withErrorBoundary(RootRedirectComponent, {
  componentName: PAGE,
  Fallback: ErrorPage,
});
