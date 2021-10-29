import React, { FunctionComponent } from 'react';
import {
  md,
  Example,
  Props,
  AtlassianInternalWarning,
  code,
} from '@atlaskit/docs';

const ExampleContainer: FunctionComponent<{}> = ({ children }) => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
    <div style={{ alignSelf: 'flex-end' }}>{children}</div>
  </div>
);

export default md`
${(<AtlassianInternalWarning />)}

# Generic Product Search Dialog Components

## Tab Component

### Overview

A product within the Search Dialog. Each product responds to one tab inside the dialog and its children
are conditionally rendered based off whether this product is active.

**Note:** By default, for retrieval of permissions and pre/post query items, the \`SearchDialogProduct\` uses [search-experience](https://hello.atlassian.net/wiki/spaces/SEARCH/pages/938854424/Search+Platform+User+Guide)'s
[aggregator](https://developer.atlassian.com/platform/cross-product-search/searching/basic-searching/#example-3--searching-for-confluence-pages-and-jira-issues) service if the relevant props aren't supplied.

The product component does the following:
- Permissions checking, to see if this product can be shown to the user
- Product registration with the product router
- Conditionally rendering children if the product is active in the dialog
- Async loading the component children using React.suspense

${code`
const SearchDialogProduct: React.FC<
  SearchDialogProductProps &
    CacheWarmingProps &
    ResultSuppliers &
    ResultProviderProps &
    ScreenSpecificProps &
    CustomizedRendererChildFn &
    AdvancedSearchFooterProps
> = (props) => (
  <SearchDialogTabComponent {...props}>
    {props.children}
  </SearchDialogTabComponent>
);
`}

${(
  <Props
    heading="SearchDialogProductProps"
    props={require('!!extract-react-types-loader!../examples/props/extensible/props-search-dialog-product.tsx')}
  />
)}

${code`
interface SearchDialogProductProps extends CheckProductPermissionsProps;

export type CheckProductPermissionsProps = Omit<
  RegisterProductProps,
  'allowedSections'
> & {
  /**
   * A promise which resolves a list of sectionIds accessible by the user.
   * This will override the aggregator scopes API check.
   */
  permissionSupplier?: PermissionSupplier;
};
`}

**Note:** \`permissionSupplier\` is not optional, rather it is available to be overriden if Aggregator does not support your service. When developing storybooks or during local dev,
you might want to configure a dummy response for this prop else requests will go out to aggregator which will fail and you won't be able to see expanded tab, instead only rendering \`ProductSearchInputSkeleton\`.

${(
  <>
    <Props
      heading="CacheWarmingProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-cache-warming.tsx')}
    />

    <Props
      heading="ResultSuppliers"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-result-suppliers.tsx')}
    />
  </>
)}

**Note:** Both \`ResultSuppliers\` allow developers to configure their own suppliers from an external service without
having to use the \`search-experience\` aggregator service, so long as the results conform to the \`SearchItems\` interface.


${(
  <>
    <Props
      heading="ResultProviderProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-result-provider.tsx')}
    />

    <Props
      heading="ScreenSpecificProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-screen-specific.tsx')}
    />

    <Props
      heading="CustomizedRendererChildFn"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-customized-renderer-child-fn.tsx')}
    />

    <Props
      heading="AdvancedSearchFooterProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-advanced-search-footer.tsx')}
    />
  </>
)}

**Note:** This interface has additional properties, inherited accordingly below, which the \`Props\` component supplied by AFP fails to detect.

${code`AdvancedSearchFooterProps extends Pick<ScreenSpecificProps, 'urlGeneratorForNoResultsScreen'>`}

## Extensible Dialog Component

### Overview

The containing dialog for registering and rendering products via tabs. The dialog can be customised with theming via props and manage state internally.

The component provides the following functionality:
- While a product is retrieving results, the dialog will render the \`ProductSearchInputSkeleton\`.
- Keyboard shortcuts, listed above are provided.
- A search input for the active tab will be displayed allowing for user input.
- Differing layouts to reflect the number of tabs. A dialog with a single registered product will have no tabs.

${code`
const MultiProductDialog: React.FC<
  MetaContextProviderProps &
    KeyboardWrapperProps &
    ExternalProps &
    MultiProductDialogProps
