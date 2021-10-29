import React from 'react';

import { AtlassianInternalWarning, Example, md, Props } from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}

  Unified tag picking experience across the Team Central product.


  ### \`<SelectTagPicker />\`

 ${(
   <Example
     packageName="@atlassian/tc-tag-picker"
     Component={require('../examples/00-select-tag-picker').default}
     title="SelectTagPicker"
     source={require('!!raw-loader!../examples/00-select-tag-picker')}
   />
 )}

  ${(
    <Props
      heading="SelectTagPicker Props"
      shouldCollapseProps
      props={require('!!extract-react-types-loader!../src/ui/select-tag-picker')}
    />
  )}

  ### \`<PopupTagPicker />\`

  ${(
    <Example
      packageName="@atlassian/tc-tag-picker"
      Component={require('../examples/01-popup-tag-picker').default}
      title="PopupTagPicker"
      source={require('!!raw-loader!../examples/01-popup-tag-picker')}
    />
  )}

   ${(
     <Props
       heading="PopupTagPicker Props"
       shouldCollapseProps
       props={require('!!extract-react-types-loader!../src/ui/popup-tag-picker')}
     />
   )}
`;
