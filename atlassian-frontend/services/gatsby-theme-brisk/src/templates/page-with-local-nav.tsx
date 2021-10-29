/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext } from 'react';
import BackToTop from '../components/back-to-top';
import Layout, { MainContent } from '../components/layout';
import Hero from '../components/hero';
import LocalNav from '../components/local-nav/local-nav';
import HeadingContext from '../components/local-nav/heading-context';

type Props = {
  title: string;
  description?: string;
  hasHero?: boolean;
  children: any;
  tabName?: string;
  guidelineCategory?: string;
  parentPageTitle?: string;
  subpageTabName?: string;
  sidebar?: React.ElementType;
};

const PageWithLocalNav = ({
  subpageTabName,
  parentPageTitle,
  title,
  description,
  children,
  sidebar,
  tabName,
  guidelineCategory,
}: Props) => {
  const context = useContext(HeadingContext);
  return (
    <Layout
      title={title}
      sidebar={sidebar || null}
      description={description}
      tabName={tabName}
      guidelineCategory={guidelineCategory}
      parentPageTitle={parentPageTitle}
      subpageTabName={subpageTabName}
    >
      <Hero
        css={{ gridArea: 'hero' }}
        headline={title}
        description={description ? description : ''}
      />
      <MainContent className="main-content">{children}</MainContent>
      <BackToTop label="Back to top" />
      <LocalNav headings={context && context.headings} />
    </Layout>
  );
};

export default PageWithLocalNav;
