import React from 'react';
import { md, Example, AtlassianInternalWarning, code } from '@atlaskit/docs';

export default md`
  ${(<AtlassianInternalWarning />)}

  ## Composing the dialog

  This guide aims to give a step by step walkthrough of how to compose the search dialog.
  You do not have to build the search dialog with all the feature in these example if you don't need them.
  There are also features that may not be demonstrated here, check the main reference pages for all the components that are offered by the search-dialog.

  ## The basic dialog

  This example contains the bare bone search dialog. This example also demonstrates how to wire up the search dialog container with the input.

  The basic dialog only needs the [SearchInput](dialog-components#SearchInput) and [SearchDialog](dialog-components#SearchDialog) with some simple logic to control when the dialog opens and closes.

  ${(
    <Example
      packageName="@atlassian/search-dialog"
      Component={require('../examples/101-step-1-basic-dialog').default}
      title="Basic"
      source={require('!!raw-loader!../examples/101-step-1-basic-dialog')}
    />
  )}

  ## Adding results

  This example expands on the previous example and demonstrates how to add your results to the dialog.

  Here we show the results in separate sections showing the use of [SearchResultSection](dialog-components#SearchResultSection) and [SearchResult](dialog-components#SearchResult) components.

  ${(
    <Example
      packageName="@atlassian/search-dialog"
      Component={require('../examples/102-step-2-with-results').default}
      title="With Results"
      source={require('!!raw-loader!../examples/102-step-2-with-results')}
    />
  )}

  ## Adding footer

  This example expands on the previous example and demonstrates how you would add a footer to the dialog.

  To add footer simply add a [SearchFooter](dialog-components#SearchFooter) below the [SearchResultSection](dialog-components#SearchResultSection) from the previous example. The content of the footer is up to you.

  ${(
    <Example
      packageName="@atlassian/search-dialog"
      Component={require('../examples/103-step-3-with-footer').default}
      title="With Footer"
      source={require('!!raw-loader!../examples/103-step-3-with-footer')}
    />
  )}

  ## Adding filters

  This example expands on the previous example and demonstrates how you would add filters to the dialog.

  To add filters you will need to add a few more structures to the dialog content first. You will need to use the following wrapper components:
    - [SearchDialogContent](dialog-components#SearchDialogContent): This will wrap the search results but not the footer
    - [ResultContainer](dialog-components#ResultContainer): This will sit below the SearchDialogContent and wrap the search results
    - [SidebarContainer](dialog-components#SidebarContainer): This will sit below the SearchDialogContent and wrap the new filter group

  The filters you want to add will live below [SidebarContainer](dialog-components#SidebarContainer) and are structured similarly to the search results.
  Instead of the search results components you will need to use [FilterGroup](dialog-components#FilterGroup) and [FilterItem](dialog-components#FilterItem).

  ${(
    <Example
      packageName="@atlassian/search-dialog"
      Component={require('../examples/104-step-4-with-filters').default}
      title="With Filters"
      source={require('!!raw-loader!../examples/104-step-4-with-filters')}
    />
  )}

  ## Adding keyboard navigation

  This example expands on the previous example and adds keyboard navigation

  This will involve wrapping everything we've done in the previous example with the [KeyboardHighlightProvider](keyboard-navigation#KeyboardHighlightProvider).

  In the example below try focusing on the input and then pressing up or down.

  ${(
    <Example
      packageName="@atlassian/search-dialog"
      Component={
        require('../examples/105-step-5-with-keyboard-navigation').default
      }
      title="With Keyboard"
      source={require('!!raw-loader!../examples/105-step-5-with-keyboard-navigation')}
    />
  )}

  ## Adding everything to the Atlassian navigation

  The search dialog is designed to work with Atlassian navigation. Putting everything together we can put the examples in the previous examples into the Atlassian Navigation under
  the \`renderSearch\` prop.

  Before doing so make sure the search dialog you've built in the previous section is wrapped in the [SearchAnchor](dialog-components#SearchAnchor).

  Below is a code snippet of what that could look like, note that we have wired the \`onBlur\` and \`onKeyDown\` on the \`SearchAnchor\` to open the dialog.


  ${code`
const SearchDialogWithAnchor = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SearchAnchor
      isExpanded={isExpanded}
      onBlur={() => setIsExpanded(false)}
      onKeyDown={() => setIsExpanded(true)}
    >
      <ExampleSearchDialog />
    </SearchAnchor>
  )
}

const NavigationWithSearch = () => (
  <AtlassianNavigation
    primaryItems={...}
    renderAppSwitcher={...}
    renderCreate={...}
    renderHelp={...}
    renderNotifications={...}
    renderProductHome={...}
    renderProfile={...}
    renderSearch={SearchDialogWithAnchor} // <- this is what is important for search
    label="Confluence Nav"
    renderSettings={...}
    moreLabel={...}
    theme={...}
  />
)
`}

`;
