import React, { ReactNode } from 'react';

import { css, Global } from '@emotion/core';
import type { GetStaticProps } from 'next';

import DynamicTable from '@atlaskit/dynamic-table';

import { Code } from '@atlaskit/code';
import PageHeader from '@atlaskit/page-header';
import Textfield from '@atlaskit/textfield';
import SearchIcon from '@atlaskit/icon/glyph/search';
import FilterIcon from '@atlaskit/icon/glyph/filter';

import { N0, N100, N200, N30 } from '@atlaskit/theme/colors';
import { gridSize as getGridSize } from '@atlaskit/theme/constants';
import { e400 } from '@atlaskit/theme/elevation';
import { h700, h600 } from '@atlaskit/theme/typography';

import InlineMessage from '@atlaskit/inline-message';

import Button from '@atlaskit/button/standard-button';
import { Checkbox } from '@atlaskit/checkbox';

import fuzzy from 'fuzzy';
import always from 'lodash/fp/always';

import { getPackagesSideNavData } from '../../utils/navigation';

import DynamicTableEnhancer from '../../components/dynamic-table-enhancer';

import * as packageUtils from '../../utils/package';
import * as registryUtils from '../../utils/registry';

import * as table from '../../utils/table';

import { Predicate } from '../../types/util';
import { PackageJSON } from '../../types/package';
import PageContent, { PageContentProps } from '../../components/page-content';
import Label from '../../components/primitives/label';

import { or } from '../../utils/fp';
import InfoHint from '../../components/info-hint';

import {
  FilterOptions,
  optionData,
} from '../../components/packages/filters/options';
import getLastBuilt from '../../utils/get-last-built';

type PageProps = {
  rows: Row[];
  sideNavData: PageContentProps['sideNavData'];
};

type Row = [
  table.Name,
  table.PackageName,
  table.LiteMode,
  table.Styling,
  table.Theming,
  table.Documentation,
  table.Version,
  table.Release,
  table.Deprecated,
];

const head: table.Head<Row> = [
  table.col.name,
  table.col.packageName,
  table.col.liteMode,
  table.col.styling,
  table.col.theming,
  table.col.documentation,
  table.col.version,
  table.col.release,
  table.col.deprecated,
];

const showContent = (row: Row): Row => {
  const [
    name,
    packageName,
    liteMode,
    styling,
    theming,
    documentation,
    version,
    release,
    deprecated,
  ] = row;
  return [
    name,
    table.showPackageName(packageName),
    table.showLiteMode(liteMode),
    table.showStyling(styling),
    table.showTheming(theming),
    table.showDocumentation(documentation),
    table.showVersion(version),
    table.showRelease(release),
    table.showDeprecation(deprecated),
  ];
};

const gridSize = getGridSize();

type FieldSetProps<T extends table.Col<any, any>> = {
  label?: ReactNode;
  options: FilterOptions<T>;
  // getPredicate: (value: T['value']) => Predicate<T>;
  onChange: (predicate: Predicate<T>) => void;
  info?: ReactNode;
};

const fieldsetStyles = css({ '& + &': { marginTop: '8px' } });

const legendStyles = css({
  padding: '0px',
  display: 'flex',
  gap: '4px',
  alignItems: 'center',
  height: '24px',
  '> span': {
    marginBottom: '0',
  },
  '> div': {
    display: 'inline-flex',
  },
});

const FieldSet = <T extends table.Col<any, any>>({
  label,
  options,
  onChange,
  info,
}: FieldSetProps<T>) => {
  const [checked, setChecked] = React.useState(options.map(() => false));

  const updateChecked = React.useMemo(
    () =>
      options.map((_, i) => () =>
        setChecked((currentChecked) => {
          const copy = Array.from(currentChecked);
          copy[i] = !copy[i];
          return copy;
        }),
      ),
    [options],
  );

  const predicate = React.useMemo(() => {
    const applied = checked.reduce<T['value'][]>(
      (acc, cur, i) => (cur ? acc.concat(options[i].value) : acc),
      [],
    );

    if (applied.length === 0) {
      return always(true);
    }

    return or(
      ...applied.map((value) => (col: T) => {
        return col.value === value;
      }),
    );
  }, [checked, options]);

  React.useEffect(() => {
    console.log('predicate changed');

    onChange(predicate);
  }, [predicate, onChange]);

  return (
    <fieldset css={fieldsetStyles}>
      <legend css={legendStyles}>
        <Label>{label}</Label>
        {info && <InfoHint>{info}</InfoHint>}
      </legend>
      {options.map(({ label, value }, i) => (
        <Checkbox
          key={`${label}-${i}`}
          value={String(value)}
          label={label}
          // name={name}
          isChecked={checked[i]}
          onChange={updateChecked[i]}
        />
      ))}
    </fieldset>
  );
};

type Filters<T extends table.Col<any, any>[]> = {
  [Index in keyof T]: T[Index] extends table.Col<any, any>
    ? Predicate<T[Index]>
    : never;
};

const noFilter = always(true);

