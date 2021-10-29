import React from 'react';
import { TagProps, TagColor } from '@atlassian/forge-ui-types';
import type { TagColor as AKTagColor } from '@atlaskit/tag';
import { Props } from '..';

const AKTag = React.lazy(() =>
  import('@atlaskit/tag').then((module) => ({
    default: module.SimpleTag,
  })),
);

type AKTagColorSansUndefined = Exclude<AKTagColor, undefined>;

const colorDict: Record<TagColor, AKTagColorSansUndefined> = {
  default: 'standard',
  green: 'green',
  blue: 'blue',
  red: 'red',
  purple: 'purple',
  grey: 'grey',
  teal: 'teal',
  yellow: 'yellow',
  'green-light': 'greenLight',
  'blue-light': 'blueLight',
  'red-light': 'redLight',
  'purple-light': 'purpleLight',
  'grey-light': 'greyLight',
  'teal-light': 'tealLight',
  'yellow-light': 'yellowLight',
};

const mapColorToAK = (color: TagColor): AKTagColor => {
  return colorDict[color];
};

const Tag: React.FunctionComponent<TagProps> = ({
  color = 'default',
  text,
}) => {
  const akColor = mapColorToAK(color);
  return <AKTag color={akColor} text={text} />;
};

export const TagFn: React.FunctionComponent<Props> = ({ props }) => {
  const { color, text } = props as TagProps;
  return <Tag color={color} text={text} />;
};

export default Tag;
