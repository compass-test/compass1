import React from 'react';
import ExtensionWithDataSource from '../../../ui/Extension';
import { tableNode } from '../../__fixtures__/table-node';
import { mount } from 'enzyme';

describe('ExtensionWithDataSource', () => {
  it('should set initial source node', () => {
    const mockGet = jest.fn(() => tableNode);
    const localId = 'abcd';
    const dataConsumerMarkType = { name: 'dataConsumer' };
    const props: any = {
      editorView: {
        state: {
          schema: { marks: { dataConsumer: dataConsumerMarkType } },
        },
      },
      node: {
        type: 'extension',
        attrs: {
          extensionType: 'twp.editor.example',
        },
        marks: [
          {
            type: dataConsumerMarkType,
            attrs: {
              sources: [localId],
            },
          },
        ],
      },
      dataSourceProvider: {
        get: mockGet,
        subscribe: () => {},
        unsubscribe: () => {},
      },
    };
    const wrapper = mount(<ExtensionWithDataSource {...props} />);
    const sourceNode = (wrapper.find('Extension').props() as any).references;
    expect(mockGet).toHaveBeenCalledWith(localId);
    expect(sourceNode[0]).toEqual(tableNode);
  });
});
