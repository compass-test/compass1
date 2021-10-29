import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  md,
  Props,
} from '@atlaskit/docs';

const focusPageProps = require('!!extract-react-types-loader!../src/ui/FocusPage');

export default md`
  ${(
    <>
      <div style={{ marginBottom: '0.5rem' }}>
        <AtlassianInternalWarning />
      </div>
      <div style={{ marginTop: '0.5rem' }}>
        <DevPreviewWarning />
      </div>
    </>
  )}

  ## Usage

  ${code`
import FocusPage from '@atlassian/mpt-focus-page';

<FocusPage
  onClose={() => {
    // some modal close logic
  }}
  title="Some title"
  subtitle="Some subtitle"
  bannerMessage={<>Some banner message</>}
  headerButtons={
    <>
      <button>Button #1</button>
      <button>Button #2</button>
    </>
  }
  footerButtons={
    <>
      <button>Button #3</button>
      <button>Button #4</button>
    </>
  }
>
  Some content
</FocusPage>
  `}

  ## Alternative Usage

  This will render in the DOM as identical to the above as the FocusPage component is a combination of the below two components. This variation can be used for scenarios where the FocusPageWrapper component needs to be placed outside of route logic for example, so the modal's background div does not need to remount on route changes.

  ${code`
import { FocusPageWrapper, FocusPageContent } from '@atlassian/mpt-focus-page';

<FocusPageWrapper>
  <FocusPageContent
    onClose={() => {
      // some modal close logic
    }}
    title="Some title"
    subtitle="Some subtitle"
    bannerMessage={<>Some banner message</>}
    headerButtons={
      <>
        <button>Button #1</button>
        <button>Button #2</button>
      </>
    }
    footerButtons={
      <>
        <button>Button #3</button>
        <button>Button #4</button>
      </>
    }
  >
    Some content
  </FocusPageContent>
</FocusPageWrapper>
  `}

  ${(<Props props={focusPageProps} />)}
  `;