type PageFilterSidebarProps = {
  onChange: (predicate: Predicate<Row>) => void;
};

const filterHeadingContainerStyles = css({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
});

const filterHeadingStyles = css({
  height: '32px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '24px',
  flexShrink: 0,
});

const filterOptionsContainerStyles = css({ width: '100%' });

const PageFilterSidebar = ({ onChange }: PageFilterSidebarProps) => {
  console.log('Render PageFilterSidebar');

  /**
   * FIXME: Currently clear filters by remounting...
   *
   * I think this is a good indication I'm not handling state well here.
   * Should be more top down.
   *
   * Also related issue with closing + reopening filters panel
   * resets them.
   */
  const [keyPrefix, setKeyPrefix] = React.useState(0);
  const incrementKeyPrefix = React.useCallback(() => {
    setKeyPrefix((keyPrefix) => keyPrefix + 1);
  }, [setKeyPrefix]);

  const [filters, setFilters] = React.useState<Filters<Row>>(
    Array(head.length).fill(noFilter) as Filters<Row>,
  );

  const rowPredicate = React.useMemo(
    () => (row: Row) =>
      row.every((col, i) => {
        const colPredicate = filters[i] as Predicate<typeof col>;
        return colPredicate(col);
      }),
    [filters],
  );

  const updateColumnPredicate = React.useMemo(
    () =>
      head.map((_, index) => (predicate: Predicate<table.Col<any, any>>) =>
        setFilters((currentFilters) => {
          const copy = Array.from(currentFilters);
          copy[index] = predicate;
          return copy as Filters<Row>;
        }),
      ),
    [],
  );

  React.useEffect(() => {
    console.log('rowPredicate^ changed');
    onChange(rowPredicate);
  }, [rowPredicate, onChange]);

  /**
   * FIXME: part of css hacks below
   */
  React.useLayoutEffect(() => {
    const parent = document.querySelector('#filter-button')?.parentElement;
    if (parent) {
      parent.id = 'page-actions';
    }
  }, []);

  return (
    <aside
      css={[
        e400(),
        {
          padding: '24px',
          boxSizing: 'border-box',
          borderLeft: `1px solid ${N30}`,
          height: 'calc(100vh - var(--topNavigationHeight))',
          position: 'sticky',
          top: 'var(--topNavigationHeight)',
          display: 'flex',
          flexDirection: 'column',
          width: 'var(--rightSidebarWidth)',
          alignItems: 'flex-start',
          overflowY: 'auto',
          background: N0,
        },
      ]}
    >
      {/**
       * FIXME: extreme css hacks >.<
       *
       * need to figure out a better story for horizontal compression
       */}
      <Global
        styles={{
          /**
           * Filter panel related styles
           */
          '[data-ds--page-layout--slot="right-sidebar"]': {
            position: 'sticky',
            right: 0,
            zIndex: 2,
          },
          '[data-ds--page-layout--slot="left-sidebar"] > div': {
            background: 'white',
          },
          '[data-ds--page-layout--slot="main"]': {
            flexShrink: 0,
          },
          '[data-ds--page-layout--slot="top-navigation"]': {
            zIndex: '3!important' as any,
          },
          '#page-actions': {
            position: 'sticky',
            right: 'calc(var(--rightSidebarWidth) + 40px)',
          },
          /**
           * Manually compress name columns...
           *
           * They don't seem to auto-shrink past a point while the
           * filter panel is open.
           */
          [`tr > th:nth-of-type(${
            head.indexOf(table.col.name) + 1
          }), tr > td:nth-of-type(${head.indexOf(table.col.name) + 1})`]: {
            width: '128px',
            overflowWrap: 'anywhere',
          },
          [`tr > th:nth-of-type(${
            head.indexOf(table.col.packageName) + 1
          }), tr > td:nth-of-type(${
            head.indexOf(table.col.packageName) + 1
          })`]: {
            width: '200px',
            overflowWrap: 'anywhere',
          },
        }}
      />
      <div css={filterHeadingContainerStyles}>
        <h2 css={[h600(), filterHeadingStyles]}>Filters</h2>
        <Button appearance="warning" onClick={incrementKeyPrefix}>
          Clear
        </Button>
      </div>
      <div key={keyPrefix} css={filterOptionsContainerStyles}>
        {Object.entries(optionData).map(([filterName, filterData]) => (
          <FieldSet
            key={filterName}
            label={filterData.label}
            info={filterData.info}
            options={filterData.options}
            onChange={
              /**
               * FIXME: this is brittle, assuming filterName is always a valid key
               *
               * Probably want to rewrite entire table data handling....
               */
              updateColumnPredicate[
                head.indexOf((table.col as any)[filterName])
              ]
            }
          />
        ))}
      </div>
    </aside>
  );
};

const overviewContainerStyles = css({
  display: 'flex',
  alignItems: 'flex-end',
  gap: gridSize,
});

const noticeMessageContainerStyles = css({
  display: 'inline-flex',
  '> div': { display: 'inline-flex' },
});

