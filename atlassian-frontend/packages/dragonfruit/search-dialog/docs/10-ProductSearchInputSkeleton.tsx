import React, { FunctionComponent } from 'react';
import { md, Example, Props, AtlassianInternalWarning } from '@atlaskit/docs';

const ExampleContainer: FunctionComponent<{}> = ({ children }) => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ alignSelf: 'flex-end' }}>{children}</div>
  </div>
);

export default md`
${(<AtlassianInternalWarning />)}

## ProductSearchInputSkeleton

${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(require('../examples/03-search-skeleton').default)}
      </ExampleContainer>
    )}
    title="Example"
    source={require('!!raw-loader!../examples/03-search-skeleton')}
  />
)}

${(
  <Props
    heading="Props"
    props={require('!!extract-react-types-loader!../examples/props/props-skeleton')}
  />
)}

`;
