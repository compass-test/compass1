import React, { ReactElement, Fragment, useState, Suspense } from 'react';
import { ForgeUIExtensionType } from '@atlassian/forge-ui-types';
import ForgeErrorBoundary from './ForgeErrorBoundary';

const mockExtension: ForgeUIExtensionType = {
  id: '123',
  properties: {},
  installationId: '123',
  environmentId: '234',
  appVersion: '2.20.0',
};

function BadCode(): ReactElement {
  throw new Error('Somebody messed up!');
}

function ForgeIntegration(): ReactElement {
  const [isError, setError] = useState(false);

  if (isError) {
    return <BadCode />;
  }
  return (
    <Fragment>
      <button onClick={() => setError(true)}>
        Click me to cause an error.
      </button>
    </Fragment>
  );
}

export function Example() {
  return (
    <div>
      Forge error boundary is shown below:
      <hr />
      <ForgeErrorBoundary extension={mockExtension}>
        <ForgeIntegration />
      </ForgeErrorBoundary>
      <hr />
    </div>
  );
}

const suspenseDecorator = (story: () => JSX.Element) => {
  return (
    <Suspense fallback={<div className=".loading-story">Loading story</div>}>
      {story()}
    </Suspense>
  );
};

export default {
  title: 'ErrorBoundary/ErrorBoundary',
  decorators: [suspenseDecorator],
};
