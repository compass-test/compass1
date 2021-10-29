import { BaseClient } from '../base';
import { capitalise } from '../../../../utils';
import {
  CONFLUENCE_API_URL,
  CONFLUENCE_TEMPLATE_ID,
  CONFLUENCE_PARENT_ID,
  CONFLUENCE_SPACE_KEY,
} from './constants';
import { queryTemplate, queryCreatePage } from './queries';

export class ConfluenceClient extends BaseClient {
  // TODO: Confluence endpoints not accepting large template payload.
  public async createReleaseTemplate(
    releaseName: string,
    adfContent: object,
    parentId = CONFLUENCE_PARENT_ID,
    spaceKey = CONFLUENCE_SPACE_KEY,
  ) {
    const titleMonth = new Date().toLocaleString('default', { month: 'long' });
    const titleText = capitalise(releaseName);
    const title = `Release - ${titleText} [${titleMonth}]`;
    const options = this.getOptions('POST', {
      query: queryCreatePage(),
      variables: {
        input: {
          space: {
            key: spaceKey,
          },
          page: {
            title,
            parentId,
            status: 'CURRENT',
            body: {
              value: adfContent,
              representation: 'ATLAS_DOC_FORMAT',
            },
          },
        },
      },
    });
    return await this.request(CONFLUENCE_API_URL, options);
  }

  public async getTemplateBody(templateId = CONFLUENCE_TEMPLATE_ID) {
    const options = this.getOptions('POST', {
      query: queryTemplate(templateId),
    });
    const response = await this.request(CONFLUENCE_API_URL, options);
    return response.data.template.body.atlas_doc_format.value;
  }
}

// DO NOT LEAVE UNCOMMENTED: FOR TESTING
// const main = async () => {
//   const client = new ConfluenceClient({
//     username: process.env.ATLASSIAN_USER!,
//     password: process.env.ATLASSIAN_PASSWORD!,
//   });
//   const releaseName = 'test-release-automation';
//   const body = await client.getTemplateBody();
//   const page = await client.createReleaseTemplate(releaseName, body);
//   console.log(JSON.stringify({ page }));
// };
// main();
