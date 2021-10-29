import styled from 'styled-components';

import * as colors from '@atlaskit/theme/colors';
import { gridSize } from '@atlaskit/theme/constants';

export const AvatarContentActionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
`;

export const AvatarContentContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  min-height: ${gridSize() * 3}px;
`;

export const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 auto;
  height: ${gridSize() * 3}px;
  margin-right: ${gridSize()}px;
`;

export const ContentContainer = styled.div`
  min-width: 0;
`;

type ActionContainerProps = {
  visible: boolean;
};

export const ActionContainer = styled.div`
  margin-left: ${gridSize() * 3}px;
  display: flex;
  visibility: ${(props: ActionContainerProps) =>
    props.visible ? 'visible' : 'hidden'};
  align-items: center;
`;

export const TextOverflowWrapper = styled.span`
  display: block;
  min-width: 0;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const LinkWrapper = styled.a`
  min-width: 0;

  text-decoration: none;

  color: ${colors.N800};

  &:hover {
    color: ${colors.N800};
  }

  cursor: pointer;
`;

export const ContentTypeDecoratorContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
`;

export const ContentTypeWrapper = styled.span`
  color: ${colors.N200};
  &:before {
    content: '•';
    margin: 0px 4px;
  }
`;
