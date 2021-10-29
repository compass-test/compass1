import React, { Fragment } from 'react';
import { AtlassianLogo } from '@atlaskit/logo';
import PageHeader from '@atlaskit/page-header';
import { colors } from '@atlaskit/theme';
import Link from 'next/link';

/* eslint-disable jsx-a11y/anchor-is-valid */
// next.js `<Link>` isn't a11y friendly because `a` doesn't need/have an `href` defined
// https://github.com/zeit/next.js/issues/5533
const Header = ({ children }) => {
  return (
    <Fragment>
      <PageHeader>
        <Link href="/cla">
          <a>
            <AtlassianLogo
              iconColor={colors.B200}
              textColor={colors.B400}
              size="medium"
              label="CLA Home"
            />
          </a>
        </Link>
        <br />
        {children}
      </PageHeader>
    </Fragment>
  );
};

export default Header;
