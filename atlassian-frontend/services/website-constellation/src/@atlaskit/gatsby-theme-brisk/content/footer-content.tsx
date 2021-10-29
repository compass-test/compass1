/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'gatsby';
import { N10, N300, N800 } from '@atlaskit/theme/colors';

const footerNav = css`
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 24px;
  padding-bottom: 24px;
  a {
    color: ${N300};
    margin-left: 32px;
  }
`;

const darkFooterNav = css`
  background-color: ${N800};
  color: ${N10};
  a {
    color: ${N10};
  }
`;

const FooterContent = ({ isDark }) => (
  <nav
    css={css`
      ${footerNav}
      ${isDark && darkFooterNav}
    `}
    className="sm"
    style={{
      /**
       * DST-2007
       *
       * This style is necessary because of a bug in emotion + SSR causing
       * global styles to take precedence over local ones.
       *
       * This issue is fixed in v11+ of emotion.
       *
       * When we upgrade our version of emotion this `style` can be
       * replaced with `css`.
       */
      color: isDark ? N10 : N300,
    }}
  >
    &copy; 2021 Atlassian
    <a
      href="https://www.atlassian.com/company/careers"
      target="_blank"
      rel="noopener"
    >
      Careers
    </a>
    <a
      href="https://www.atlassian.com/legal/trademark"
      target="_blank"
      rel="noopener"
    >
      Trademark
    </a>
    <a
      href="https://www.atlassian.com/legal/privacy-policy"
      target="_blank"
      rel="noopener"
    >
      Privacy
    </a>
    <Link to="/license">License</Link>
  </nav>
);

export default FooterContent;
