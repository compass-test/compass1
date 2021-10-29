import React, { FunctionComponent } from 'react';
import { md, Example, Props, AtlassianInternalWarning } from '@atlaskit/docs';

const ExampleContainer: FunctionComponent<{}> = ({ children }) => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ alignSelf: 'flex-end' }}>{children}</div>
  </div>
);

export default md`
${(<AtlassianInternalWarning />)}

## CrossProductSearchDialog
${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(
          require('../examples/01-single-product-example').default,
        )}
      </ExampleContainer>
    )}
    title="Single Product Example"
    source={require('!!raw-loader!../examples/01-single-product-example')}
  />
)}

${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(
          require('../examples/02-multi-product-example').default,
        )}
      </ExampleContainer>
    )}
    title="Multiple Product Example"
    source={require('!!raw-loader!../examples/02-multi-product-example')}
  />
)}

${(
  <Props
    heading="Props"
    props={require('!!extract-react-types-loader!../examples/props/props-product-search-dialog')}
  />
)}

`;
