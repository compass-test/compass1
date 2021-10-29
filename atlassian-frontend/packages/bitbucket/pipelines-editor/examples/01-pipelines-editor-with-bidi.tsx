import React from 'react';

import { configWithBidi } from '../src/common/yml-mock';
import PipelinesEditor from '../src/components/PipelinesEditor';

// eslint-disable-next-line
import '!!style-loader!css-loader!codemirror/lib/codemirror.css';
// eslint-disable-next-line
import '!!style-loader!css-loader!codemirror/addon/hint/show-hint.css';

export default () => (
  <div style={{ width: '1000px' }} data-testid="pipelines-editor">
    <PipelinesEditor
      code={configWithBidi}
      maxStepDuration={240}
      environments={[['test'], ['staging'], ['production']]}
      variables={['foo']}
      showBidiChars
      onChange={(props) => {
        // eslint-disable-next-line no-console
        console.log('open', props);
      }}
    />
  </div>
);
