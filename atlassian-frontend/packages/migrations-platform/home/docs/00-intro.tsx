import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import JiraHomePage from '../examples/00-JiraHomePageExample';
import ConfluenceHomePage from '../examples/01-ConfluenceHomePageExample';
import JiraInterimHomePageEAP from '../examples/02-JiraInterimHomePageEapExample';
import JiraInterimHomePage from '../examples/03-JiraInterimHomePageExample';
import HomeButtonExample from '../examples/04-HomeButtonExample';

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

  ${code`import { HomePage } from '@atlassian/mpt-home'`}

  ### JiraHomePage

  ${(
    <Props
      heading="Home Props"
      props={require('!!extract-react-types-loader!../src')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-home"
      Component={() => JiraHomePage()}
      title="Jira Home page example"
      source={require('!!raw-loader!../examples/00-JiraHomePageExample')}
    />
  )}

  ### ConfluenceHomePage

  ${(
    <Example
      packageName="@atlassian/mpt-home"
      Component={() => ConfluenceHomePage()}
      title="Confluence Home page example"
      source={require('!!raw-loader!../examples/01-ConfluenceHomePageExample')}
    />
  )}

  ### JiraInterimHomePageEap

  ${code`import { HomePageInterim } from '@atlassian/mpt-home'`}

  ${(
    <Example
      packageName="@atlassian/mpt-home"
      Component={() => JiraInterimHomePageEAP()}
      title="Jira Interim Home page example"
      source={require('!!raw-loader!../examples/02-JiraInterimHomePageEapExample')}
    />
  )}

  ### JiraInterimHomePage

  ${code`import { HomePageInterim } from '@atlassian/mpt-home'`}

  ${(
    <Example
      packageName="@atlassian/mpt-home"
      Component={() => JiraInterimHomePage()}
      title="Jira Interim Home page example"
      source={require('!!raw-loader!../examples/03-JiraInterimHomePageExample')}
    />
  )}

  ### HomeButton

  ${code`import { HomeButton } from '@atlassian/mpt-home'`}

  ${(
    <Example
      packageName="@atlassian/mpt-home"
      Component={() => HomeButtonExample()}
      title="Jira Interim Home page example"
      source={require('!!raw-loader!../examples/04-HomeButtonExample')}
    />
  )}

  ${(
    <Props
      heading="Home button Props"
      props={require('!!extract-react-types-loader!../src')}
    />
  )}
`;
