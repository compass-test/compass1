/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { N30, N200, B200, B300, B400 } from '@atlaskit/theme/colors';
import { internalAnchorOffset } from '../../utilities/constants';

const NavContainer = styled.aside`
  grid-area: nav;
`;

type NavProps = {
  offset: number;
};

const Nav = styled.nav<NavProps>`
  border-left: 1px solid ${N30};
  margin-top: 32px;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  margin-bottom: 32px;
  min-width: 144px;
  position: sticky;
  top: ${(props) => `${props.offset}px`};
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  font-size: 11px;
  line-height: calc(14 / 11);

  li {
    font-size: inherit;
    line-height: inherit;
    margin-bottom: 0;
    margin-top: 10px;
    position: relative;

    &.selected {
      a {
        color: ${B400};
      }

      &::before {
        content: '';
        width: 1px;
        height: calc(100% + 8px);
        position: absolute;
        left: -13px;
        top: -5px;
        background-color: ${B200};
      }
    }
  }

  .subitem {
    padding-left: 15px;
  }

  a {
    color: ${N200};

    &:hover {
      color: ${B300};
      text-decoration: none;
    }
  }
`;

type Props = {
  headings: Array<{ value: string; id: string; depth: number }>;
  current?: string;
};

export const LocalNav = ({ headings }: Props) => {
  const [activeHeading, setActiveHeading] = useState(null);

  useEffect(() => {
    // this is a live list so it will keep track of all currently intersecting headings
    const selectedHeadings = document.getElementsByClassName('intersecting');

    const options = {
      // root margin set to 5px to pick up the entire page's subheadings
      rootMargin: `-${internalAnchorOffset}px 0px -55% 0px`,
      threshold: 0,
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('intersecting');
        } else {
          entry.target.classList.remove('intersecting');
        }
      });
      // set the lowest heading on the page to active
      if (selectedHeadings.length > 0) {
        const firstHeading = selectedHeadings[0].getAttribute('id');
        setActiveHeading(firstHeading);
      } else {
        setActiveHeading(null);
      }
    };

    const observer = new IntersectionObserver(callback, options);

    if (headings) {
      headings.forEach((heading) => {
        const headingEl = document.getElementById(heading.id);
        if (headingEl) {
          observer.observe(headingEl);
        }
      });
    }

    return () => {
      observer.disconnect();
    };
    // ignored eslint here because if we add a dep on activeHeading it will cause an infinite loop when we updated state
  }, [headings]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      {headings && headings.length > 0 && (
        <NavContainer>
          <Nav offset={internalAnchorOffset} aria-label="local navigation">
            <h3
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
                color: N200,
              }}
              className="headline3"
            >
              Contents
            </h3>
            <NavList>
              {headings.map((heading) => (
                <li
                  className={`${heading.depth === 3 && 'subitem'} ${
                    activeHeading === heading.id && 'selected'
                  }`}
                  key={heading.id}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => {
                      setActiveHeading(heading.id);
                    }}
                  >
                    {heading.value}
                  </a>
                </li>
              ))}
            </NavList>
          </Nav>
        </NavContainer>
      )}
    </Fragment>
  );
};

export default LocalNav;
