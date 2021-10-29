import React, { FunctionComponent } from 'react';
import ConfluenceSearchDialog, {
  Props as DialogProps,
} from './confluence-search-dialog';
import WarmUpCollabGraphCache from './warm-up-collab-graph-cache';

const ConfluenceSearchDialogContent: FunctionComponent<DialogProps> = ({
  isExpanded,
  ...rest
}) => {
  return (
    <>
      <ConfluenceSearchDialog isExpanded={isExpanded} {...rest} />
      {isExpanded ? <WarmUpCollabGraphCache /> : null}
    </>
  );
};

export default ConfluenceSearchDialogContent;
export type Props = DialogProps;
