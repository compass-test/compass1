import React from 'react';

import { css } from '@emotion/core';
import PageHeader from '@atlaskit/page-header';

import type { GetStaticProps, GetStaticPaths } from 'next';

import DynamicTable from '@atlaskit/dynamic-table';

import ButtonGroup from '@atlaskit/button/button-group';
import Button from '@atlaskit/button/standard-button';
import { gridSize as getGridSize } from '@atlaskit/theme/constants';
import DocumentIcon from '@atlaskit/icon/glyph/document';
import CodeIcon from '@atlaskit/icon/glyph/code';

import ChevronUpIcon from '@atlaskit/icon/glyph/chevron-up';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';

import DynamicTableEnhancer from '../../components/dynamic-table-enhancer';

import { getPackagesSideNavData } from '../../utils/navigation';

import type { TechStack } from '../../types/package';
import * as packageUtils from '../../utils/package';
import * as registryUtils from '../../utils/registry';
import * as versionUtils from '../../utils/version';

import * as table from '../../utils/table';
import PageContent, { PageContentProps } from '../../components/page-content';
import Link from 'next/link';
import { N200 } from '@atlaskit/theme/colors';
import Label from '../../components/primitives/label';

const gridSize = getGridSize();

type PackagePageProps = {
  name: string;
  displayName: string;
  description: string;
  homepage: string | null;
  created: string;
  lastModified: string;
  techstack: TechStack;
  rows: Row[];
  sideNavData: PageContentProps['sideNavData'];
};

type Row = [
  table.Version,
  table.LiteMode,
  table.Styling,
  table.Theming,
  table.Documentation,
  table.Release,
];

const head: table.Head<Row> = [
  table.col.version,
  table.col.liteMode,
  table.col.styling,
  table.col.theming,
  table.col.documentation,
  table.col.release,
];

const showContent = (row: Row): Row => {
  const [version, liteMode, styling, theming, documentation, release] = row;
  return [
    table.showVersion(version),
    table.showLiteMode(liteMode),
    table.showStyling(styling),
    table.showTheming(theming),
    table.showDocumentation(documentation),
    table.showRelease(release),
  ];
};

const subtitleStyles = css({
  display: 'flex',
  color: N200,
  marginTop: -3 * gridSize,
  alignItems: 'baseline',
});

const descriptionStyles = css({ marginTop: 2 * gridSize, marginBottom: 0 });

const contentLinkStyles = css({
  paddingLeft: 2 * gridSize,
  listStylePosition: 'inside',
  marginTop: 2 * gridSize,
});

const historyToggleStyles = css({
  display: 'flex',
  justifyContent: 'flex-end',
});

const PackagePage = (props: PackagePageProps) => {
  const [isFullHistoryVisible, setIsFullHistoryVisible] = React.useState(false);

  const toggleIsFullHistoryVisible = React.useCallback(
    () =>
      setIsFullHistoryVisible((isFullHistoryVisible) => !isFullHistoryVisible),
    [setIsFullHistoryVisible],
  );

  return (
    <PageContent sideNavData={props.sideNavData}>
      <PageHeader
        actions={
          <ButtonGroup>
            {props.homepage && (
              <Link href={props.homepage} passHref>
                <Button iconBefore={<DocumentIcon label="" />}>
                  Documentation
                </Button>
              </Link>
            )}
            <Link
              href={`https://atlaskit.atlassian.com/examples/design-system/${props.name}`}
              passHref
            >
              <Button iconBefore={<CodeIcon label="" />}>Examples</Button>
            </Link>
          </ButtonGroup>
        }
      >
        {props.displayName}
      </PageHeader>
      <span css={subtitleStyles}>
        <Label>Latest release:</Label>
        &nbsp;
        {formatDistanceToNow(new Date(props.lastModified))} ago
      </span>
      <p css={descriptionStyles}>{props.description}</p>

      <ul css={contentLinkStyles}>
        <li>
          <Link href="#history">Jump to version history.</Link>
        </li>
        <li>
          <Link href="#techstack">Jump to techstack information.</Link>
        </li>
      </ul>

      <h2 id="history">History</h2>
      <DynamicTableEnhancer>
        <DynamicTable
          caption="Recent"
          head={table.transformHead(head)}
          rows={table.transformRows(
            isFullHistoryVisible ? props.rows : props.rows.slice(0, 5),
            showContent,
          )}
          defaultSortKey={head[0]}
          defaultSortOrder="DESC"
        />
      </DynamicTableEnhancer>
      <div css={historyToggleStyles}>
        <Button
          iconAfter={
            isFullHistoryVisible ? (
              <ChevronUpIcon label="" />
            ) : (
              <ChevronDownIcon label="" />
            )
          }
          onClick={toggleIsFullHistoryVisible}
          shouldFitContainer
        >
          {isFullHistoryVisible ? 'Show less' : 'Show more'}
        </Button>
      </div>

      <h2 id="techstack">Techstack</h2>
      {Object.entries(props.techstack ?? {}).map(([key, val]) => (
        <table key={key}>
          <caption>{key}</caption>
          <thead>
            <tr>
              <th>Rule</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(val ?? {}).map(([rule, ruleVal]) => (
              <tr key={rule}>
                <td>
                  <code>{rule}</code>
                </td>
                <td>
                  <code>{ruleVal}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </PageContent>
  );
};

export default PackagePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const packages = await packageUtils.getAllPackages({
    shouldHidePrivate: true,
  });
  const paths = packages.map((pkg) => ({
    params: {
      name: packageUtils.getUnscopedName(pkg),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PackagePageProps> = async ({
  params = {},
}) => {
  if (Array.isArray(params.name)) {
    throw new Error('TODO: handle edge case..?');
  }

  const [allPackages, pkg] = await Promise.all([
    packageUtils.getAllPackages({
      shouldHidePrivate: true,
    }),
    packageUtils.getPackageUnsafe(params.name),
  ]);
  // TODO: handle private pages...? Need to handle none case
  const data = (await registryUtils.getRegistryData(pkg)).some();

  const getDate = (val?: string) => (val ? new Date(val) : new Date());

  const rows = Object.keys(data.time)
    .filter((key) => !['created', 'modified'].includes(key))
    .reverse()
    .map((version) => {
      const released = versionUtils
        .getVersionReleaseDate(version)(data)
        .cata(getDate, getDate)
        .valueOf();

      return [
        { name: table.col.version, value: version },
        {
          name: table.col.liteMode,
          value: versionUtils.isLiteModed(version)(data).orJust(false),
        },
        {
          name: table.col.styling,
          value: versionUtils.getStyling(version)(data).orNull(),
        },
        {
          name: table.col.theming,
          value: versionUtils.getTheming(version)(data).orNull(),
        },
        {
          name: table.col.documentation,
          value: versionUtils.getDocumentation(version)(data).orNull(),
        },
        { name: table.col.release, value: released },
      ] as Row;
    });

  return {
    props: {
      name: params.name,
      displayName: packageUtils.getDisplayName(pkg),
      description: packageUtils.getDescription(pkg).orJust(''),
      created: registryUtils.getDateCreated(data),
      lastModified: registryUtils.getDateModified(data),
      homepage: packageUtils.getConstellationPage(pkg).orNull(),
      techstack: packageUtils.getTechStack(pkg).orJust({}),
      rows,
      sideNavData: getPackagesSideNavData(allPackages),
    },
  };
};
