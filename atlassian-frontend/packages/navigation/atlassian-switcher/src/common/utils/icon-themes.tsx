import React from 'react';
import styled from 'styled-components';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation, gridSize, ThemedValue } from '@atlaskit/theme';
import BaseAtlaskitIcon, {
  IconProps as AtlasKitIconProps,
} from '@atlaskit/icon';
import { ComponentType } from 'react';
import { IconThemes } from '../../types';
import { ImageLoadedTracker } from './analytics';

interface IconBaseProps {
  bgColor?: string;
  iconElevation?: ThemedValue<string>;
}

export const IconBase = styled.div<IconBaseProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${4 * gridSize()}px;
  height: ${4 * gridSize()}px;
  border-radius: ${gridSize()}px;
  ${({ iconElevation }) => (iconElevation ? iconElevation : '')};
  background-color: ${({ bgColor }) => bgColor};
  overflow: hidden;
`;

const ImageIconBase = styled(ImageLoadedTracker)`
  width: ${gridSize() * 3}px;
  height: ${gridSize() * 3}px;
`;

interface AkIconProps {
  primaryColor?: string;
  secondaryColor?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

interface AkLogoProps {
  iconGradientStart?: string;
  iconGradientStop?: string;
  iconColor?: string;
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
}

interface IconBackgroundTheme {
  backgroundColor?: string;
}

interface IconTheme {
  primaryColor?: string | ThemedValue<string>;
  iconColor?: string | ThemedValue<string>;
  iconElevation?: ThemedValue<string>;
  iconGradientStart?: string;
  iconGradientStop?: string;
}

type IconThemeMap = Record<IconThemes, IconTheme & IconBackgroundTheme>;

export const themes: IconThemeMap = {
  default: {
    backgroundColor: '#fff',
    primaryColor: '#000',
    iconElevation: elevation.e100,
  },
  product: {
    iconColor: colors.N0,
    backgroundColor: colors.B400,
    primaryColor: colors.N0,
    iconElevation: elevation.e100,
  },
  admin: {
    backgroundColor: colors.DN70,
    primaryColor: colors.N0,
    iconElevation: elevation.e100,
  },
  custom: {
    backgroundColor: colors.N0,
    primaryColor: colors.DN70,
    iconElevation: elevation.e100,
  },
  subtle: {
    backgroundColor: 'transparent',
    primaryColor: colors.text,
  },
  recommendedProduct: {
    backgroundColor: colors.N30,
    iconColor: colors.B200,
    iconGradientStart: colors.B400,
    iconGradientStop: colors.B200,
    iconElevation: elevation.e100,
  },
  recentLinks: {
    backgroundColor: '#fff',
    primaryColor: '#000',
  },
  discover: {
    backgroundColor: colors.N30,
    primaryColor: colors.DN90,
    iconElevation: elevation.e100,
  },
};

interface IconProps {
  theme: IconThemes;
}

export type IconType = ComponentType<IconProps>;

export const createIcon = (
  InnerIcon: React.ComponentType<any>,
  defaultProps?: AkIconProps | AkLogoProps,
): IconType => (props) => {
  const { backgroundColor, iconElevation, ...iconProps } =
    themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor} iconElevation={iconElevation}>
      <InnerIcon {...defaultProps} {...iconProps} />
    </IconBase>
  );
};

export const createImageIcon = (url: string): IconType => (
  props: IconProps,
) => {
  const { backgroundColor, iconElevation } =
    themes[props.theme] || themes.default;

  return (
    <IconBase bgColor={backgroundColor} iconElevation={iconElevation}>
      <ImageIconBase src={url} />
    </IconBase>
  );
};

type ThemedIconUrlMap = Partial<Record<IconThemes, string>> & {
  default: string;
};

export const createThemedImageIcon = (
  iconUrlsByTheme: ThemedIconUrlMap,
): IconType => (props: IconProps) => {
  const iconUrl: string =
    iconUrlsByTheme[props.theme] || iconUrlsByTheme.default;
  const ImageIcon = React.useMemo(() => createImageIcon(iconUrl), [iconUrl]);

  return <ImageIcon {...props} />;
};

/**
 * Due to remote SVG's downloading through fetch, there is a delay between when the network request starts and when they are rendered.
 * This causes them to disappear each time Switcher is mounted.
 * Adding this cache means that we can store the SVG content between mounts and not need to worry about re-fetching the content.
 */
const svgCache: Record<string, string> = {};

type RemoteIconProps = IconProps &
  Partial<AtlasKitIconProps> & {
    url: string;
  };

const RemoteIcon = (props: RemoteIconProps) => {
  const { url, ...svgProps } = props;
  const [svg, setSvg] = React.useState<string>(svgCache[url]);

  React.useEffect(() => {
    if (!svgCache[url]) {
      fetch(url)
        .then((res) => res.text())
        .then((content) => {
          setSvg(content);
          svgCache[url] = content;
        });
    }
  }, [url]);

  const BaseIcon = (iconProps: IconProps) => (
    <BaseAtlaskitIcon
      {...iconProps}
      label="Settings"
      dangerouslySetGlyph={svg}
    />
  );

  const Icon = createIcon(BaseIcon);

  return <Icon {...svgProps} />;
};

export const createRemoteIcon = (
  url: string,
  svgProps?: Partial<AtlasKitIconProps>,
): IconType => (props: IconProps) => {
  return <RemoteIcon url={url} {...svgProps} {...props} />;
};
