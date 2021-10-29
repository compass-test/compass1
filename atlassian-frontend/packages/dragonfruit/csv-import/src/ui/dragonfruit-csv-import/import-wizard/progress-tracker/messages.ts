import { defineMessages } from 'react-intl';

export default defineMessages({
  progressStateUpload: {
    id: 'dragonfruit-csv-import.ui.progress.upload',
    defaultMessage: 'Upload',
    description:
      'Title shown for initial upload state in progress tracker wizard.',
  },
  progressStateValidation: {
    id: 'dragonfruit-csv-import.ui.progress.validation',
    defaultMessage: 'Validation',
    description:
      'Title shown for CSV validation state in progress tracker wizard.',
  },
  progressStatePreview: {
    id: 'dragonfruit-csv-import.ui.progress.preview',
    defaultMessage: 'Preview',
    description:
      'Title shown for CSV preview state in progress tracker wizard.',
  },
  progressStateImport: {
    id: 'dragonfruit-csv-import.ui.progress.import',
    defaultMessage: 'Import',
    description:
      'Title shown for during import state in progress tracker wizard.',
  },
  progressStateFinish: {
    id: 'dragonfruit-csv-import.ui.progress.finish',
    defaultMessage: 'Finish',
    description: 'Title shown for final state in progress tracker wizard.',
  },
});
