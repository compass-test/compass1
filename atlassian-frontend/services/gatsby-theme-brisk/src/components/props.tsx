/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { HybridLayout } from 'pretty-proptypes';

/**
 * This gets imported in two places:
 *   1. Top-level component pages
 *   2. Sub-level component pages
 *
 * By having a wrapper we can have a single source of truth for both locations.
 */

const Props = (props) => {
  return (
    <div
      css={css`
        margin-top: 24px;
        margin-bottom: 48px;

        :last-child {
          margin-bottom: 0px;
        }

        > div {
          /* The wrapper from pretty-proptypes sets its own top margin */
          margin-top: 0;
          margin-bottom: 0;
        }

        table caption h3 code {
          /* We need this here because Constellation sets 12px code font size */
          font-size: 1em;
        }
      `}
    >
      <HybridLayout {...props} />
    </div>
  );
};

export default Props;
