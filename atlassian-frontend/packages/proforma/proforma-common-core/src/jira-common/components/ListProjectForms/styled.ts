import styled from 'styled-components';

import EditorSearchIcon from '@atlaskit/icon/glyph/editor/search';
import { N40, N600 } from '@atlaskit/theme/colors';
import { fontFamily, fontSize } from '@atlaskit/theme/constants';

export const FormNameWrapper = styled.div`
  // position: absolute;
  left: 1.33%;
  right: 74.69%;
  top: 16.94%;
  bottom: 78.69%;

  font-family: ${fontFamily()};
  font-size: ${fontSize()};
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  /* Neutral (Light) / N600 */
  color: ${N600};
`;

export const RequestTypeItem = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const RequestTypeIcon = styled.img`
  width: 25px;
  margin-right: 10px;
`;

export const LocationNameWrapper = styled.div`
  // position: absolute;
  left: 1.33%;
  right: 74.69%;
  top: 16.94%;
  bottom: 78.69%;

  font-family: ${fontFamily()};
  font-size: ${fontSize()};
  font-weight: bold;
  line-height: 24px;
  /* identical to box height, or 150% */

  display: flex;
  align-items: center;

  /* Neutral (Light) / N600 */
  color: ${N600};
`;

// export const RequestTypeWrapper = styled.div`
//   // position: absolute;
//   left: 1.33%;
//   right: 74.69%;
//   top: 16.94%;
//   bottom: 78.69%;
//
//   font-family: ${fontFamily()};
//   font-size: ${fontSize()};
//   line-height: 24px;
//   /* identical to box height, or 150% */
//
//   display: flex;
//   align-items: center;
//
//   /* Neutral (Light) / N600 */
//   color: ${N600};
// `;

export const LocationRequestsTableWrapper = styled.div`
  table {
    border-collapse: collapse;
  }
  tr {
    border: solid;
    border-width: 1px 0;
    border-color: ${N40};
  }
  td {
    padding: 15px 10px;
  }
  tr:first-child {
    border-top: none;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

export const LocationTableWrapper = styled.div`
  table {
    border-collapse: collapse;
  }
  tr {
    border: solid;
    border-width: 1px 0;
    border-color: ${N40};
  }
  td {
    padding: 10px 10px;
  }
  tr:first-child {
    border-top: none;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

export const RequestTypeIconSmall = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;

export const SmallSearchIcon = styled(EditorSearchIcon)`
  width: 20px;
  height: 20px;
`;

export const TextfieldWrapper = styled.div`
  margin-right: 10px;
  width: 242px;
`;

// START CopyProjectFormModal

export const PanelContainer = styled.div`
  display: flex;
  margin: 15px 0px;
`;

export const LeftPanel = styled.div`
  flex-basis: 100%;
`;

export const RightPanel = styled.div`
  flex-basis: 100%;
`;

export const FormNameContainer = styled.div`
  margin-top: 10px;
  margin-right: 15px;
  display: flex;
  justify-content: space-between;
`;

export const ProjectsContainer = styled.div`
  margin-top: 10px;
`;

export const ProjectLabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const ProjectNameContainer = styled.div`
  margin-left: 8px;
`;

// END CopyProjectFormModal
export const Divider = styled.hr`
  border-style: none;
  background-color: ${N40};
  height: 1px;
  margin: 0;
`;

export const RequestTypesDivider = styled(Divider)`
  margin: 0;
`;

export const RequestTypeWrapper = styled.div`
  padding: 0px;
  display: flex;
  align-items: center;
`;

export const RequestTypePaddingWrapper = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;
