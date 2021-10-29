import React from 'react';
import { md, code, Example, AtlassianInternalWarning } from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

${(<h2>Theming</h2>)}

Theming for the search-dialog is provided through the use of [ThemeProvider](#theme-provider) component and the [useTheme](#theme-provider) hook.

${(<h2 id="theme-provider">ThemeProvider, useTheme</h2>)}

Required React Context providing theme for styling.

${code`
import { ThemeProvider, useTheme } from '@atlassian/search-dialog';
`}

Custom theme configuration can be passed to "ThemeProvider" via prop "partialSearchCSS", which allows a partial object of the shape <code>SearchCSS</code> from @atlassian-navigation [Theming](https://atlaskit.atlassian.com/packages/navigation/atlassian-navigation/docs/theming).

For example:

${code`
import { ThemeProvider, useTheme } from '@atlassian/search-dialog';

const App = () => (
  <ThemeProvider partialSearchCSS={{ default: { color: 'blue' } }}>
    // ...
  </ThemeProvider>
)
`}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/01-theming-basic').default}
    title="Default"
    source={require('!!raw-loader!../examples/01-theming-basic')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/02-theming-custom').default}
    title="Custom Theme"
    source={require('!!raw-loader!../examples/02-theming-custom')}
  />
)}

${(
  <Example
    packageName="@atlassian/search-dialog"
    Component={require('../examples/03-theming-atlassian-theme').default}
    title="Atlassian Themes"
    source={require('!!raw-loader!../examples/03-theming-atlassian-theme')}
  />
)}

${code`
import { ThemeProvider, useTheme } from '@atlassian/search-dialog';
`}
`;
