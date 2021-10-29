import React from 'react';
import Table from '@atlaskit/dynamic-table';
import SectionMessage from '@atlaskit/section-message';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { gridSize } from '@atlaskit/theme';
import * as fs from '../utils/fs';
import Page, { Title, Section } from '../components/Page';
import { Link } from '../components/WrappedLink';
import { externalPackages, getConfig } from '../site';

export type Head = {
  cells: Array<{
    key: string;
    content: string;
    shouldTruncate?: boolean;
    isSortable: boolean;
    width: number;
  }>;
};

const head: Head = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 20,
    },
    {
      key: 'description',
      content: 'Description',
      shouldTruncate: true,
      isSortable: false,
      width: 45,
    },
    {
      key: 'publishTime',
      content: 'Latest',
      shouldTruncate: true,
      isSortable: false,
      width: 15,
    },
  ],
};

const renderRow = (
  { name: packageName, description, version }: any,
  { id }: fs.Directory,
  groupId: string,
) => {
  return {
    cells: [
      {
        key: id,
        content: (
          <RowCell>
            <Link to={`/packages/${groupId}/${id}`}>{fs.titleize(id)}</Link>
          </RowCell>
        ),
      },
      {
        key: 'description',
        shouldTruncate: true,
        content: <RowCell>{description}</RowCell>,
      },
      {
        key: 'publishTime',
        // new website structure does not have an easy way to get date of last
        // release, so we are skipping it for now.
        content: (
          <RowCell>
            <a
              href={`https://www.npmjs.com/package/${packageName}`}
              target="_new"
            >
              {version}
            </a>
            {null}

            {/* {publishTime ? (
                  <Time dateTime={component.publishedDate}>
                    {' '}({component.publishedDate && new Date(component.publishedDate).toLocaleDateString()})
                  </Time>
                ) : null} */}
          </RowCell>
        ),
      },
    ],
  };
};

const StatRows = () =>
  fs
    .getDirectories(externalPackages().children)
    .reduce<Array<ReturnType<typeof renderRow>>>(
      (acc, team) =>
        acc.concat(
          fs.getDirectories(team.children).map(pkg => {
            const pkgJSON = getConfig(team.id, pkg.id).config;
            return renderRow(pkgJSON, pkg, team.id);
          }),
        ),
      [],
    );

export default function PackagesList() {
  return (
    <Page>
      <Helmet>
        <title>{`Browse all packages - ${BASE_TITLE}`}</title>
      </Helmet>
      <Title data-testid="all-packages">All Packages</Title>
      <Section>
        <SectionMessage title="Internal: Code ownership">
          <p>
            For team ownership and maintainers, please see{' '}
            <a href="https://bitbucket.org/atlassian/atlassian-frontend/src/master/teams.json">
              here
            </a>{' '}
            and the respective package.json.
          </p>
        </SectionMessage>
      </Section>
      <Section>
        <Table
          head={head}
          rows={StatRows()}
          defaultSortKey="name"
          defaultSortOrder="ASC"
        />
      </Section>
    </Page>
  );
}

// Tabular data
const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;