> = (props) => {
  return (
    <ContextWrappedMultiProductDialog {...props}>
      {props.children}
    </ContextWrappedMultiProductDialog>
  );
};
`}

${(
  <Props
    heading="MetaContextProviderProps"
    props={require('!!extract-react-types-loader!../examples/props/extensible/props-meta-context-provider.tsx')}
  />
)}

${code`
interface UserDetails {
  id?: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
  hasSoftwareAccess?: boolean;
}
`}

${(
  <>
    <Props
      heading="KeyboardWrapperProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-keyboard-wrapper.tsx')}
    />

    <Props
      heading="ExternalProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-external.tsx')}
    />

    <Props
      heading="MultiProductDialogProps"
      props={require('!!extract-react-types-loader!../examples/props/extensible/props-multi-product-dialog.tsx')}
    />
  </>
)}

## Component Usage Examples

Our two core components, \`MultiProductDialog\` and \`SearchDialogProduct\`, can be used in conjunction to provide 3 core functionalities.
1. Bootstraping a simple product tab
2. Registering a new product tab with an existing dialog
3. Tab layout configuration

### Bootstraping a simple product tab

${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(
          require('../examples/extensible-samples/01-simple-tab-bootstrap-example')
            .default,
        )}
      </ExampleContainer>
    )}
    title="Bootstraping a simple product tab"
    source={require('!!raw-loader!../examples/extensible-samples/01-simple-tab-bootstrap-example')}
  />
)}

With our new tab component design, configured product tabs no longer have to live within \`product-search-dialog\`, allowing teams to take control over their
own components and develop within their respective spaces. We encourage teams to do so. This also makes the process of bumping product/dialog packages simpler
without having to consistently bump all product packages at once.

This example is quite trivial and does not make use of \`intl\` for section and title names within the \`SearchDialogProduct\` component. \`intl\` is passed through context
within the \`MultiProductDialog\` component via context for use within registered functions for correct internalisation.

### Registering a new product tab with an existing dialog

${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(
          require('../examples/extensible-samples/02-multiple-tab-bootstrap-example')
            .default,
        )}
      </ExampleContainer>
    )}
    title="Registering a new product tab with an existing dialog"
    source={require('!!raw-loader!../examples/extensible-samples/02-multiple-tab-bootstrap-example')}
  />
)}

Configured product tabs within a dialog take a \`order\` property which specifies the order of the tab to be displayed within the dialog, overriding the component ordering.
When adding your product into an existing dialog, ensure that you communicate with the owner of the dialog which order is best suited for your product tab.

### Tab layout configuration
${(
  <Example
    packageName="@atlassian/product-search-dialog"
    Component={() => (
      <ExampleContainer>
        {React.createElement(
          require('../examples/extensible-samples/03-tab-layout-configuration-example')
            .default,
        )}
      </ExampleContainer>
    )}
    title="Tab layout configuration"
    source={require('!!raw-loader!../examples/extensible-samples/03-tab-layout-configuration-example')}
  />
)}

The internal productState of the dialog is exposed to \`SearchDialogProduct\`'s along with the user query for further customisation of the layout of the tab.
<br/>
<br/>
Supported product states:

${code`
enum ProductStates {
  PreQueryLoading = 'PreQueryLoading',
  PostQueryLoading = 'PostQueryLoading',

  PreQuerySuccess = 'PreQuerySuccess',
  PostQuerySuccess = 'PostQuerySuccess',

  PreQueryError = 'PreQueryError',
  PostQueryError = 'PostQueryError',

  PreQueryNoResult = 'PreQueryNoResult',
  PostQueryNoResult = 'PostQueryNoResult',
}
`}

${code`
<SearchDialogProduct props={...props}>
  {({ productState, linkComponent, query }: ResultRendererChildFnArgs) => {
    return {
      Header: () => <ExampleCustomHeader />,
      Body: () => <ExampleCustomBody />,
      Footer: () => <ExampleCustomFooter />,
    };
  }}
</SearchDialogProduct>
`}
`;
