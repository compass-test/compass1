import React, { ComponentType } from 'react';

import { FormattedMessage } from 'react-intl';

import Icon, { CustomGlyphProps } from '@atlaskit/icon';
import { GlyphProps } from '@atlaskit/icon/types';
import { CommonMessages } from '@atlassian/dragonfruit-common-messages';
import { CompassComponentType } from '@atlassian/dragonfruit-graphql';
import { useIntl } from '@atlassian/dragonfruit-utils';

import {
  ApplicationGlyph,
  CompassIconsProps,
  LibraryGlyph,
  OtherGlyph,
  ServiceGlyph,
} from '../../../assets';

export type ComponentIconGlyphProps = CompassIconsProps & {
  type: CompassComponentType;
};

function getComponentTypeGlyph(
  componentType: CompassComponentType,
): ComponentType<CustomGlyphProps> {
  switch (componentType) {
    case CompassComponentType.APPLICATION:
      return ApplicationGlyph;
    case CompassComponentType.LIBRARY:
      return LibraryGlyph;
    case CompassComponentType.SERVICE:
      return ServiceGlyph;
    case CompassComponentType.OTHER:
      return OtherGlyph;
    default:
      throw Error(
        `No glyph has been defined for component type "${componentType}"`,
      );
  }
}

function getComponentTypeLabel(
  componentType: CompassComponentType,
): FormattedMessage.MessageDescriptor {
  switch (componentType) {
    case CompassComponentType.APPLICATION:
      return CommonMessages.application;
    case CompassComponentType.LIBRARY:
      return CommonMessages.library;
    case CompassComponentType.SERVICE:
      return CommonMessages.service;
    case CompassComponentType.OTHER:
      return CommonMessages.other;
    default:
      throw Error(
        `No label has been defined for component type "${componentType}"`,
      );
  }
}

/**
 * Creates an SVG with a color and glyph based on the type of component.
 */
export function ComponentIconGlyph(props: ComponentIconGlyphProps) {
  const { type, ...forwardProps } = props;
  const { formatMessage } = useIntl();

  // The order of the props is important so that they can be overwritten by forwardProps
  return (
    <Icon
      label={formatMessage(getComponentTypeLabel(type))}
      glyph={getComponentTypeGlyph(type)}
      {...forwardProps}
    />
  );
}

export function ServiceIcon(props: GlyphProps) {
  return <Icon glyph={ServiceGlyph} {...props} />;
}
