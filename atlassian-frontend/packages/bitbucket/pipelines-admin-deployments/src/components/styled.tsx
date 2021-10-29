// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

import * as colors from '@atlaskit/theme/colors';

export const Wrapper = styled.div`
  width: 100%;
  margin: 2px;
  max-width: 600px;
`;

export const EnvironmentType = styled.div`
  h3:first-child {
    font-size: 12px;
    color: ${colors.N200};
    margin: 24px 0;
  }
`;

export const Loading = styled.div`
  width: 100%;
  text-align: center;
  padding: 55px 0;
  height: 50px;
`;

export const DragHandle = styled.div`
  width: 18px;
  height: 50px;
  margin-bottom: -55px;
  position: relative;
  background: ${colors.N20};
  color: ${colors.N80};
  display: flex;
  align-items: center;
  & > span {
    margin-left: -3px;
    transform: rotateZ(90deg);
  }
  ${({ isDisabled }: { isDisabled: boolean }) =>
    isDisabled &&
    `
		pointer-events: none;
		cursor: none;
		& > span { opacity: 0.5 }
	`};
`;

export const EnvironmentWrapper = styled.div`
  box-shadow: 0 0 1px ${colors.N60A};
  min-height: 30px;
  margin: 5px 0;
  background: ${colors.N0};
  h5 {
    margin: 20px 0 -10px;
  }
`;

export const BranchRestrictionsWrapper = styled.div`
  margin: 12px 0 0;
  margin-bottom: 8px;
`;

export const InlinePremiumIconWrapper = styled.div`
  margin-left: 5px;
`;

// AK toggle introduces its own margin, breaking the crisp lines formed by our elements otherwise.
export const ToggleWrapper = styled.div`
  margin-left: -5px;
`;

export const Header = styled.header`
  display: flex;
  cursor: pointer;
  height: 50px;
  align-items: center;
  justify-content: space-between;
  h4 {
    font-weight: 600;
    font-size: 14px;
    margin: 0 0 0 12px;
    padding: 0;
    flex: 1 0 auto;
  }
`;

export const HeaderIcon = styled.div`
  position: relative;
  margin: 2px -3px 0 25px;
  width: 24px;
  color: ${colors.N500};
`;

export const UnrestrictedLockIcon = styled.div`
  left: 2px;
  top: 1px;
  position: relative;
`;

type EnvironmentItemState = {
  isFirstExpanded?: boolean;
  isExpanded: boolean;
  showGatingToggle?: boolean;
};

export const AccordionButton = styled.div`
  transform: translate3d(0, 0, 0);
  transform: ${(props: EnvironmentItemState) =>
    props.isExpanded && 'rotateZ(90deg)'};
  transition: transform 0.2s ease-in-out;
  margin-right: 8px;
  height: 32px;
`;
export const ExpandedContent = styled.div`
  height: ${(props: EnvironmentItemState) => (props.isExpanded ? '100%' : '0')};
  border-top: ${(props: EnvironmentItemState) =>
    props.isExpanded ? '1px #ebecf0 solid' : '0'};
  padding: ${(props: EnvironmentItemState) =>
    props.isExpanded ? '15px 20px' : '0'};
  overflow: ${(props: EnvironmentItemState) =>
    props.isExpanded ? 'visible' : 'hidden'};
  box-sizing: border-box;
  position: relative;
`;
export const PremiumLozenge = styled.div`
  display: flex;
`;

export const LicenseRestrictionMessage = styled.div`
  color: ${colors.N500};
  font-size: 12px;
  padding: 5px 0 10px 0;
`;

export const AdminRestriction = styled.div`
  display: flex;
  align-items: center;
  color: ${(props: { isPremium: boolean }) =>
    props.isPremium ? 'inherit' : colors.N70};
`;

export const DeploymentGatingWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${(props: { isPaidOrPremium: boolean }) =>
    props.isPaidOrPremium ? 'inherit' : colors.N70};
`;

export const Separator = styled.div`
  border-top: 1px #ebecf0 solid;
  height: 0;
  margin: 15px -20px -5px;
`;

export const Title = styled.strong`
  color: ${(props: { isPremium: boolean }) =>
    props.isPremium ? colors.N500 : colors.N70};
  display: block;
  font-size: 10px;
  margin: 0 0 8px;
`;

export const BranchMenuItem = styled.div`
  span {
    position: relative;
    top: 4px;
    margin-right: 4px;
    margin-top: -4px;
  }
`;

export const AddEnvironmentWrapper = styled.div`
  [class^='styledContentContainer'] {
    position: relative;
    top: 38px;
  }
`;

export const ReadViewContainer = styled.div`
  display: flex;
  cursor: pointer;
  color: ${colors.N100};
  align-items: center;
  padding: 4px;
`;

export const AddIconWrapper = styled.div`
  color: ${colors.N800};
  background: ${colors.N20};
  border-radius: 3px;
  padding: 2px;
  margin: 0 8px 0 0;
`;

export const ErrorIconWrapper = styled.div`
  padding-right: 10px;
  padding-top: 3px;
`;

export const RenameEnvironmentWrapper = styled.div`
  margin: 0 -8px 28px 8px;
  width: 396px;

  [class^='styledContentContainer'] {
    position: relative;
    top: -68px;
  }
`;

export const RenameEnvironmentTitle = styled.strong`
  color: ${colors.N300};
  display: block;
  font-weight: 500;
  font-size: 12px;
  margin: 0 0 8px -8px;
`;

export const RenameReadViewContainer = styled.div`
  margin: -3px -3px -2px -2px;
  height: 25px;
  line-height: 25px;
  max-width: 100%;
  border: ${colors.N40} 2px solid;
  border-radius: 3px;
  padding: 6px;
`;

export const EnvironmentActionsWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;
