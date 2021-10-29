// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

export const SshKeysWrapper = styled.div`
  display: block;
  margin-top: 30px;
`;

export const Loading = styled.div`
  display: block;
  text-align: center;
  margin-top: 16px;
`;

export const Row = styled.div`
  display: flex;
`;

export const AddKeyWrapper = styled.div`
  margin-top: 8px;
  label {
    width: 450px;
    flex: 1 0 auto;
    position: relative;
  }
  textarea {
    min-height: 114px !important;
    resize: none;
  }
`;

export const AddKeyRow = styled.div`
  display: flex;
  p {
    color: #7a879a;
    font-size: 12px;
    margin-left: 24px;
    margin-top: 32px;
    line-height: 20px;
    width: 180px;
  }
`;

export const AddKeyButtons = styled.div`
  margin: 24px 0 0;
  button {
    margin: 0 8px;
  }
`;

export const SplashScreenWrapper = styled.div`
  display: block;
  text-align: center;
  margin-top: 16px;
  p {
    color: #7a879a;
    max-width: 510px;
    margin: 8px auto 0;
  }
`;

export const SplashScreenButtons = styled.div`
  margin: 24px 0 0;
  button {
    margin: 0 8px;
  }
`;

export const ViewKeyWrapper = styled.div`
  margin-top: 8px;
  label {
    width: 450px;
    flex: 1 0 auto;
    position: relative;

    input {
      border: 0;
    }

    input + span svg {
      position: absolute;
      right: 8px;
      bottom: 25px;
    }
  }
  textarea {
    height: 114px;
    resize: none;
  }
  label + p {
    color: #7a879a;
    font-size: 12px;
    margin-left: 24px;
    margin-top: 32px;
    line-height: 20px;
    width: 180px;
  }
`;

export const ViewKeyButtons = styled.div`
  margin: 24px 0 0;
  display: flex;
  button {
    margin: 0 8px;
  }
`;

export const AuthorizedKeys = styled.span`
  text-align: center;
  display: inline-block;
  padding-right: 20px;
  svg {
    margin: 8px 0 5px;
  }
`;

export const KnownHostsWrapper = styled.div`
  display: block;
  margin-top: 32px;
  padding-bottom: 5px;

  form {
    display: flex;
    margin-top: 24px;
    align-items: center;

    & > div {
      &:first-of-type {
        width: 270px;
        flex: 0 1 auto;
        margin-top: 0;
      }

      position: relative;
      flex: 1 1 auto;
      margin-right: 8px;
    }
  }
`;

export const Table = styled.table`
  margin-bottom: 8px;
  color: #172b4d;
  thead th {
    color: #5e6c84;
    padding: 10px 8px 10px 0;
    &:first-of-type {
      width: 270px;
    }
    &:last-of-type {
      width: 40px;
    }
  }
  tbody td {
    padding: 13px 8px 13px 0;
    & + td:last-of-type {
      padding: 0;
    }
    button {
      visibility: hidden;
    }
  }
  tbody tr:hover {
    background-color: #fafbfc;
    button {
      visibility: visible;
    }
  }
  tfoot td {
    text-align: center;
    padding: 13px 0;
  }
`;

export const ClearForm = styled.div`
  cursor: pointer;
  display: inline-flex;
  float: right;
  margin-top: -36px;
  margin-right: 4px;
`;
