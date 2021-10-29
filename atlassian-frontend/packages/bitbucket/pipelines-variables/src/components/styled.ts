import styled from 'styled-components';

// AFP-2532 TODO: Fix automatic suppressions below
// eslint-disable-next-line @atlassian/tangerine/import/entry-points
import { colors, elevation } from '@atlaskit/theme';

export const Wrapper = styled.div`
  tfoot {
    display: none;
    td {
      padding: 20px 0 !important;
      text-align: center !important;
    }
  }
  tbody:empty + tfoot {
    display: table-footer-group;
  }
`;
export const Header = styled.header`
  margin: 16px 0 8px;
  box-sizing: border-box;
  tbody {
    border-width: 0;
  }
`;
export const Section = styled.section``;

export const LoadMore = styled.div`
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RowWrapper = styled.tr`
  form,
  .form {
    display: flex;
    margin: 0;

    [data-button-delete] {
      flex: 0 1 auto;
      margin: 4px;
      display: flex;
    }
  }
  &[data-not-create='true'] {
    form {
      &.active {
        background-color: ${colors.N10};
      }
    }
    &:hover {
      background: ${colors.N10};
    }
  }
`;

export const FieldGroup = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

export const CreateFieldGroup = FieldGroup.extend`
  &:nth-child(1) {
    flex: 0 0 30%;
    div {
      flex: 1 1 auto;
    }
    padding-right: 4px;
  }
  &:nth-child(2) {
    flex: 0 0 30%;
    div {
      flex: 1 1 auto;
    }
    padding-right: 4px;
  }
`;

export const UpdateFieldGroup = FieldGroup.extend`
  padding-bottom: 8px;
  &:nth-child(1) {
    flex: 0 0 35%;
    padding-left: 8px;
  }
  &:nth-child(2) {
    flex: 0 0 35%;
    padding-left: 4px;
  }
  [class^='styledContentContainer'] {
    position: relative;
    bottom: 85px;
  }
`;

export const ReadViewContainer = styled.div`
  line-height: 16px;
  max-width: 100%;
  min-width: 148px;
  word-break: break-all;
  border-radius: 3px;
  padding: 6px;
  ${({ isDisabled }: { isDisabled?: boolean }) =>
    isDisabled && `color: ${colors.N70}`};
`;

export const VariableRowButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1 0 auto;
  align-items: center;

  button {
    width: 24px;
    height: 24px;
  }
`;

export const SecuredLabel = styled.label`
  display: flex;
  align-items: center;
  input {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

export const LockIconWrapper = styled.div`
  width: 18px;
  color: ${colors.N400};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ErrorMessageWrapper = styled.div`
  position: absolute;
  top: 40px;
  background: #fff;
  padding: 4px;
  z-index: 1;
  ${elevation.e200()}
`;
