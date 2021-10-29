import React from 'react';

import { useRouterActions } from 'react-resource-router';

import { BreadcrumbsItem } from '@atlaskit/breadcrumbs';

type BreadcrumbsLinkProps = {
  href: string;
  text: string;
};

/**
 * This is a small helper component that adds an href to a BreadcrumbsItem for
 * accessibility and usability, but also adds an onClick handler for SPA
 * navigation.
 */
export function BreadcrumbsLink(props: BreadcrumbsLinkProps) {
  const { push } = useRouterActions();

  return (
    <BreadcrumbsItem
      href={props.href} // href provided for usability
      onClick={(e) => {
        e.preventDefault(); // Prevent the href from working and use SPA nav
        push(props.href);
      }}
      text={props.text}
    />
  );
}
