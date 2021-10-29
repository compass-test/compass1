import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}
  
  This is a higher order component that allows enhancement of Atlaskit Select pickers (or any component that takes Atlaskit Select Props) to provide personalised smart ranking - providing select options in a more personalised way.
  This doesnt change the basic functionality of the select - you can still back select with any resource that provides options.

  Wrapping a select component with Smart Select will:
  - Provide advanced analytics, allowing production of analytics to create ML features and provide measurement
  - Manage requests to the [Field Recommendations Service](https://developer.atlassian.com/platform/field-recommendations/) to rerank the provided options based on the user's & sites personalised usage patterns

  In this way the picker is "self bootstrapping" - by beginning using it, user's actions immediately start autopopulating the model's feature data - which will then result in future personalised recommendations with no other development work.

  Please see the example for how to wrap an existing select component with the smart-select HOC, with the additional props.

  It is also possible to use the ranking functionality directly for non-select use cases by using the ranker component directly.
  If you'd like to learn more about customizing models or for alternative use cases please reach out to #help-smart-experiences.

  ## Usage

  Import the component in your React app as follows:

  ${code`import withSmarts from '@atlaskit/smart-select';`}

  ${(
    <Example
      packageName="@atlaskit/smart-select"
      Component={require('../examples/01-withSmarts').default}
      title="Single User Picker"
      source={require('!!raw-loader!../examples/01-withSmarts')}
    />
  )}

  The withSmarts HOC takes no props, however the resulting SmartSelect component requires a SmartContext in addition to any standard Select props.
  
  Smart Select requires more props than traditional select as it requires a smartContext to enable detailed analytics and to provide context for ranking.
  
  For example:
   
${code`
    const SmartSelect = withSmarts(SelectWithoutAnalytics);
    
    <SmartSelect
          smartContext={{
            baseUrl: state.baseUrl,
            containerId: useKnobs ? containerId : state.containerId,
            fieldId: useKnobs ? fieldId : state.fieldId,
            objectId: useKnobs ? objectId : state.objectId,
            principalId: useKnobs ? principalId : state.principalId,
            product: useKnobs ? product : state.product,
            requiresHashing: useKnobs ? requiresHashing : state.requiresHashing,
            smartRank: useKnobs ? withRerank : state.smartRank,
            tenantId: useKnobs ? tenantId : state.tenantId
          }}
          ///... other select props
        />

`}
  
  ${(
    <Props
      heading="Smart Context"
      props={require('!!extract-react-types-loader!../extract-react-types/smart-select-props.tsx')}
    />
  )}
`;
