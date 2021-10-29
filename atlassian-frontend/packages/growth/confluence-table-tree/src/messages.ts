import { defineMessages } from 'react-intl';

export default defineMessages({
  errorTitle: {
    id: 'confluence-table-tree.error.title',
    defaultMessage: 'Well, this is awkward...',
  },
  errorDescription: {
    id: 'confluence-table-tree.error.description',
    defaultMessage: "We can't show you these pages. Please try again later.",
  },
  errorRow: {
    id: 'confluence-table-tree.error.row',
    defaultMessage: 'Unable to load pages.',
  },
  emptyTitle: {
    id: 'confluence-table-tree.empty.title',
    defaultMessage: "There's nothing here but potential",
  },
  emptyDescription: {
    id: 'confluence-table-tree.empty.description',
    defaultMessage:
      'Create some meeting notes, product requirements, decisions, or other content to see this space fill up.',
  },
  create: {
    id: 'confluence-table-tree.create-page',
    defaultMessage: 'Create page',
  },
  title: {
    id: 'confluence-table-tree.column.title',
    defaultMessage: 'Name',
  },
  contributors: {
    id: 'confluence-table-tree.column.contributors',
    defaultMessage: 'Contributors',
  },
  lastModified: {
    id: 'confluence-table-tree.column.last-modified',
    defaultMessage: 'Last modified',
  },
  viewProfile: {
    id: 'confluence-table-tree.view-profile',
    defaultMessage: 'View profile',
  },
  unknown: {
    id: 'confluence-table-tree.unknown',
    defaultMessage: 'Unknown',
  },
  editInConfluence: {
    id: 'confluence-table-tree.edit-in-confluence',
    defaultMessage: 'Edit in Confluence',
  },
  edit: {
    id: 'confluence-table-tree.edit',
    defaultMessage: 'Edit',
  },
  createChildPage: {
    id: 'confluence-table-tree.create-child-page',
    defaultMessage: 'Create a child page',
    description:
      'Tooltip for button to create a child page in the Project Pages page tree',
  },
});
