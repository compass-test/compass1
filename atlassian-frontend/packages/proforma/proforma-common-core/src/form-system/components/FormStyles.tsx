import styled from 'styled-components';

import { N0, N40 } from '@atlaskit/theme/colors';

import { ViewMode } from './ViewModeBar';

const FormContainerStyles = styled('div')<{
  viewMode: ViewMode;
}>`
  background-color: ${N0};
  height: ${(props): string =>
    props.viewMode === ViewMode.Preview ? '34.4rem' : 'auto'};
  overflow: auto;

  & .pm-table-container {
    z-index: auto;
  }
`;

export const FormContainerIssueCreateStyles = styled(FormContainerStyles)`
  border: 0px none;
`;

export const FormContainerIssueViewStyles = styled(FormContainerStyles)`
  border: 1px solid ${N40};
  border-radius: 0 0 4px 4px;
  border-top: 0px none;
`;

export const TopHeaderBarStyles = styled.div`
  border: 1px solid ${N40};
  border-top: 0px none;
  padding: 0 16px;
`;

export const TopHeaderBarPortalViewCloudStyles = styled.div`
  border-bottom: 1px solid ${N40};
`;

export const TopHeaderBarNativeIssueView = styled.div`
  border-bottom: 1px solid ${N40};
`;

export const BottomHeaderBarStyles = styled.div`
  border-top: 1px solid ${N40};
  padding: 0 16px;
`;

export const BottomHeaderBarPortalViewCloudStyles = styled.div`
  border-top: 1px solid ${N40};
`;

export const FormPageStyles = styled.div`
  background-color: white;
`;

export const SectionWrapperStyles = styled.div`
  position: relative;
  padding: 5px;
`;

export const SectionOverlayStyles = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(108, 121, 143, 0.1);
  top: 0;
  left: 0;
  position: absolute;
  border-radius: 3px;
  text-align: center;
`;

export const SectionMessageStyles = styled.h4`
  padding: 10px;
  color: #172b4d;
  background-color: white;
  display: inline-block;
  position: relative;
  top: 10px;
  border-radius: 10px;
`;
