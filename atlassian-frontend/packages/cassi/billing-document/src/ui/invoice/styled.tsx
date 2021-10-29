/** @jsx jsx */
import styled from '@emotion/styled';

export const InvoiceContainer = styled.div`
  .invoice {
    .main {
      max-width: 900px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .invoice-details {
      max-width: 900px;
    }

    .app-content {
      overflow: unset;
    }

    .invoice-dates {
      flex: 1;
      text-align: right;

      h4 {
        margin: 0;
      }
    }

    .invoice-notes {
      margin-bottom: 40px;
      h4 {
        margin-bottom: 0;
      }
      span {
        margin-bottom: 12px;
        display: block;
      }
    }

    h4 {
      font-weight: 400;
      margin-bottom: 10px;
      font-size: 16px;
    }
  }
`;
