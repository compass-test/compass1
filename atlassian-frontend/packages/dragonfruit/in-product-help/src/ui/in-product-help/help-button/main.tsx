import React from 'react';

import { Help as HelpIcon } from '@atlaskit/atlassian-navigation';

import {
  articleIdType,
  useHelp,
} from '../../../controllers/help-context-controller';

type HelpButtonProps = {
  articleId?: articleIdType;
  testId?: string;
};

export const HelpButton = (props: HelpButtonProps) => {
  const [
    { isHelpOpen: isOpen, articleId: prevArticleId },
    { toggleHelp, setArticleId },
  ] = useHelp();
  const { articleId, testId } = props;

  const handleClick = () => {
    // Since we can have multiple help buttons sharing this component,
    // only want to close help sidebar if we're clicking a different help button
    if (articleId !== prevArticleId) {
      setArticleId(articleId);
      if (!isOpen) {
        toggleHelp();
      }
    } else {
      toggleHelp();
    }
  };

  // Setting isSelected to `false` now to prevent all help buttons from being highlighted
  // If we want to highlight individual buttons, we should handle this state locally
  return (
    <HelpIcon
      testId={testId}
      onClick={handleClick}
      isSelected={false}
      tooltip="Help"
    />
  );
};
