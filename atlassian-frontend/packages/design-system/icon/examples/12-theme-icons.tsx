/* eslint-disable @atlaskit/design-system/ensure-design-token-usage */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';

import Theme from '@atlaskit/theme/components';
import type { ThemeModes } from '@atlaskit/theme/types';

import Icon from '../src';
import ActivityIcon from '../glyph/activity';
import AddCircleIcon from '../glyph/add-circle';
import AddItemIcon from '../glyph/add-item';
import AddIcon from '../glyph/add';
import AddonIcon from '../glyph/addon';
import AppSwitcherIcon from '../glyph/menu';
import ArrowDownIcon from '../glyph/arrow-down';
import ArrowLeftCircleIcon from '../glyph/arrow-left-circle';
import ArrowLeftIcon from '../glyph/arrow-left';
import ArrowRightIcon from '../glyph/arrow-right';
import ArrowUpIcon from '../glyph/arrow-up';
import { useState } from 'react';
import Button from '@atlaskit/button';
import { background, text } from '@atlaskit/theme/colors';

const iconRowStyles = css({
  display: 'flex',
  padding: '8px 0',
  justifyContent: 'flex-start',
  flexDirection: 'row',
});

const iconWrapperStyles = css({
  margin: 4,
});

const demoIcons = [
  ActivityIcon,
  AddCircleIcon,
  AddItemIcon,
  AddIcon,
  AddonIcon,
  AppSwitcherIcon,
  ArrowDownIcon,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
];

const IconCustomExample = () => (
  <Icon
    dangerouslySetGlyph={`<svg viewBox="0 0 24 24" focusable="false" role="presentation">
  <g fill="currentColor" fillRule="evenodd">
    <path d="M20.402 4.215a.414.414 0 0 0-.33-.166.398.398 0 0 0-.19.049c-2.427 1.328-5.24 2.03-8.134 2.03-2.895 0-5.708-.702-8.134-2.03a.397.397 0 0 0-.19-.049.405.405 0 0 0-.254.727 14.296 14.296 0 0 0 8.577 2.854h.001a14.295 14.295 0 0 0 8.579-2.855.405.405 0 0 0 .075-.56m-2.788 3.783a.326.326 0 0 0-.314-.045 15.86 15.86 0 0 1-2.069.625.407.407 0 0 0-.285.248c-.474 1.301-1.687 2.54-2.96 3.837a.329.329 0 0 1-.238.113c-.116 0-.187-.062-.24-.113-1.271-1.297-2.484-2.531-2.959-3.832a.407.407 0 0 0-.285-.249 16.06 16.06 0 0 1-2.07-.631.328.328 0 0 0-.313.045.325.325 0 0 0-.126.287c.108 1.082.535 2.14 1.307 3.247.725 1.042 1.67 2.007 2.585 2.94 1.685 1.718 3.276 3.34 3.416 5.223.012.17.154.301.324.301h1.98a.326.326 0 0 0 .325-.342c-.062-1.258-.536-2.518-1.448-3.851-.19-.28-.396-.552-.61-.818a.236.236 0 0 1 .016-.311l.199-.203c.914-.933 1.86-1.897 2.585-2.939.771-1.108 1.199-2.16 1.306-3.24a.334.334 0 0 0-.126-.292m-7.99 7.935a.301.301 0 0 0-.231-.099.326.326 0 0 0-.27.153c-.832 1.267-1.262 2.463-1.321 3.664a.33.33 0 0 0 .09.242.33.33 0 0 0 .236.101h1.976c.17 0 .314-.133.326-.303.043-.579.223-1.16.552-1.77a.458.458 0 0 0-.04-.493c-.326-.424-.725-.876-1.318-1.495" />
    <path d="M11.75 8.968c.62 0 .98-.037 1.106-.037a.302.302 0 0 1 .275.421c-.082.22-.457 1.011-1.155 1.69a.319.319 0 0 1-.228.09.318.318 0 0 1-.229-.09c-.698-.679-1.073-1.47-1.155-1.69a.302.302 0 0 1 .275-.421c.127 0 .486.037 1.106.037h.005" />
  </g>
</svg>`}
    label="Custom icon"
    size="medium"
  />
);

const themes: ThemeModes[] = ['light', 'dark'];

const IconSizeExample = () => {
  const [currentMode, setMode] = useState('light');
  return (
    <div>
      <Button
        onClick={() => setMode((old) => (old === 'light' ? 'dark' : 'light'))}
      >
        Toggle theme
      </Button>
      <div id="theme-example">
        {themes.map((mode) => {
          const currentTheme = {
            mode: mode === currentMode ? 'light' : 'dark',
          } as const;
          return (
            <Theme.Provider value={() => currentTheme} key={mode}>
              <div
                style={{
                  color: text({ theme: { mode } }),
                  backgroundColor: background({ theme: { mode } }),
                }}
                css={iconRowStyles}
              >
                {demoIcons.map((Icon, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span css={iconWrapperStyles} key={i}>
                    <Icon label={`Icon ${i}`} size="medium" />
                  </span>
                ))}
                <span css={iconWrapperStyles}>
                  <IconCustomExample />
                </span>
              </div>
            </Theme.Provider>
          );
        })}
      </div>
    </div>
  );
};

export default IconSizeExample;
