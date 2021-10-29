import React from 'react';

import PageHeader from '@atlaskit/page-header';

import { Code } from '@atlaskit/code';
import { Date as AkDate } from '@atlaskit/date';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ResponsiveContainer } from 'recharts';

import type {
  AsideData,
  AsideDataCell,
  GetInsight,
  Insight,
} from '../../types/insights';

import { getInsightsSideNavData } from '../../utils/navigation';
import { getInsights } from '../../utils/insights';
import PageContent, { PageContentProps } from '../../components/page-content';
import DynamicTableEnhancer from '../../components/dynamic-table-enhancer';
import DynamicTable from '@atlaskit/dynamic-table';
import type { HeadType, RowType } from '@atlaskit/dynamic-table/types';

import ProgressInsight from '../../components/insights/ProgressInsight';

type InsightsPageProps = {
  insight: Insight;
  sideNavData: PageContentProps['sideNavData'];
};

type InsightsPageQuery = {
  name: string;
};

const showCell = (cell: AsideDataCell) => {
  if (cell.value === null) {
    return null;
  }

  switch (cell.type) {
    case 'code':
      return <Code>{cell.value}</Code>;

    case 'date':
      return <AkDate value={cell.value} />;

    case 'text':
      return cell.value;
  }
};

const InsightsRightSidebar = ({ aside }: { aside: AsideData }) => {
  const head: HeadType = React.useMemo(
    () => ({
      cells: aside.head.map((title) => ({
        isSortable: true,
        key: title,
        content: title,
      })),
    }),
    [aside.head],
  );

  const rows: RowType[] = React.useMemo(
    () =>
      aside.rows.map((row) => ({
        cells: row.map((cell) => ({
          key: cell.value ?? Infinity,
          content: showCell(cell),
        })),
      })),
    [aside.rows],
  );

  return (
    <DynamicTableEnhancer>
      <DynamicTable head={head} rows={rows} />
    </DynamicTableEnhancer>
  );
};

const InsightsPage = ({ insight, sideNavData }: InsightsPageProps) => {
  return (
    <PageContent sideNavData={sideNavData} isFullWidth>
      <PageHeader>{insight.title}</PageHeader>
      <ResponsiveContainer aspect={2}>
        <ProgressInsight insight={insight} />
      </ResponsiveContainer>

      {insight.aside && <InsightsRightSidebar aside={insight.aside} />}
    </PageContent>
  );
};

export default InsightsPage;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getInsights()).map((name) => ({
    params: {
      name,
    },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  InsightsPageProps,
  InsightsPageQuery
> = async ({ params }) => {
  if (!params?.name) {
    throw new Error('Illegal state');
  }

  console.time(`getStaticProps@insights/[name=${params.name}]`);
  const getInsight: GetInsight = require(`../../insights/${params.name}`)
    .default;
  const [insight, sideNavData] = await Promise.all([
    getInsight(),
    getInsightsSideNavData(),
  ]);

  console.timeEnd(`getStaticProps@insights/[name=${params.name}]`);

  return {
    props: {
      insight,
      sideNavData,
    },
  };
};
