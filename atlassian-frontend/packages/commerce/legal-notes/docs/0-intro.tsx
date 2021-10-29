import React from 'react';

import { AtlassianInternalWarning, Example, md } from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}

  ## Documentation

  Commerce Legal Notes is a collection of static components. **Text should only be changed uppon approval**⚠️

  ## Examples
  ${(
    <>
      <Example
        packageName="@atlaskit/commerce-legal-notes"
        Component={
          require('../examples/01-commerce-policy-subscription.tsx').default
        }
        title="Policy Subscription"
        source={require('!!raw-loader!../examples/01-commerce-policy-subscription.tsx')}
      />
      <Example
        packageName="@atlaskit/commerce-legal-notes"
        Component={require('../examples/02-policy-agreement-implicit').default}
        title="Policy Agreement Implicit"
        source={require('!!raw-loader!../examples/02-policy-agreement-implicit')}
      />
      <Example
        packageName="@atlaskit/commerce-legal-notes"
        Component={require('../examples/03-policy-agreement-explicit').default}
        title="Policy Agreement Explicit"
        source={require('!!raw-loader!../examples/03-policy-agreement-explicit')}
      />
      <Example
        packageName="@atlaskit/commerce-legal-notes"
        Component={require('../examples/04-visa-legal-note').default}
        title="Visa Legal Note"
        source={require('!!raw-loader!../examples/04-visa-legal-note')}
      />
    </>
  )}

`;
