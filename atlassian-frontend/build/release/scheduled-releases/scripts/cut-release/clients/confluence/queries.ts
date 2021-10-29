import { CONFLUENCE_TEMPLATE_ID } from './constants';

export const queryTemplate = (templateId = CONFLUENCE_TEMPLATE_ID) =>
  `query { 
    template(contentTemplateId: "${templateId}") { 
      body {
        atlas_doc_format { 
          value 
        } 
      } 
    } 
  }`;

export const queryCreatePage = () =>
  `mutation($input: NewPageInput!) {
    newPage(input: $input) {
      page {
        id
        title
        status
      }
    }
  }`;
