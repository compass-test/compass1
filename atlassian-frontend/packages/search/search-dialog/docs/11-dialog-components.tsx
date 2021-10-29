import React from 'react';
import {
  md,
  Example,
  AtlassianInternalWarning,
  Props,
  code,
} from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

${(<h2>Dialog Components</h2>)}

These components are the building blocks for building for the search dialog itself.

The components are split into 2 areas, the search input and the dialog component that lives under the input visually.

See [composition guide](#/packages/search/#/packages/search/search-dialog/docs/composing-search) for examples on how to use these together.

#### Dialog structure
These components are the top level components of the search dialog.
- [SearchDialog](#SearchDialog)
- [SearchAnchor](#SearchAnchor)

#### Search input
- [SearchInput](#SearchInput)

#### Results
These components help you render the results (or lack thereof).

- [SearchResult](#SearchResult)
- [SearchResultSection](#SearchResultSection)
- [SearchResultSectionLink](#SearchResultSectionLink)
- [EmptyState](#EmptyState)

#### Footer
- [SearchFooter](#SearchFooter)

#### Filters
These components help create the filter side panel

- [SearchDialogContent](#FilterStructure)
- [SidebarContainer](#FilterStructure)
- [ResultContainer](#FilterStructure)
- [FilterGroup](#FilterGroup)
- [FilterItem](#FilterItem)
- [FilterShowMoreItem](#FilterShowMore)
- [FilterShowMore](#FilterShowMore)

#### Other
These components are mostly helper components to reuse common patterns.
- [Link](#Link)
- [ReturnIcon](#ReturnIcon)

<br/>

***

${(<h2 id="SearchDialog">SearchDialog</h2>)}

The search dialog component which is designed to appear underneath the search input. It is the component where the search results will be displayed.

This component is built to support a mobile experience when used along with the [SearchInput](#SearchInput).

Also see the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/05-search-dialog').default}
    title="Basic"
    source={require('!!raw-loader!../examples/05-search-dialog')}
  />
)}

${(<h2 id="SearchAnchor">SearchAnchor</h2>)}

Top level component designed to wrap SearchInput and SearchDialog and provides styling to anchor it to the appropriate positions on the top navigation bar. This also enables the dialog to show a proper full screen experience when the screen width is too restrictive (mobile experience).

SearchAnchor provides callbacks to key events for Search: "onBlur", "onFocus" and "onKeyDown" that need to be manually implemented to ensure that the dialog opens and closes as appropriate.

TODO
See the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more details on this component.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/11-search-anchor').default}
    title="Example"
    source={require('!!raw-loader!../examples/11-search-anchor')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/search-anchor-props')}
  />
)}

${(<h2 id="SearchInput">SearchInput</h2>)}

The search input component. This is the entry point for users of search to type in their query.

Also see the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/04-search-input').default}
    title="Basic"
    source={require('!!raw-loader!../examples/04-search-input')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/search-input-props')}
  />
)}

${(<h2 id="SearchResult">SearchResult</h2>)}

The search result list item. Each \`SearchResult\` represents a single search result. Result items are grouped together via the use of [SearchResultSection](#SearchResultSection).

When a second column of content is needed in Search Dialog, for example when used with filters are visible, the prop "isCollapsed" should be considered to make the layout more space efficient.

A custom Link may be passed via "linkComponent", for example to faciliate SPA transitions.

See the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/07-search-result').default}
    title="Basic"
    source={require('!!raw-loader!../examples/07-search-result')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/08-search-result-kitchen-sink').default}
    title="Kitchen Sink"
    source={require('!!raw-loader!../examples/08-search-result-kitchen-sink')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/search-result-props')}
  />
)}

${(<h2 id="SearchResultSection">SearchResultSection</h2>)}

This component provides a way to group [SearchResults](#SearchResult) into visually distinct section. Each section has a title to show results make up the section.

Each section can optionally show a badge that represents the total number of search results found in that section, this is indepedent of the number of \`SearchResult\` that is actually rendered.

See the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/09-search-result-section').default}
    title="Example"
    source={require('!!raw-loader!../examples/09-search-result-section')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/search-result-section-props')}
  />
)}

${(<h2 id="SearchResultSectionLink">SearchResultSectionLink</h2>)}

This component is used when you need a button or link within a [SearchResultSection](#SearchResultSection). Note this is not to be confused with the \`SearchResult\` and should not be used to display search results.

Examples of where this is appropriate includes a button to show more results or a link to take the user to a full page search experience.


${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/10-search-result-section-link').default}
    title="Example"
    source={require('!!raw-loader!../examples/10-search-result-section-link')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/search-result-section-link-props')}
  />
)}

${(<h2 id="EmptyState">EmptyState</h2>)}

A template for usage within Search Dialog. Typically this will be used when a search errors or no results are found.

This can be used in place of a list of \`SearchResult\` where appropriate.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/06-empty-state').default}
    title="Basic"
    source={require('!!raw-loader!../examples/06-empty-state')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/empty-state-props')}
  />
)}


${(<h2 id="SearchFooter">SearchFooter</h2>)}

A component that can be used to render a footer below the search results. This is typically used to include external links without the user having to do a search.

See the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/12-search-footer').default}
    title="Contextual example - within Search Dialog"
    source={require('!!raw-loader!../examples/12-search-footer')}
  />
)}

${(<h2 id="Link">Link</h2>)}

A helper component that provides can wrap a \'linkComponent\' prop and provide it with a default if a \`linkComponent\` is not provided.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/13-link-component').default}
    title="Example"
    source={require('!!raw-loader!../examples/13-link-component')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/14-link-component-spa-example').default}
    title="SPA Link Example"
    source={require('!!raw-loader!../examples/14-link-component-spa-example')}
  />
)}

${(<h2 id="ReturnIcon">ReturnIcon</h2>)}

The return icon is used to signal a click or keyboard target.

Example below shows how it is can be used to add an Advanced Search link in Search Footer.

The icon is also used to indicate that you can press enter on a Search Result when the item is highlighted by keyboard interaction.

See [Keyboard Navigation](keyboard-navigation) for more detail on keyboard navigation.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/15-return-icon').default}
    title="Example"
    source={require('!!raw-loader!../examples/15-return-icon')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/16-return-icon-search-footer').default}
    title="Advanced Search Link"
    source={require('!!raw-loader!../examples/16-return-icon-search-footer')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/return-icon-props')}
  />
)}

${(
  <h2 id="FilterStructure">
    SidebarContainer, ResultContainer, SearchDialogContent
  </h2>
)}

These component are used when you want to add a sidebar with filters. Using these components you can create a sidebar section as part of the search dialog.

When you use this you will also need to wrap the results section in \`ResultContainer\`. Both this component and \`ResultContainer\` must then be wrapped in \`SearchDialogContent\`.

See the section on filters in the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how these work together.

${code`
import {
  SearchDialogContent,
  ResultContainer,
  SidebarContainer,

  SearchDialog,
} from '../src';

<SearchDialog>
  <SearchDialogContent>
    <ResultContainer>
      //...results goes here
    </ResultContainer>
    <SidebarContainer>
      //...filter groups and items goes here
    </SidebarContainer>
  <SearchDialogContent/>
  //...footer goes here
</SearchDialog>
`}


${(<h2 id="FilterGroup">FilterGroup</h2>)}

This is used to group a list of [FilterItem](#FilterItem). This also a loading state which will render placeholder components if the \`FilterItem\` are rendered asynchronously.

Typically we recommend render 3 items by default and hiding any additional filters behind a [FilterShowMore](#FilterShowMore).

See the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/18-filter-group').default}
    title="Example"
    source={require('!!raw-loader!../examples/18-filter-group')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/19-filter-group-show-loading').default}
    title="Showing loading"
    source={require('!!raw-loader!../examples/19-filter-group-show-loading')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/filter-group-props')}
  />
)}

${(<h2 id="FilterItem">FilterItem</h2>)}

This is used to represent a single filter item. Each filter item is intended to be used by the user to narrow down the search. This is typically used with [FilterGroup](#FilterGroup) especially if multiple types of filters is provided.

Each filter item in the same group should be considered to have an **OR** relation. Filters between groups is considered to have an **AND** relation.

It's up to the consumer of these components to track the state of the selected filters.

Also see the [composition guide](#/packages/search/search-dialog/docs/composing-search) for more examples on how to use the components together.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/17-filter-item').default}
    title="Example"
    source={require('!!raw-loader!../examples/17-filter-item')}
  />
)}

${(
  <Props
    props={require('!!extract-react-types-loader!../examples/props/filter-item-props')}
  />
)}

${(<h2 id="FilterShowMore">FilterShowMore, FilterShowMoreItem</h2>)}

This component provides a way for user to find and add more filters. New filters can be passed to this as a list or loaded asynchronously via a callback (or some combination of both).

This is used when there are either more filters to pick from than should be shown by default (we recommend only showing 3 filters per section by default)
or when the full list of filters is not immediately loaded and can instead be searched for.

Visually this component is a button that when pressed will switch to a @atlaskit/select component.

We provide a helper component [FilterShowMoreItem](#FilterShowMoreItem) for the items displayed in the select dropdown.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/20-filter-show-more').default}
    title="Filter show more"
    source={require('!!raw-loader!../examples/20-filter-show-more')}
  />
)}

${(
  <Props
    heading="FilterShowMore"
    props={require('!!extract-react-types-loader!../examples/props/filter-show-more-props')}
  />
)}

${(
  <Props
    heading="FilterShowMoreItem"
    props={require('!!extract-react-types-loader!../examples/props/filter-show-more-item-props')}
  />
)}

`;
