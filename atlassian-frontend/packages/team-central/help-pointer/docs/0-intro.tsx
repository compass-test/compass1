import React from 'react';

import { AtlassianInternalWarning, Example, md, Props } from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}

  This package comprise several components to support the "Help" pillar in Team Central:

  ### \`<HelpPointerList />\`

 ${(
   <Example
     packageName="@atlassian/help-pointer"
     Component={require('../examples/00-help-pointer-list').default}
     title="HelpPointerList"
     source={require('!!raw-loader!../examples/00-help-pointer-list')}
   />
 )}

  ${(
    <Props
      heading="Props"
      shouldCollapseProps
      props={require('!!extract-react-types-loader!../src/ui/help-pointer-list')}
    />
  )}

  ### \`<HelpPointerGrid />\`

 ${(
   <Example
     packageName="@atlassian/help-pointer"
     Component={
       require('../examples/11-help-pointer-grid-example-page').default
     }
     title="HelpPointerGrid"
     source={require('!!raw-loader!../examples/11-help-pointer-grid-example-page')}
   />
 )}

  ${(
    <Props
      heading="Props"
      shouldCollapseProps
      props={require('!!extract-react-types-loader!../src/ui/help-pointer-grid')}
    />
  )}

  ### \`<CreateHelpPointer />\`
`;
