export default {
  props: {
    version: { type: 'enum', values: [1] },
    type: { type: 'enum', values: ['doc'] },
    content: {
      type: 'array',
      items: [
        [
          'blockCard',
          'paragraph_with_no_marks',
          'paragraph_with_alignment',
          'paragraph_with_indentation',
          'bulletList',
          'mediaSingle_full',
          'mediaSingle_caption',
          'codeBlock_with_no_marks',
          'codeBlock_with_marks',
          'orderedList',
          'heading_with_no_marks',
          'heading_with_alignment',
          'heading_with_indentation',
          'panel',
          'blockquote',
          'rule',
          'mediaGroup',
          'decisionList',
          'taskList',
          'extension_with_no_marks',
          'extension_with_marks',
          'embedCard',
          'table',
          'expand_with_no_mark',
          'expand_with_breakout_mark',
          'bodiedExtension_with_no_marks',
          'bodiedExtension_with_marks',
          'layoutSection_full',
          'layoutSection_with_single_column',
        ],
      ],
      allowUnsupportedBlock: true,
    },
  },
};
