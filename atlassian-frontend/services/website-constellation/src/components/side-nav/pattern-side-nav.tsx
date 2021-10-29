import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { useSession } from '../../hooks';
import SideNav from '@atlaskit/gatsby-theme-brisk/src/components/side-nav';
import { NavItemProps as NavItem } from '@atlaskit/gatsby-theme-brisk/src/components/side-nav/nav-item';
import { ContentfulGuideline } from '../../__generated__/graphqlTypes';

export default () => {
  const isLoggedIn = useSession();
  const data = useStaticQuery(graphql`
    query {
      allContentfulGuideline(
        sort: { order: ASC, fields: title }
        filter: { category: { eq: "Patterns" } }
      ) {
        nodes {
          slug
          title
          private
          contentfulparent {
            slug
          }
        }
      }
    }
  `);

  let navItems: NavItem[] = [];
  data.allContentfulGuideline.nodes.forEach(
    ({
      slug,
      title,
      private: isPrivate,
      contentfulparent,
    }: ContentfulGuideline) => {
      const item: NavItem = {
        to:
          contentfulparent && contentfulparent.slug
            ? `/patterns/${contentfulparent.slug}/${slug}/`
            : `/patterns/${slug}/`,
        text: title,
        isPrivate,
        slug,
        parent: contentfulparent && contentfulparent.slug,
      };
      navItems.push(item);
    },
  );

  return (
    <SideNav isLoggedIn={isLoggedIn} heading="Patterns" navItems={navItems} />
  );
};
