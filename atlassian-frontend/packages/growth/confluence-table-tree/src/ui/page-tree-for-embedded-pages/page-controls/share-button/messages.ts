import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'confluence-table-tree.share.title',
    defaultMessage: 'Share page',
    description:
      'Title of the inline dialog that allows users to copy a page link',
  },
  subtitle: {
    id: 'confluence-table-tree.share.subtitle',
    defaultMessage: 'Share this link',
    description:
      'Subtitle of the inline dialog that allows users to copy a page link',
  },
  copyButton: {
    id: 'confluence-table-tree.share.copy-button',
    defaultMessage: 'Copy',
    description: 'Label of the button that copies a page link',
  },
  copied: {
    id: 'confluence-table-tree.share.copied',
    defaultMessage: 'Copied to clipboard',
    description:
      'Small inline message letting users know that a page link has been copied',
  },
  tooltip: {
    id: 'confluence-table-tree.share.tooltip',
    defaultMessage: 'Share',
    description:
      'Tooltip when users hover over the button that allows them to share a page link',
  },
});
