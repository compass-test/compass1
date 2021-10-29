import React from 'react';
import PageHeader from '@atlaskit/page-header';

import { css } from '@emotion/core';

import PageContent, { PageContentProps } from '../../components/page-content';
import { getInsight, getInsights } from '../../utils/insights';
import type { Insight } from '../../types/insights';

import { getInsightsSideNavData } from '../../utils/navigation';
import ProgressInsight from '../../components/insights/ProgressInsight';
import { e100, e300 } from '@atlaskit/theme/elevation';
import { h600 } from '@atlaskit/theme/typography';
import Link from 'next/link';

import { mediumDurationMs } from '@atlaskit/motion/durations';
import { easeInOut } from '@atlaskit/motion/curves';

type InsightsHomePageProps = {
  sideNavData: PageContentProps['sideNavData'];
  insights: Insight[];
  insightHrefs: string[];
};

const insightCardStyles = css([
  e100(),
  {
    borderRadius: '3px',
    padding: '16px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    transition: `box-shadow ${mediumDurationMs}ms ${easeInOut}`,
    ':hover': {
      /**
       * FIXME: couldn't figure out a better way :(
       *
       * Can't seem to use array for a nested selector...
       */
      boxShadow: e300()
        .replace(/^box\-shadow:\s*/, '')
        .replace(/;$/, ''),
      cursor: 'pointer',
    },
    '> *': {
      pointerEvents: 'none',
    },
  },
]);

const insightCardTitleStyles = css([
  h600(),
  { textAlign: 'center', marginTop: 0 },
]);

const insightCardLinkStyles = css({
  ':hover': {
    textDecoration: 'none',
  },
});

const InsightCard: React.FC<{ title: string; href: string }> = ({
  children,
  title,
  href,
}) => (
  <Link href={href} passHref>
    <a css={insightCardLinkStyles}>
      <figure css={insightCardStyles}>
        <figcaption css={insightCardTitleStyles}>{title}</figcaption>
        {children}
      </figure>
    </a>
  </Link>
);

const insightsGridStyles = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
  gap: '24px',
});

const InsightsHomePage = ({
  sideNavData,
  insights,
  insightHrefs,
}: InsightsHomePageProps) => (
  <PageContent sideNavData={sideNavData} isFullWidth>
    <PageHeader>Insights</PageHeader>
    <div css={insightsGridStyles}>
      {insights.map((insight, i) => (
        <InsightCard
          key={insight.title}
          title={insight.title}
          href={insightHrefs[i]}
        >
          <ProgressInsight insight={insight} />
        </InsightCard>
      ))}
    </div>
  </PageContent>
);

export default InsightsHomePage;

export const getStaticProps = async () => {
  console.time('getStaticProps@insights/index');
  const [sideNavData, insightNames] = await Promise.all([
    getInsightsSideNavData(),
    getInsights(),
  ]);
  const insights = await Promise.all(insightNames.map(getInsight));
  const insightHrefs = insightNames.map((name) => `/insights/${name}`);
  console.timeEnd('getStaticProps@insights/index');
  return { props: { sideNavData, insights, insightHrefs } };
};
