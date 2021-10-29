import React from 'react';

import {
  AtlassianInternalWarning,
  code,
  DevPreviewWarning,
  Example,
  md,
  Props,
} from '@atlaskit/docs';

import DataGridCardExample from '../examples/00-DataGridCard';
import InfoCardExample from '../examples/02-InfoCardWithWrapperExample';
import JiraProductStatsCard from '../examples/03-JiraProductStatsCard';
import ConfluenceProductStatsCard from '../examples/04-ConfluenceProductStatsCard';
import BitbucketProductStatsCard from '../examples/05-BitbucketProductStatsCard';
import LinkCard from '../examples/06-LinkCard';
import JiraProductStatsCardCustomer from '../examples/07-JiraProductStatsCardWithCustomer';

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

  ### DataGridCard

  ${code`import { DataGridCard } from '@atlassian/mpt-cards';`}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <DataGridCardExample />}
      title="DataGridCard example"
      source={require('!!raw-loader!../examples/00-DataGridCard')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/ui/data-grid-card')}
    />
  )}

  ### InfoCard

  ${code`import { InfoCard } from '@atlassian/mpt-cards';`}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <InfoCardExample />}
      title="InfoCard with CardsWrapper example"
      source={require('!!raw-loader!../examples/01-InfoCardWithoutNameExample')}
    />
  )}

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/ui/info-card')}
    />
  )}

  ### Link Card

  ${code`import { LinkCard } from '@atlassian/mpt-cards';`}

  ${(
    <Props
      heading="LinkCard Props"
      props={require('!!extract-react-types-loader!../extract-react-types/link-card.ts')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <LinkCard />}
      title="Link card"
      source={require('!!raw-loader!../examples/06-LinkCard')}
    />
  )}

  ### Products Stats Cards

  ${code`import { ProductStatsCard } from '@atlassian/mpt-cards';`}

  ${(
    <Props
      heading="ProductStatsCard Props"
      props={require('!!extract-react-types-loader!../extract-react-types/product-stats-card.ts')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <JiraProductStatsCard />}
      title="Jira product stats card"
      source={require('!!raw-loader!../examples/03-JiraProductStatsCard')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <JiraProductStatsCardCustomer />}
      title="Jira product stats card"
      source={require('!!raw-loader!../examples/07-JiraProductStatsCardWithCustomer')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <ConfluenceProductStatsCard />}
      title="Confluence product stats card"
      source={require('!!raw-loader!../examples/04-ConfluenceProductStatsCard')}
    />
  )}

  ${(
    <Example
      packageName="@atlassian/mpt-cards"
      Component={() => <BitbucketProductStatsCard />}
      title="Bitbucket product stats card"
      source={require('!!raw-loader!../examples/05-BitbucketProductStatsCard')}
    />
  )}
`;
