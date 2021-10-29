import React from 'react';
import { md, AtlassianInternalWarning } from '@atlaskit/docs';

export default md`
${(<AtlassianInternalWarning />)}

Search Dialog provides data-agnostic UI components needed to compose Quick Search.

Quick Search components are used in Product Search Dialog by Atlassian Global Navigation, for example in Jira and Confluence.

## Guides

### [Composing search](#/packages/search/search-dialog/docs/composing-search)
Demonstrates with code examples how to use Search Dialog's components together.

### [Theming](#/packages/search/search-dialog/docs/theming)
This covers how to theme your search dialog.

## API Documentation

Reference documentation with detail on the exported components provided by the Search Dialog.

### [Presentational components](#/packages/search/search-dialog/docs/dialog-components)
These are core components that make up the dialog. We provide a bunch of different components that you can compose together to create your own dialog.

### [Keyboard navigation](#/packages/search/search-dialog/docs/keyboard-navigation)
These are components that are used to add support for special keyboard navigation within the dialog.
`;
