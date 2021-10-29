import React from 'react';

import { act, render, RenderResult } from '@testing-library/react';
import fileDownload from 'js-file-download';

import {
  CompassComponentDetailViewFragment,
  CompassComponentType,
  CompassLinkType,
  CompassRelationshipType,
} from '@atlassian/dragonfruit-graphql';
import { CompassTestProvider } from '@atlassian/dragonfruit-testing';

import {
  CONFIG_AS_CODE_DAC_LINK,
  CONFIG_AS_CODE_FILE_NAME,
} from '../../constants';

import GeneratedConfigCode from './main';

jest.mock('js-file-download', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const baseComponent: CompassComponentDetailViewFragment = {
  name: 'TestName',
  id:
    'ari:cloud:compass:4958bb5d-3970-4a13-bebc-62bbca57f370:component/5ce8c075-7b72-4455-9be9-7f0a1c6e6db4/a60d9b0f-fa86-436c-b3c2-0eece8e94fdb',
  type: CompassComponentType.SERVICE,
};

const baseYaml = `name: ${baseComponent.name}
id: '${baseComponent.id}'
description: null
ownerId: null
fields: null
links: null
relationships: {}

# Learn more about formatting compass.yml:
# ${CONFIG_AS_CODE_DAC_LINK}`;

const componentWithTier: CompassComponentDetailViewFragment = {
  name: 'TestName',
  id:
    'ari:cloud:compass:d7192f2f-11f8-4c7c-950c-af5ad04b12f8:component/79fc4a02-929a-43e6-93f5-3d4d9d54e942/0e8db7aa-4624-4f09-b51c-03b251b859bc',
  type: CompassComponentType.SERVICE,
  fields: [
    {
      definition: {
        id: 'compass:tier',
      },
      value: ['4'],
    },
  ],
};

const codeblockTestId = 'dragonfruit.config-as-code-generated-codeblock';

describe('GeneratedConfigCode', () => {
  test('renders successfully  ', () => {
    const { getByTestId } = render(
      <CompassTestProvider>
        <GeneratedConfigCode component={baseComponent} />
      </CompassTestProvider>,
    );

    expect(getByTestId(codeblockTestId)).toBeDefined();
  });

  describe('YAML generation', () => {
    test('only required fields', () => {
      const { getByTestId } = render(
        <CompassTestProvider>
          <GeneratedConfigCode component={baseComponent} />
        </CompassTestProvider>,
      );
      const generatedCode = getByTestId(codeblockTestId).innerText;
      expect(generatedCode).toMatchSnapshot();
    });

    test('all possible fields', () => {
      const component = {
        ...baseComponent,
        ownerId: 'someownerid',
        description: 'description goes here',
        links: [
          {
            name: 'Link 1',
            id: 'link1id',
            type: CompassLinkType.DASHBOARD,
            url: 'http://www.atlassian.net',
          },
          {
            name: 'Link 2',
            id: 'link2id',
            type: CompassLinkType.DOCUMENT,
            url: 'http://www.atlassian.net/wiki',
          },
        ],
        relationships: {
          nodes: [
            {
              type: CompassRelationshipType.DEPENDS_ON,
              startNode: baseComponent,
              endNode: { id: 'abc123' },
            },
          ],
        },
      };

      const { getByTestId } = render(
        <CompassTestProvider>
          <GeneratedConfigCode component={component} />
        </CompassTestProvider>,
      );

      const generatedCode = getByTestId(codeblockTestId).innerText;
      expect(generatedCode).toMatchSnapshot();
    });
    test('component with tier', () => {
      const { getByTestId } = render(
        <CompassTestProvider>
          <GeneratedConfigCode component={componentWithTier} />
        </CompassTestProvider>,
      );

      const generatedCode = getByTestId(codeblockTestId).innerText;
      expect(generatedCode).toMatchSnapshot();
    });
  });

  describe('copy and download', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(
        <CompassTestProvider>
          <GeneratedConfigCode component={baseComponent} />
        </CompassTestProvider>,
      );
    });

    test('can copy config file', () => {
      const writeTextMock = jest.fn();
      Object.assign(navigator, {
        clipboard: {
          writeText: writeTextMock,
        },
      });

      const copyButton = wrapper.getByTestId(
        'dragonfruit.config-as-code-setup-modal.copy-button',
      );
      act(() => copyButton.click());

      expect(writeTextMock).toBeCalled();
      expect(writeTextMock).toBeCalledWith(baseYaml);
    });

    test('can download config file', () => {
      const downloadButton = wrapper.getByTestId(
        'dragonfruit.config-as-code-setup.download-button',
      );
      act(() => downloadButton.click());

      expect(fileDownload).toBeCalled();
      expect(fileDownload).toBeCalledWith(baseYaml, CONFIG_AS_CODE_FILE_NAME);
    });
  });
});
