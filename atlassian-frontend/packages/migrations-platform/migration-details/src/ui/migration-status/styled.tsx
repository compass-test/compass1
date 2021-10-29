import styled from '@emotion/styled';

import { B400, G400, N30, N300, R400, Y400 } from '@atlaskit/theme/colors';
import {
  borderRadius,
  fontSizeSmall,
  gridSize,
} from '@atlaskit/theme/constants';

import { OverallMigrationStatus } from '../../common/types';

const statusColors: Record<OverallMigrationStatus, string> = {
  MigrationValidating: B400,
  MigrationRunning: B400,
  MigrationComplete: G400,
  MigrationIncomplete: Y400,
  MigrationFailed: R400,
  MigrationStopping: N300,
  MigrationStopped: N300,
  ChecksRunning: B400,
  ChecksSuccess: G400,
  ChecksError: R400,
  ChecksWarning: Y400,
  ChecksExecutionError: Y400,
  ChecksBlockingExecutionError: Y400,
};

interface WrapperProps {
  status: OverallMigrationStatus;
}

const getStatusColor = (props: WrapperProps) => {
  return statusColors[props.status];
};

export const Wrapper = styled.div<WrapperProps>`
  border-radius: ${borderRadius()}px;
  box-shadow: 0px 0px 1px rgba(9, 30, 66, 0.31),
    0px 1px 1px rgba(9, 30, 66, 0.25);
  border-left: solid ${gridSize() * 2}px ${getStatusColor};
`;

export const ContentWrapper = styled.div`
  padding: ${gridSize() * 2}px ${gridSize() * 3}px;
`;
export const ChecksWrapper = styled.div`
  margin-top: ${gridSize() * 3}px;
  margin-bottom: ${gridSize() * 2}px;
`;
export const EstimatesWrapper = styled.div`
  border-top: solid 2px ${N30};
  border-radius: 1px;
  padding-top: ${gridSize() * 2}px;
`;

export const MigrationCreationWrapper = styled.div`
  padding-top: ${gridSize()}px;
`;

export const MigrationCreationInfoWrapper = styled.div`
  color: ${N300};
  font-size: ${fontSizeSmall()}px;
`;
