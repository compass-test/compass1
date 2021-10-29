import { useState } from 'react';

import { withContext } from '@atlassian/dragonfruit-utils';

export type articleIdType = string | null | undefined;

export const useHelpInternal: () => [
  {
    isHelpOpen: boolean;
    articleId: articleIdType;
  },
  {
    toggleHelp: () => void;
    setArticleId: (id: articleIdType) => void;
  },
] = () => {
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [articleId, setArticleId] = useState<articleIdType>('');

  const toggleHelp = () => {
    // This erases the article Id each time we close the help modal
    if (isHelpOpen) {
      setArticleId('');
    }
    setHelpOpen(prev => !prev);
  };

  return [
    {
      isHelpOpen,
      articleId,
    },
    {
      toggleHelp,
      setArticleId,
    },
  ];
};

export const {
  SharedStateProvider: HelpProvider,
  useSharedStateHook: useHelp,
} = withContext(useHelpInternal, {
  provider: 'HelpProvider',
  hook: 'useHelp',
});
