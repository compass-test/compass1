/* eslint-disable react/react-in-jsx-scope */
/* @jsx jsx */

// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { gridSize, colors } from '@atlaskit/theme';
import { css, jsx } from '@emotion/core';
import Period from './period';
import { PeriodsContainer } from './styled';
import { RotationProps } from '../../../../common/types';

export function Rotation({
  startDate,
  days,
  timezone,
  periods,
}: RotationProps) {
  return (
    <li
      className="layer"
      css={css`
        margin-top: 0px;
        line-height: ${gridSize() * 2.5}px;
        ol {
          border-bottom: 1px dashed ${colors.N40};
        }
      `}
    >
      <PeriodsContainer>
        {periods.map((props) => (
          <Period
            {...props}
            rotation={{
              startDate,
              days,
              timezone,
            }}
            key={moment(props.startDate).format()}
          />
        ))}
      </PeriodsContainer>
    </li>
  );
}

export default Rotation;
