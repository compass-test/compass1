/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { navigate } from 'gatsby';
import { Redirect, useMatch } from '@reach/router';

type Props = {
  tabContents: { [name: string]: any };
  tabPath: string;
};

const TabSwitcher = ({ tabContents, tabPath }: Props) => {
  const match = useMatch(`${tabPath}/:tab`);
  const defaultTab = Object.keys(tabContents)[0];
  let Tab;

  if (match && match.tab) {
    Tab = tabContents[match.tab];

    // if there's no matching tab, redirect to 404
    if (!Tab) {
      navigate('/404');
      return null;
    }
  }

  return (
    <Fragment>
      {match ? (
        Tab
      ) : (
        // If we hit the base folder, redirect to first tab
        <Redirect to={`${tabPath}/${defaultTab}`} noThrow />
      )}
    </Fragment>
  );
};

export default TabSwitcher;
