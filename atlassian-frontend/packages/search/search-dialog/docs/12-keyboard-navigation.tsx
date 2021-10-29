import React from 'react';
import { md, Example, AtlassianInternalWarning } from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

${(<h2 id="KeyboardNavigation">Keyboard Navigation</h2>)}

Keyboard navigation is provided through a wrapper component and a hook.

${(<h2 id="KeyboardHighlightProvider">KeyboardHighlightProvider</h2>)}

In order for components to be eligible for keyboard navigation they must exist below \`KeyboardHighlightProvider\` in the React tree.

This component takes a single prop \`listenerNode\` that contains the DOM ref of the component that must be focused to trigger the keyboard navigation. This is typically the [SearchInput](#/packages/search/search-dialog/docs/dialog-components).

Focus will not be moved away from the component used as the \`listenerNode\` when navigation via keyboard. Currently keyboard navigation only supports moving between components vertically.

Out of the box the keyboard navigation provided includes support for:
* Determining the position of the components relative to each other by examining their position in the DOM.
* Automatically registering new keyboard navigatible components as they become available.
* Correctly navigating between components even when new keyboard navigatible components are added in between existing ones.
* Wrapping around from the end of the list of keyboard navigatible components to the beginning and vice versa.

To mark a component as keyboard-navigatible they will need to use the [useKeyboardNavigation](#useKeyboardNavigation) hook.

Out of the box the [SearchResult](#/packages/search/search-dialog/docs/dialog-components) component are keyboard navigatible.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/25-keyboard-navigation').default}
    title="Keyboard navigation"
    source={require('!!raw-loader!../examples/25-keyboard-navigation')}
  />
)}

${(<h2 id="useKeyboardNavigation">useKeyboardNavigation</h2>)}

This hook is used to make a component navigatible by keyboard. You do not need to use this if you only want the [SearchResult](#/packages/search/search-dialog/docs/dialog-components) to be keyboard navigatible.

This hook takes in an optional \`onKeydownCallback\` callback that is triggered when a key is pressed while the \`listener\` component is in focused and the component using this hook is higlighted.
This is to mimic the behaviour a \`keydown\` event whilst a keyboard navigatible component is focused without actually having the component focused.

You can see this in action by pressing \`Enter\` in the Example while focusing on the Input.

The hook returns 2 values in an array, [isHighlighted, setRef]:
- The first value (\`isHighlighted\`) is whether the component is currently highlighted. Typically you will want to have some visual indication that the component is highlighted.
- The second value (\`setRef\`) should be passed to the top level component that renders a DOM element. This is used to track the relative position of the component compared to the rest of
the keyboard navigatible components.

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/26-keyboard-navigation-custom').default}
    title="Keyboard navigation with custom components"
    source={require('!!raw-loader!../examples/26-keyboard-navigation-custom')}
  />
)}
`;
