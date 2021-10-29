import styled from 'styled-components';

// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors } from '@atlaskit/theme';

export const ListItemComponentStyling = styled.div`
  max-width: 700px;
  display: flex;
  margin-bottom: ${props =>
    //@ts-ignore
    props.isLast ? '5px' : '15px'};
`;

export const ChecklistBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  margin-top: 0px;
  margin: auto;
  width: 80%;

  background: #ffffff;

  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 4px;
  z-index: 2;
`;

export const TextAndLozengeWrapper = styled.div`
  flex-direction: column;
`;

export const ProductAndLozengeWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ProductLozengeAndSiteWrapper = styled.div`
  flex-direction: column;
  padding-left: 5px;
`;

export const ProductLabelWrapper = styled.div`
  color: ${colors.N800};
`;

export const SiteWrapper = styled.div`
  font-size: 11px;
  color: #6b778c;
`;

export const LozengeWrapper = styled.div`
  margin-left: 5px;
  color: ${colors.B500};
`;

export const ConfirmationSpacer = styled.div`
  width: 24px;
`;
