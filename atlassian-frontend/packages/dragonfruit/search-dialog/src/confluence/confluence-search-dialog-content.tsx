import React, { FunctionComponent } from 'react';
import ConfluenceSearchDialog, {
  Props as DialogProps,
} from './confluence-search-dialog';

const ConfluenceSearchDialogContent: FunctionComponent<DialogProps> = ({
  isExpanded,
  ...rest
}) => {
  return (
    <>
      <ConfluenceSearchDialog isExpanded={isExpanded} {...rest} />
    </>
  );
};

export default ConfluenceSearchDialogContent;
export type Props = DialogProps;
