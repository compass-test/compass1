import React, { FC } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { gridSize } from '@atlaskit/theme';
import Table from '@atlaskit/dynamic-table';

import * as fs from '../utils/fs';
import Page, { Title, Section } from '../components/Page';
import { packages, getConfig } from '../site';

type HeadType = {
  cells: Array<{
    key: string;
    content: string;
    shouldTruncate?: boolean;
    isSortable: boolean;
    width: number;
  }>;
};

export interface RowCellType {
  key?: string | number;
  colSpan?: number;
  content?: React.ReactNode | string;
  testId?: string;
}

type RowType = {
  cells: Array<RowCellType>;
  key?: string;
  onClick?: React.MouseEventHandler;
  testId?: string;
};

const head: HeadType = {
  cells: [
    {
      key: 'name',
      content: 'Name',
      isSortable: true,
      width: 20,
    },
    {
      key: 'recommendation',
      content: 'Recommendation',
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
    {
      key: 'team',
      content: 'Team',
      shouldTruncate: true,
      isSortable: true,
      width: 20,
    },
  ],
};

const RowCell = styled.div`
  padding-bottom: ${gridSize}px;
  padding-top: ${gridSize}px;
`;

const renderRow = (
  { name: packageName, version, atlaskit, atlassian }: any,
  { id }: fs.Directory,
  groupId: string,
): RowType => ({
  cells: [
    {
      key: id,
      content: (
        <RowCell>
          <a href={`/packages/${groupId}/${id}`}>{fs.titleize(id)}</a>
        </RowCell>
      ),
    },
    {
      key: 'recommendation',
      content: (
        <RowCell>
          {(atlaskit && atlaskit.deprecated) ||
            (atlassian && atlassian.website && atlassian.website.deprecated)}
        </RowCell>
      ),
    },
    {
      key: 'publishTime',
      content: (
        <RowCell>
          <a
            href={`https://www.npmjs.com/package/${packageName}`}
            target="_new"
          >
            {version}
          </a>
        </RowCell>
      ),
    },
    {
      key: groupId,
      content: <RowCell>{fs.titleize(groupId)}</RowCell>,
    },
  ],
});

const StatRows = () =>
  fs.getDirectories(packages().children).reduce<RowType[]>((acc, team) => {
    const directories = fs.getDirectories(team.children);
    const rows: RowType[] = [];

    directories.forEach(pkg => {
      const pkgJSON = getConfig(team.id, pkg.id).config;

      const oldDeprecated = pkgJSON.atlaskit && pkgJSON.atlaskit.deprecated;
      const newDeprecated =
        pkgJSON.atlassian &&
        pkgJSON.atlassian.website &&
        pkgJSON.atlassian.website.deprecated;

      if (oldDeprecated || newDeprecated) {
        rows.push(renderRow(pkgJSON, pkg, team.id));
      }
    });

    return acc.concat(rows);
  }, []);

const DeprecationsPage: FC = () => (
  <Page>
    <Helmet>
      <title>{`Deprecated packages - ${BASE_TITLE}`}</title>
    </Helmet>
    <Title>Deprecated packages ⚠️</Title>
    <p>
      The following components are slated for removal in an upcoming release.
      For information on how to migrate, please refer to the component's
      documentation.
    </p>
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

export default DeprecationsPage;
