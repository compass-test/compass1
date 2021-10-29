import styled from '@emotion/styled';

interface StyledFeatureRowProps {
  isHeader?: boolean;
  hasModal?: boolean;
}

export const StyledFeatureRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. . . .';

  ${(props: StyledFeatureRowProps) =>
    !props.isHeader &&
    props.hasModal &&
    `
    &:hover {
      background-color: rgba(222, 235, 255, 0.2);
      cursor: pointer;
    }
  `}
`;

export const StyledCategoryRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: '. . . .';
`;

export const StyledFooter = styled.div`
  margin-top: 12px;
  margin-bottom: 75px;
  height: 50px;
  grid-column: 2 / 5;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
  border-radius: 4px;
`;

interface StyledFeatureRowCellProps extends StyledFeatureRowProps {
  isHighlighted?: boolean;
  isLastRow?: boolean;
  isFirstCol?: boolean;
  isLastCol?: boolean;
}

export const StyledFeatureRowCell = styled.div<StyledFeatureRowCellProps>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 48px;
  border: 1px solid #dfe1e6;
  margin-left: -1px;
  margin-top: -1px;
  padding: 5px 0;
  z-index: -2;
  ${props =>
    props.isHeader &&
    `
    justify-content: space-between;
    border-left-width: 1px;
    padding: 5px 15px;
    flex-direction: row;
    flex-wrap: wrap;
  `}
  ${props =>
    `
    color: ${props.hasModal ? '#0052cc' : '#172B4D'};
  `}
  ${props =>
    props.isHighlighted &&
    `
    background-color: #FAFBFC;
    color: #091E42;
    border-left-color: #0052cc;
    border-right-color: #0052cc;
    z-index: -1;
  `}

${props =>
    props.isHighlighted &&
    props.isLastRow &&
    `
    border-bottom-color: #0052cc;
  `}
`;

export const StyledCategoryRowCell = styled.div<StyledFeatureRowCellProps>`
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 14px;
  line-height: 20px;
  color: #172b4d;
  height: 48px;
  background: #f4f5f7;
  border-top: 1px solid #dfe1e6;
  border-bottom: 1px solid #dfe1e6;
  margin-left: -1px;
  margin-top: -1px;
  padding: 5px 15px;
  z-index: -2;

  ${props =>
    props.isHighlighted
      ? `
    border-left: 1px solid #0052cc;
    border-right: 1px solid #0052cc;
    z-index: -1;
  `
      : props.isFirstCol
      ? ` border-left: 1px solid #dfe1e6;`
      : props.isLastCol
      ? ` border-right: 1px solid #dfe1e6;`
      : ``}
`;

interface StyledFeatureRowCellTextProps {
  isHighlighted?: boolean;
  isSmall?: boolean;
}

export const StyledFeatureRowCellText = styled.div<
  StyledFeatureRowCellTextProps
>`
  color: ${props => (props.isHighlighted ? '#091E42' : '#172B4D')};
  font-size: ${props => (props.isSmall ? '11px' : '14px')};
  line-height: ${props => (props.isSmall ? '14px' : '20px')};
  font-weight: ${props => (props.isHighlighted ? '600' : '400')};
`;

interface StyledFeatureRowCellIconProps {
  isHighlighted?: boolean;
}

export const StyledFeatureRowCellIcon = styled.div<
  StyledFeatureRowCellIconProps
>`
  color: ${props => (props.isHighlighted ? '#091E42' : '#42526E')};
`;

interface StyledHeaderRowCellProps extends StyledFeatureRowCellProps {
  mostPopularLabel: string;
}

export const StyledHeaderRowCell = styled(StyledFeatureRowCell)<
  StyledHeaderRowCellProps
>`
  color: ${props => (props.isHighlighted ? '#0052cc' : '#344563')};
  justify-content: space-evenly;
  height: unset;
  padding: 15px;
  text-transform: capitalize;
  position: relative;
  z-index: 2;
  ${props =>
    props.isHighlighted &&
    `border-top-color: #0052cc;
  z-index: 3;
  `}

  ${props =>
    props.isHighlighted &&
    `
    &:before {
      display: flex;
      justify-content: center;
      align-items: center;
      content: '${props.mostPopularLabel}';
      font-size: 12px
      line-height: 16px;
      color: white;
      background-color: #0052cc;
      position: absolute;
      top: -37px;
      height: 35px;
      width: 100%;
      border: 1px solid #0052cc;
      border-radius: 10px 10px 0 0;
    }
  `}
`;

export const StyledTextHeader = styled.span`
  font-size: 29px;
  font-weight: 700;
  line-height: 32px;
  text-align: center;
`;

export const StyledPlanImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
`;

export const StyledFeatureName = styled.div`
  margin-right: 12px;
`;
