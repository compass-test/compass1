import React, { Ref, useCallback, useState } from 'react';

import { ScaleLinear } from 'd3-scale';

import Popup from '@atlaskit/popup';
import { N20A } from '@atlaskit/theme/colors';

import {
  barHeight,
  chartWidth,
  comparisonBarHeight,
  itemLabelColumnWidth,
  outerRowHeight,
} from '../../../../common/constants/breakdown-chart/waterfall-chart';
import { ComparisonType } from '../../../../common/types';
// eslint-disable-next-line @atlassian/tangerine/import/no-parent-imports
import { ChartTimingData } from '../types';

import { TimingItemContainer } from './styled';
import { TimingBar } from './timing-bar';
import { TimingLabel } from './timing-label';
import { Tooltip } from './tooltip';

export interface Props {
  timing: ChartTimingData;
  scale: ScaleLinear<number, number>;
  color: string;
  index: number;
  viewBoxWidth: number;
  onClick?: (timingName: string) => void;
  baseDate: Date;
  comparisonDate: Date;
  comparisonType: ComparisonType;
  comparisionColor: string;
  isShowAbsoluteTimingDiff: boolean;
  isShowPercentageTimingDiff: boolean;
}

export const TimingItem = (props: Props) => {
  const { color, comparisionColor, index, onClick, timing, scale } = props;

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const openTooltip = useCallback(() => {
    setIsTooltipOpen(true);
  }, [setIsTooltipOpen]);
  const closeTooltip = useCallback(() => {
    setIsTooltipOpen(false);
  }, [setIsTooltipOpen]);

  const handleClick = useCallback(() => {
    onClick?.(timing.name);
  }, [onClick, timing.name]);
  return (
    <TimingItemContainer
      fill={color}
      stroke={color}
      strokeWidth="1"
      transform={`translate(0, ${index * outerRowHeight})`}
    >
      <rect
        height={outerRowHeight}
        width={chartWidth}
        fill={N20A}
        opacity={index % 2 === 0 ? 1 : 0}
        stroke="none"
      />
      <g
        onClick={handleClick}
        style={{
          cursor: timing.hasSubmetrics
            ? timing.isExpanded
              ? 'zoom-out'
              : 'zoom-in'
            : 'unset',
        }}
      >
        <TimingLabel {...props} />

        <g
          transform={`translate(0, ${
            (outerRowHeight - barHeight - comparisonBarHeight) / 2
          })`}
        >
          <Popup
            isOpen={isTooltipOpen}
            onClose={closeTooltip}
            placement="auto"
            trigger={(triggerProps) => {
              const { ref, ...otherTriggerProps } = triggerProps;

              const castedSvgRef = ref as Ref<SVGGElement>;
              return (
                <g
                  {...otherTriggerProps}
                  ref={castedSvgRef}
                  fill={color}
                  stroke="none"
                  strokeWidth="1"
                  transform={`translate(${itemLabelColumnWidth}, 0)`}
                  onMouseOut={closeTooltip}
                  onMouseOver={openTooltip}
                >
                  {timing.duration != null && (
                    <TimingBar
                      startTime={timing.startTime ?? 0}
                      duration={timing.duration}
                      scale={scale}
                      color={color}
                    />
                  )}
                  <g transform={`translate(0, ${barHeight})`}>
                    {timing.comparisonDuration != null && (
                      <TimingBar
                        startTime={timing.comparisonStartTime ?? 0}
                        duration={timing.comparisonDuration}
                        scale={scale}
                        color={comparisionColor}
                      />
                    )}
                  </g>
                </g>
              );
            }}
            content={() => <Tooltip {...props} />}
          />
        </g>
      </g>
    </TimingItemContainer>
  );
};
