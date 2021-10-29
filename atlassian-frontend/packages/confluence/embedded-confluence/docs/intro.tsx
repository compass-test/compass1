import React from 'react';

import { md, code } from '@atlaskit/docs';
import SectionMessage from '@atlaskit/section-message';

export default md`
This library will export components support any parent Product has Confluence Cloud experience embedded.

### Note

${(
  <SectionMessage appearance="warning">
    <p>This library is still under early development.</p>
    <p>Usages and Examples are subject to changes.</p>
  </SectionMessage>
)}

### Usage

#### Load Confluence embedded page with display mode specified
${code`
    import { ConfluenceEmbeddedPage, EMBEDDED_CONFLUENCE_MODE } from '@atlassian/embedded-confluence';

    render() {
      return (
        <ConfluenceEmbeddedPage mode={EMBEDDED_CONFLUENCE_MODE.EDIT_MODE}/>
      )
    }
`}

#### Load specific Confluence embedded components
${code`
    import {
      EditPage,
      ViewPage
    } from '@atlassian/embedded-confluence';

    render() {
      return (
        <>
          <p>Confluence Edit Component</p>
          <EditPage />

          <p>Confluence View Component</p>
          <ViewPage />
        </>
      )
    }
`}
`;
