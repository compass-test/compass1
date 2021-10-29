import React from 'react';

import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { B400, N200, Y300 } from '@atlaskit/theme/colors';

import { withIntlProvider } from '../../intl-provider';

import { IntlViewModeMessages, ViewModeMessage } from './ViewModeMessages.intl';

export enum ViewMode {
  Full = 'full',
  Preview = 'preview',
  View = 'view',
  Edit = 'edit',
}

interface ViewModeBarProps {
  viewMode: ViewMode;
  roundAllCorners?: boolean;
}

export const ViewModeBar = withIntlProvider<ViewModeBarProps>(
  ({ viewMode, roundAllCorners }) => {
    let title;
    switch (viewMode) {
      case 'view':
        title = IntlViewModeMessages[ViewModeMessage.ViewModeView];
        break;
      case 'full':
        title = IntlViewModeMessages[ViewModeMessage.ViewModeFull];
        break;
      case 'edit':
        title = IntlViewModeMessages[ViewModeMessage.ViewModeEdit];
        break;
      case 'preview':
        title = IntlViewModeMessages[ViewModeMessage.ViewModePreview];
        break;
      default:
        break;
    }

    return (
      <ViewModeBarStyled viewMode={viewMode} roundAllCorners={roundAllCorners}>
        {
          // @ts-ignore
          <FormattedMessage {...title} />
        }
      </ViewModeBarStyled>
    );
  },
);

const ViewModeBarStyled = styled('div')<ViewModeBarProps>`
  display: flex;
  justify-content: center;
  border-radius: ${props => (props.roundAllCorners ? '4px' : '4px 4px 0 0')};
  color: ${props => (props.viewMode === 'preview' ? 'black' : 'white')};
  font-weight: 700;
  padding: 0.2rem 0;
  background-color: ${(props): string =>
    // eslint-disable-next-line no-nested-ternary
    props.viewMode === 'full' || props.viewMode === 'view'
      ? N200
      : props.viewMode === 'edit'
      ? B400
      : Y300};
`;
