/** @jsx jsx */
import { FC, forwardRef, useState } from 'react';

import { css, jsx } from '@emotion/core';
import styled from 'styled-components';

import Button from '@atlaskit/button/custom-theme-button';
import Open from '@atlaskit/icon/glyph/editor/open';
import MoreIcon from '@atlaskit/icon/glyph/more';
import Popup, { PopupComponentProps } from '@atlaskit/popup';
import { borderRadius } from '@atlaskit/theme/constants';
import * as elevation from '@atlaskit/theme/elevation';

import { buttonTheme } from './styled';
import { MenuType, PopupContentType } from './types';

const Container = styled.div`
  ${elevation.e100};
`;

const containerStyles = css({
  borderRadius: borderRadius(),
  ':focus': {
    outline: 'none',
  },
});

const PopupContent: FC<PopupContentType> = ({
  searchTermHref,
  searchTermOnClick,
  filterTermHref,
  filterTermOnClick,
}) => {
  return (
    <Container id="popup-content">
      <div>
        <Button
          theme={buttonTheme}
          appearance="subtle"
          iconBefore={<Open label="open icon">open</Open>}
          href={searchTermHref}
          onClick={searchTermOnClick}
        >
          Search for this term
        </Button>
      </div>
      <Button
        theme={buttonTheme}
        appearance="subtle"
        href={filterTermHref}
        onClick={filterTermOnClick}
      >
        Filter analytics by this term
      </Button>
    </Container>
  );
};

const CustomPopupContainer = forwardRef<HTMLDivElement, PopupComponentProps>(
  ({ children, ...props }, ref) => (
    <div css={containerStyles} {...props} ref={ref}>
      {children}
    </div>
  ),
);

export const Menu: FC<MenuType> = ({
  testId,
  searchTermHref,
  searchTermOnClick,
  filterTermHref,
  filterTermOnClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div data-testid={testId}>
      <Popup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement="top-end"
        popupComponent={CustomPopupContainer}
        content={() => (
          <PopupContent
            searchTermHref={searchTermHref}
            searchTermOnClick={searchTermOnClick}
            filterTermHref={filterTermHref}
            filterTermOnClick={filterTermOnClick}
          />
        )}
        trigger={triggerProps => (
          <Button
            {...triggerProps}
            isSelected={isOpen}
            onClick={() => setIsOpen(!isOpen)}
            iconBefore={<MoreIcon label="More" />}
          />
        )}
      />
    </div>
  );
};
