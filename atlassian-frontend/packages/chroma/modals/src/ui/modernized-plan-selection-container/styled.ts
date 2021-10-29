import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const BodyRoot = styled.div`
  min-height: 120px;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 24px 12px 24px;
  margin-top: 0px;
  margin: auto;
  width: 90%;

  background: #ffffff;

  /* box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 4px;
  z-index: 2; */
`;

export const FeatureListItem = styled.div`
  max-width: 700px;
  display: flex;
  margin-bottom: 15px;
`;

export const FeatureTextStyling = styled.div`
  margin-left: 5px;
  padding-top: 3px;
`;

export const ModalButtonsContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: flex-end;
  padding: 0px 15px 15px 15px;
`;

export const ButtonWrapper = styled.div`
  margin: 2px;
`;

export const FooterStyling = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
`;

export const BodyText = styled.div`
  position: relative;
  width: 85%;
  margin: auto;
  margin-top: 0px;
  margin-bottom: 11px;
  color: ${colors.N600};
  font-size: 14px;
  line-height: 140%;
`;

export const Root = styled.div`
  position: relative;
`;
