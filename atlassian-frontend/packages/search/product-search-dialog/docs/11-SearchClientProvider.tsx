import React from 'react';
import { md, Props, AtlassianInternalWarning } from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

## ProductSearchProvider
*NB: We are looking to unify the configuration for these Client providers! Sorry about the redundancy for now.*

${(
  <Props
    heading="Confluence search provider props"
    props={require('!!extract-react-types-loader!../examples/props/props-confluence-search-client')}
  />
)}

${(
  <Props
    heading="Jira search provider props"
    props={require('!!extract-react-types-loader!../examples/props/props-jira-search-client')}
  />
)}

`;
