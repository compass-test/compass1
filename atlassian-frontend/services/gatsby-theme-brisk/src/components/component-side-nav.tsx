import React, { useState } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import NavItem from './side-nav/nav-item';
import NavSection from './side-nav/nav-section';
import { HeadingItem } from './side-nav/heading-item';
import titleify from './../utilities/titleify';

import { Location } from '@reach/router';

const ComponentNavItem = ({
  slug,
  title,
  isPartiallyActive,
  isSelected,
}: {
  slug: string;
  isSelected?: boolean;
  location: { pathname?: string };
  title: string;
  isPartiallyActive?: (any) => any;
}) => {
  return (
    <NavItem
      text={title}
      isSelected={isSelected}
      to={`/components/${slug}`}
      isPartiallyActive={isPartiallyActive}
    />
  );
};

const ComponentLevel = ({
  slug,
  match,
  id,
  title,
  subItems,
  location,
  dir,
}) => {
  let folders = {};
  // the submenu should be open if we are on the parent or on a sibling page
  // this regex matches either the top-level exactly (so /avatar won't match /avatar-badge) or the parent, followed by a / and any characters
  let isOpenMatch = new RegExp(match, 'g');
  let isOpen = !!location.pathname.match(isOpenMatch);

  const [subItemActive, setSubItemActive] = useState(false);

  return (
    <React.Fragment key={id}>
      <ComponentNavItem
        slug={slug}
        title={title}
        location={location}
        isSelected={isOpen && !subItemActive && !!location.pathname.match(slug)}
      />

      <NavSection isOpen={isOpen}>
        {subItems.map((item) => {
          const { name, absolutePath } = item.parent;
          // get the mdx path relative to the current package
          const mdxPath = absolutePath.split(`${dir}/`)[1];
          // get everything after the docsFolder (usually after constellation/)
          const path = mdxPath.slice(mdxPath.indexOf('/') + 1);

          // if it's part of a tabbed page
          if (path.includes('/')) {
            const folderNameInCurrentNavItem = path.split('/')[0];
            const subFolderSlug = `/components/${slug}/${folderNameInCurrentNavItem}`;
            const folderNameInCurrentPath = location.pathname
              .replace(`/components/${slug}/`, '')
              .split('/')[0];
            if (!folders[folderNameInCurrentNavItem]) {
              folders[folderNameInCurrentNavItem] = folderNameInCurrentNavItem;
              return (
                <NavItem
                  isSubItem={true}
                  isSelected={
                    folderNameInCurrentPath === folderNameInCurrentNavItem
                  }
                  key={item.id}
                  text={titleify(folderNameInCurrentNavItem)}
                  to={subFolderSlug}
                  isPartiallyActive={({ isPartiallyCurrent }) => {
                    if (isOpen && isPartiallyCurrent) {
                      setSubItemActive(isPartiallyCurrent);
                    }
                  }}
                />
              );
            }
          } else {
            const subpageSlug = `/components/${slug}/${name}`;
            return (
              <NavItem
                isSubItem={true}
                isSelected={!!location.pathname.match(subpageSlug)}
                key={item.id}
                text={titleify(name)}
                to={`/components/${slug}/${name}`}
                isPartiallyActive={({ isPartiallyCurrent }) => {
                  if (isOpen && isPartiallyCurrent) {
                    setSubItemActive(isPartiallyCurrent);
                  }
                }}
              />
            );
          }
        })}
      </NavSection>
    </React.Fragment>
  );
};

const ComponentNav = ({ components, mdx }) => {
  return (
    // BC: location is undefined in SSR calls, so we are defaulting it to an empty object
    <Location>
      {({ location = {} }) => {
        return (
          <>
            <NavSection>
              <HeadingItem>Components</HeadingItem>
              {components.map(({ slug, id, dir, title }) => {
                let match = `\/components\/${slug}(/.*)?$`;
                const subItems = mdx.filter((node) => {
                  const mdxPath = node.parent.absolutePath;
                  // if it's part of this package
                  if (mdxPath.indexOf(`${dir}/`) !== -1) {
                    // if its in the index folder or an index.mdx in the root folder, skip
                    let str = mdxPath.split(`${dir}/`)[1].split('/')[1];
                    return !str.includes('index');
                  }
                });

                if (subItems.length > 0) {
                  return (
                    <ComponentLevel
                      match={match}
                      subItems={subItems}
                      location={location}
                      slug={slug}
                      key={id}
                      dir={dir}
                      id={id}
                      title={title}
                    />
                  );
                }

                return (
                  <ComponentNavItem
                    key={id}
                    title={title}
                    slug={slug}
                    location={location}
                    isSelected={!!location.pathname.match(match)}
                  />
                );
              })}
            </NavSection>
          </>
        );
      }}
    </Location>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        allWorkspaceInfo {
          nodes {
            slug
            id
            title
            dir
          }
        }
        allMdx(filter: { parent: { internal: { type: { eq: "File" } } } }) {
          nodes {
            id
            parent {
              ... on File {
                absolutePath
                name
                dir
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <ComponentNav
        mdx={data.allMdx.nodes}
        components={data.allWorkspaceInfo.nodes}
      />
    )}
  />
);