const searchContainerStyles = css({
  marginTop: gridSize * 2,
});

const searchIconStyles = css({
  display: 'flex',
  paddingRight: gridSize,
  color: N100,
});

const subtitleStyles = css({
  display: 'flex',
  color: N200,
  marginTop: -3 * gridSize,
  alignItems: 'baseline',
});

const Page = ({ rows, sideNavData }: PageProps) => {
  console.log('Render Page');

  const [searchQuery, setSearchQuery] = React.useState('');

  const updateSearchQuery = React.useCallback(
    (event) => {
      setSearchQuery(event.target.value);
    },
    [setSearchQuery],
  );

  const [rowPredicate, setRowPredicate] = React.useState<Predicate<Row>>(() =>
    always(true),
  );

  const updateRowPredicate = React.useCallback(
    (predicate: Predicate<Row>) => setRowPredicate(() => predicate),
    [],
  );

  const [shouldShowFilters, setShouldShowFilters] = React.useState(false);

  const toggleShouldShowFilters = React.useCallback(
    () => setShouldShowFilters((current) => !current),
    [setShouldShowFilters],
  );

  const filteredRows = React.useMemo(
    () =>
      rows
        .filter(([name]) => fuzzy.test(searchQuery, name.value))
        .filter(rowPredicate),
    [searchQuery, rowPredicate, rows],
  );

  const rightSidebar = React.useMemo(
    () => <PageFilterSidebar onChange={updateRowPredicate} />,
    [updateRowPredicate],
  );

  const lastBuilt = getLastBuilt();

  return (
    <PageContent
      sideNavData={sideNavData}
      isFullWidth
      rightSidebarContent={shouldShowFilters && rightSidebar}
    >
      <PageHeader
        disableTitleStyles
        actions={
          <Button
            appearance={'primary'}
            iconAfter={<FilterIcon label="" />}
            onClick={toggleShouldShowFilters}
            isSelected={shouldShowFilters}
            id="filter-button"
          >
            Filters
          </Button>
        }
      >
        <div css={overviewContainerStyles}>
          <h1 css={h700()}>Overview</h1>
          <div css={noticeMessageContainerStyles}>
            <InlineMessage type="info" placement="right-start">
              <p>
                This page tracks important metrics across all components owned
                by the Design System Team. It is intended to be an automatically
                generated analog of{' '}
                <a href="http://go/dst-components">go/dst-components</a>.
              </p>
              <p>
                It sources information from a combination of local and
                historical <Code>package.json</Code> information obtained from
                the NPM registry.
              </p>
            </InlineMessage>
          </div>
        </div>
      </PageHeader>
      <span css={subtitleStyles}>
        <Label>Last updated:</Label>
        &nbsp;
        <time>{lastBuilt} ago</time>
      </span>
      <div css={searchContainerStyles}>
        <Textfield
          width={250}
          elemAfterInput={
            <span css={searchIconStyles}>
              <SearchIcon label="" />
            </span>
          }
          onChange={updateSearchQuery}
          placeholder="Search by name..."
        />
      </div>
      <DynamicTableEnhancer
        alignCol={{
          [head.indexOf(table.col.liteMode)]: 'center',
        }}
      >
        <DynamicTable
          head={table.transformHead(head)}
          rows={table.transformRows(filteredRows, showContent)}
          defaultSortKey={head[0]}
          defaultSortOrder="ASC"
        />
      </DynamicTableEnhancer>
    </PageContent>
  );
};

export default Page;

const getRows = async (packages: PackageJSON[]): Promise<Row[]> =>
  Promise.all(
    packages.map(async (pkg) => {
      const data = await registryUtils.getRegistryData(pkg);
      const { version, time } = data
        .map<{ version: string; time: string | null }>(
          registryUtils.getLatestPublishedVersion,
        )
        .getOrElse({
          version: packageUtils.getVersion(pkg).orJust('0'),
          time: null,
        });
      return [
        {
          name: 'Name',
          value: packageUtils.getDisplayName(pkg),
        },
        { name: 'Package name', value: pkg.name },
        { name: 'Lite mode', value: packageUtils.isLiteModed(pkg) },
        { name: 'Styling', value: packageUtils.getStyling(pkg).orNull() },
        { name: 'Theming', value: packageUtils.getTheming(pkg).orNull() },
        {
          name: 'Documentation',
          value: packageUtils.getDocumentation(pkg).orNull(),
        },
        { name: 'Version', value: version },
        {
          name: 'Released',
          value: time === null ? null : new Date(time).valueOf(),
        },
        { name: 'Deprecated', value: packageUtils.isDeprecated(pkg) },
      ] as Row;
    }),
  );

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const packages = await packageUtils.getAllPackages({
    shouldHidePrivate: true,
  });

  const [rows, sideNavData] = await Promise.all([
    getRows(packages),
    getPackagesSideNavData(
      packages.filter((pkg) => pkg.name !== '@af/dropdown-menu'),
    ),
  ]);

  return {
    props: { rows, sideNavData },
  };
};
