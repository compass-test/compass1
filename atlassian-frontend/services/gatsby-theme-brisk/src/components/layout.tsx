import React from 'react';
import { css, Global } from '@emotion/core';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import cssReset from '@atlaskit/css-reset';
import { gridSize } from '@atlaskit/theme/constants';
import { N10, N20, N30, N800 } from '@atlaskit/theme/colors';
import {
  Content,
  LeftSidebarWithoutResize,
  Main,
  PageLayout,
  TopNavigation,
  useCustomSkipLink,
} from '@atlaskit/page-layout';
import { MDXProvider } from '@mdx-js/react';
import MetaTags from './meta-tags';
import HeaderContent from './../content/header-content';
import FooterContent from './../content/footer-content';
import Typography from './typography';
import Example from './example/Example';
import PropsLogger from '../utilities/props-logger';
import Props from './props';

type Props = {
  sidebar?: any;
  title?: string;
  description?: string;
  children: any;
  footer?: any;
  tabName?: string;
  categorySlug?: string;
  guidelineCategory?: string;
  parentPageTitle?: string;
  subpageTabName?: string;
};

const contentGrid = css`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 16px;
  grid-auto-rows: max-content;
`;

const MainLayout = styled.main`
  grid-area: main;
  display: grid;
  position: relative;
  height: 100%;
  grid-template-rows: auto 1fr;
  grid-template-columns: minmax(640px, 960px) 1fr;
  grid-template-areas:
    'hero hero'
    'content nav'
    'footer footer';
`;

export const MainContent = styled.div`
  ${contentGrid};
  grid-area: content;
  padding-left: 80px;
  padding-bottom: 80px;
  padding-top: 32px;
  padding-right: 80px;
  margin-top: 0;
  max-width: 960px;
  /* We absolutely position child tabs. */
  position: relative;

  > * {
    grid-column: 1 / span 12;
    margin-top: 0;
    margin-bottom: 0;
  }

  > h2 {
    margin-top: 32px;
  }

  > h3 {
    margin-top: 16px;
  }

  table {
    thead {
      tr {
        /* Hack to work around pretty prop types heading not being bold atm. */
        font-weight: 500;
      }
    }
    td {
      vertical-align: top;
    }
    td > code {
      background-color: ${N20};
      color: ${N800};
      border-radius: 3px;
      padding: 4px;
    }
    td > div {
      /* Hack to remove margin from ERT div. */
      margin: 0 !important;
    }
    td:not(:last-child) {
      padding-right: 8px;
    }
  }
`;

export const CardGroup: React.FC = (props) => (
  <div css={contentGrid} {...props} />
);

export const SpanAllContent = styled.div`
  align-self: center;
  grid-area: content / content / nav / nav;
`;

// total width is 272
const sidebarWidth = gridSize() * 34;
const sidebarBorder = `1px solid ${N30}`;

const Footer = styled.footer`
  grid-area: footer;
  text-align: center;
  background-color: ${N10};
`;

const RegisterCustomSkipLinks = () => {
  useCustomSkipLink('footer', 'Footer', 5);

  return null;
};

const Layout = (props: Props) => {
  let SidebarComponent = props.sidebar;
  let FooterComponent = props.footer || FooterContent;

  const shortcodes = {
    Example,
    PropsLogger,
    PropsTable: Props,
  };

  const {
    title,
    description,
    guidelineCategory,
    categorySlug,
    parentPageTitle,
    tabName,
    subpageTabName,
  } = props;

  const componentsSubpage = !categorySlug && subpageTabName ? 'Components' : '';

  const sideNavSkipLinkName =
    guidelineCategory || componentsSubpage || categorySlug || title;

  return (
    <>
      <PageLayout>
        <RegisterCustomSkipLinks />
        <MDXProvider components={shortcodes}>
          <Global
            styles={css`
              ${cssReset}
              * {
                box-sizing: inherit;
              }
              body,
              html {
                box-sizing: border-box;
                scroll-padding-top: 56px;
                /* TODOS:
                Add smooth scrolling back in. Refer to ticket DST-2276.
                The navbar scrolling uses scroll-padding-top. This is currently not supported by Safari 11
                and is a known bug - looks like it will be released in the next version. Refer to ticket DST-2433.
                https://github.com/mdn/browser-compat-data/issues/8887
                https://css-tricks.com/fixed-headers-on-page-links-and-overlapping-content-oh-my/
                https://bugs.webkit.org/show_bug.cgi?id=179379
                */
              }

              #left-sidebar {
                border-right: ${sidebarBorder};
                flex-shrink: 0;
                display: grid; // hack to fix height: 100% layout issue in LeftSidebarWithoutResize
              }

              #left-sidebar ~ #main footer {
                text-align: left;
              }

              #main {
                min-height: calc(100vh - var(--topNavigationHeight));
              }
            `}
          />
          <Typography />
          <MetaTags
            title={title}
            description={description}
            tabName={tabName}
            guidelineCategory={guidelineCategory}
            categorySlug={categorySlug}
            parentPageTitle={parentPageTitle}
            subpageTabName={subpageTabName}
          />

          {process.env.GATSBY_CONSTELLATION_ENVIRONMENT !== 'PROD' ? (
            <Helmet>
              <meta name="robots" content="noindex" />
            </Helmet>
          ) : null}

          <TopNavigation id="nav" skipLinkTitle="Site navigation">
            <HeaderContent />
          </TopNavigation>

          <Content>
            {SidebarComponent ? (
              <LeftSidebarWithoutResize
                id="left-sidebar"
                skipLinkTitle={`${sideNavSkipLinkName} navigation`}
                width={sidebarWidth}
              >
                <SidebarComponent />
              </LeftSidebarWithoutResize>
            ) : null}

            <Main id="main" skipLinkTitle="Main content">
              <MainLayout>
                {props.children}
                <Footer id="footer">
                  <FooterComponent />
                </Footer>
              </MainLayout>
            </Main>
          </Content>
        </MDXProvider>
      </PageLayout>
    </>
  );
};

export default Layout;
