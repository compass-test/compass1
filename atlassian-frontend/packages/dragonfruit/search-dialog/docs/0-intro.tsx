import React, { FunctionComponent } from 'react';
import { md, Example, code, AtlassianInternalWarning } from '@atlaskit/docs';

const ExampleContainer: FunctionComponent<{}> = ({ children }) => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ alignSelf: 'flex-end' }}>{children}</div>
  </div>
);

export default md`
${(<AtlassianInternalWarning />)}

## Overview

*Product Search Dialog* can be used to add the powerful and consistent cross-product multi-site search component to your interface. Currently supported products are:
- Jira
- Confluence

This is the cheapest integration option, requiring configuration of the data providers and rendering of the component.

Integration is as simple as:
1. Choosing which products you wish the dialog to render.
2. Setting up the relevant \`ClientProvider\` contexts.
3. Rendering a \`CrossProductSearchDialog\` component.

## Pre-requisites

- Your application is using Navigation V3
- The content you want to search is already supported by the Search Platform API

Optional but recommended:
- Analytics web client (optional but recommended)
- Internationalisation

### Examples
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
    title="Simple example"
    source={require('!!raw-loader!../examples/01-single-product-example')}
  />
)}

Read on below for information about the components, how to compose them and integration best practices.

## Components
## [ProductSearchInputSkeleton](product-search-dialog/docs/ProductSearchInputSkeleton)

For consumers who would like to defer loading of the \`product-search-dialog\` for loading time optimisation purposes, a skeleton is provided.
This element is simply a non-interactive input which is styled in the same way as the main Search Input component.

This component should be rendered in place while the product-search-dialog is being loaded, and swapped with product-search-dialog once finished.
This component is designed to be light-weight and can be safely rendered as part of SSR.

## [CrossProductSearchDialog](product-search-dialog/docs/CrossProductSearchDialog)

The main component. This component represents the actual search dialog and is async loaded on mount.
To use with \`@atlassian/navigation\` simply supply it to the \`renderSearch\` prop of the navigation bar.
Make sure the components are wrapped in the relevant [Search Client Providers](product-search-dialog/docs/SearchClientProvider).

## [Search Client Providers](product-search-dialog/docs/SearchClientProvider)

The \`product-search-dialog\` relies on the presence of client providers, depending on which products are selected for rendering via the \`products\` prop.
For each product, the corresponding client provider must be provided to the \`CrossProductSearchDialog\` by wrapping the \`CrossProductSearchDialog\` in the appropriate \`SearchProvider\` component(s).

For example, if Jira is selected in the products prop, the JiraClientsProvider must be configured and wrapping the CrossProductSearchDialog.


## i18n
The product-search-dialog supports internationalisation by wrapping the component with a LocaleIntlProvider.
An example of this:

${code`
import LocaleIntlProvider from 'react-intl';

<LocaleIntlProvider locale="en-US">
  <CrossProductSearchDialog
    ...
  />
</LocaleIntlProvider>
`}


## Theming
The \`product-search-dialog\` can be themed if desired. This is controlled via a \`theme\` prop on the \`CrossProductSearchDialog\`. This is an object containing the following properties:

${code`
<CrossProductSearchDialog
  ...
  theme={({
    default: CSSProperties;
    focus: CSSObject;
    hover: CSSObject;
  })}
/>
`}

## Best practices
### Keyboard shortcuts
When defining a keyboard shortcut used to open search, please use the \`/\` key for consistency between products.

### Analytics
When embedding \`product-search-dialog\` in your application, please be sure to wrap the component with an \`AnalyticsListener\` component on the fabricElements channel to ensure analytic events emitted from the dialog are captured.
For documentation on how to configure the \`AnalyticsListener\`, check out their docs.

### SPA transitions
We strongly recommend using SPA transitions when integrating product-search-dialog. To support these, an optional prop exists on the \`CrossProductSearchDialog\` for passing in a linkComponent to integrate more.

`;
