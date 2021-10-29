import React from 'react';

import Button from '@atlaskit/button';

import { DOCS_WRITE_A_PIPE } from '../const';

import NoResults from './assets/NoResults';
import { PipeEmptyMessage, PipeEmptyWrapper } from './styled';
import SuggestPipe from './SuggestPipe';

type Props = {
  hasSmallIcon?: boolean;
};

const PipeEmptySearch: React.FC<Props> = ({ hasSmallIcon }) => {
  return (
    <PipeEmptyWrapper>
      <PipeEmptyMessage hasSmallIcon={hasSmallIcon}>
        <NoResults />
        <h3>Can't find a pipe?</h3>
        <p>
          Create your own pipe by following
          <br />
          <Button
            href={DOCS_WRITE_A_PIPE}
            spacing="none"
            appearance="link"
            target="_blank"
          >
            these instructions
          </Button>
          .
        </p>
        <p>Alternatively, you can suggest a new pipe.</p>
        <SuggestPipe isInline />
      </PipeEmptyMessage>
    </PipeEmptyWrapper>
  );
};

export default React.memo(PipeEmptySearch);
