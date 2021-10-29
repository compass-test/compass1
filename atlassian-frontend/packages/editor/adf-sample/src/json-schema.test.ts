import * as fullSchema from '@atlaskit/adf-schema/json-schema/v1/full.json';
import * as stageZeroSchema from '@atlaskit/adf-schema/json-schema/v1/stage-0.json';
import {
  fakeJSONSchema,
  getByDefinition,
  getContentData,
  getContentFromNode,
} from './json-schema';

describe('ADF JSONSchema', () => {
  it('should get doc_node definition', function () {
    expect(getByDefinition(fullSchema, '#/definitions/doc_node')).toEqual(
      fullSchema.definitions.doc_node,
    );
  });

  it('should get content from doc node', () => {
    expect(getContentFromNode(fullSchema, '#/definitions/doc_node')).toEqual([
      '#/definitions/codeBlock_with_no_marks_node',
      '#/definitions/codeBlock_with_marks_node',
      '#/definitions/blockCard_node',
      '#/definitions/paragraph_with_no_marks_node',
      '#/definitions/paragraph_with_alignment_node',
      '#/definitions/paragraph_with_indentation_node',
      '#/definitions/bulletList_node',
      '#/definitions/mediaSingle_full_node',
      '#/definitions/orderedList_node',
      '#/definitions/heading_with_no_marks_node',
      '#/definitions/heading_with_alignment_node',
      '#/definitions/heading_with_indentation_node',
      '#/definitions/panel_node',
      '#/definitions/blockquote_node',
      '#/definitions/rule_node',
      '#/definitions/mediaGroup_node',
      '#/definitions/decisionList_node',
      '#/definitions/taskList_node',
      '#/definitions/extension_with_no_marks_node',
      '#/definitions/extension_with_marks_node',
      '#/definitions/embedCard_node',
      '#/definitions/table_node',
      '#/definitions/expand_with_no_mark_node',
      '#/definitions/expand_with_breakout_mark_node',
      '#/definitions/bodiedExtension_with_no_marks_node',
      '#/definitions/bodiedExtension_with_marks_node',
      '#/definitions/layoutSection_full_node',
    ]);
  });

  it('should get content from codeBlock_with_no_marks_node', () => {
    expect(
      getContentFromNode(
        fullSchema,
        '#/definitions/codeBlock_with_no_marks_node',
      ),
    ).toEqual(['#/definitions/text_node']);
  });

  it('should get content from mediaSingle_full_node', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/mediaSingle_full_node'),
    ).toEqual(['#/definitions/media_node']);
  });

  it('should get content from `codeBlock_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/codeBlock_node'),
    ).toEqual(['#/definitions/text_node']);
  });

  it('should get content from `blockCard_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/blockCard_node'),
    ).toEqual([]);
  });

  it('should get content from `nestedExpand_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/nestedExpand_node'),
    ).toEqual([
      '#/definitions/paragraph_with_no_marks_node',
      '#/definitions/mediaSingle_full_node',
      '#/definitions/heading_with_no_marks_node',
      '#/definitions/mediaGroup_node',
    ]);
  });

  it('should get content from `bodiedExtension_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/bodiedExtension_node'),
    ).toEqual([
      '#/definitions/codeBlock_with_no_marks_node',
      '#/definitions/blockCard_node',
      '#/definitions/paragraph_with_no_marks_node',
      '#/definitions/bulletList_node',
      '#/definitions/mediaSingle_full_node',
      '#/definitions/orderedList_node',
      '#/definitions/heading_with_no_marks_node',
      '#/definitions/panel_node',
      '#/definitions/blockquote_node',
      '#/definitions/rule_node',
      '#/definitions/mediaGroup_node',
      '#/definitions/decisionList_node',
      '#/definitions/taskList_node',
      '#/definitions/extension_with_no_marks_node',
      '#/definitions/extension_with_marks_node',
      '#/definitions/embedCard_node',
      '#/definitions/table_node',
    ]);
  });

  it('should get content from `paragraph_with_indentation_node`', () => {
    expect(
      getContentFromNode(
        fullSchema,
        '#/definitions/paragraph_with_indentation_node',
      ),
    ).toEqual([
      '#/definitions/hardBreak_node',
      '#/definitions/mention_node',
      '#/definitions/emoji_node',
      '#/definitions/inlineExtension_with_no_marks_node',
      '#/definitions/inlineExtension_with_marks_node',
      '#/definitions/date_node',
      '#/definitions/placeholder_node',
      '#/definitions/inlineCard_node',
      '#/definitions/status_node',
      '#/definitions/formatted_text_inline_node',
      '#/definitions/code_inline_node',
    ]);
  });

  it('should get content from `bulletList_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/bulletList_node'),
    ).toEqual(['#/definitions/listItem_node']);
  });

  it('should get content from `listItem_node`', () => {
    expect(
      getContentFromNode(fullSchema, '#/definitions/listItem_node'),
    ).toEqual(
      expect.arrayContaining([
        '#/definitions/codeBlock_with_no_marks_node',
        '#/definitions/paragraph_with_no_marks_node',
        '#/definitions/bulletList_node',
        '#/definitions/mediaSingle_full_node',
        '#/definitions/orderedList_node',
      ]),
    );
  });

  it('should get content from `mediaSingle_caption_node`', () => {
    expect(
      getContentFromNode(
        stageZeroSchema,
        '#/definitions/mediaSingle_caption_node',
      ),
    ).toEqual(
      expect.arrayContaining([
        '#/definitions/media_node',
        '#/definitions/caption_node',
      ]),
    );
  });

  describe('create reference sample', () => {
    it('should create a doc node', function () {
      expect(fakeJSONSchema(fullSchema, '#/definitions/doc_node')).toEqual({
        version: 1,
        type: 'doc',
        content: [],
      });
    });

    it('should create a paragraph with no marks node', function () {
      expect(
        fakeJSONSchema(
          fullSchema,
          '#/definitions/paragraph_with_no_marks_node',
        ),
      ).toEqual({
        type: 'paragraph',
        content: [],
      });
    });

    it('should create a paragraph with alignment node', function () {
      expect(
        fakeJSONSchema(
          fullSchema,
          '#/definitions/paragraph_with_alignment_node',
        ),
      ).toEqual({
        type: 'paragraph',
        marks: [
          {
            type: 'alignment',
            attrs: {
              align: 'center',
            },
          },
        ],
        content: [],
      });
    });
  });

  describe('Stage 0', () => {
    describe('getContentData', () => {
      describe('media single with caption', () => {
        expect(
          getContentData(
            stageZeroSchema,
            '#/definitions/mediaSingle_caption_node',
          ),
        ).toEqual({
          minItems: 1,
          maxItems: 2,
          startsWith: ['#/definitions/media_node'],
          customContent: ['#/definitions/caption_node'],
        });
      });
    });
  });
});
