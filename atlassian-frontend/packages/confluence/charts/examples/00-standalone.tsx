import React from 'react';

import { injectIntl, IntlProvider } from 'react-intl';
import styled from 'styled-components';

import { CodeBlock } from '@atlaskit/code';
import { DefaultExtensionProvider, Parameters } from '@atlaskit/editor-common';
import ExtensionConfigPanel from '@atlaskit/editor-core/example-helpers/config-panel/ConfigPanelWithProviders';

import { ExampleTable } from '../example-helpers/example-table';
import { defaultParameters } from '../src/defaults';
import { buildManifest } from '../src/manifest';
import { Chart } from '../src/ui/charts';
import { ChartParameters } from '../src/ui/charts/types';
import { defaultParseNumber } from '../src/utils';

const ExampleGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InputPane = styled.div`
  flex: 2;
  textarea {
    width: 100%;
    height: 100%;
  }

  padding: 16px;
`;
const ChartPane = styled.div`
  flex: 2;
  padding: 16px;
  box-sizing: border-box;
`;

const ConfigPane = styled.div`
  width: 320px;
  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
`;

type ConfigPanelProps = {
  onChange: (p: Parameters) => void;
  parameters: Parameters;
};

export const ConfigPanel = injectIntl<ConfigPanelProps>(
  ({ intl, parameters, onChange }) => {
    const manifest = buildManifest(intl);

    const extensionProvider = new DefaultExtensionProvider<any>([manifest]);
    return (
      <ExtensionConfigPanel
        extensionType={manifest.type}
        extensionKey={manifest.key}
        nodeKey="default"
        extensionProvider={extensionProvider}
        parameters={parameters}
        onChange={onChange}
      />
    );
  },
);

const BasicWithIntl = injectIntl(({ intl }) => {
  const [tableData, setTableData] = React.useState(ExampleTable);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTableData(JSON.parse(e.target.value));
  };

  const [parameters, setParameters] = React.useState<ChartParameters>(
    defaultParameters(tableData as any, intl, defaultParseNumber),
  );

  return (
    <ExampleGroup>
      <ChartPane>
        <Chart testId="charts" data={tableData} {...parameters} />
      </ChartPane>
      <InputPane>
        <textarea
          onChange={onChange}
          value={JSON.stringify(tableData, null, 2)}
        ></textarea>
      </InputPane>
      <ConfigPane>
        {<ConfigPanel parameters={parameters} onChange={setParameters} />}
        <div>
          <CodeBlock
            language="json"
            text={`Current parameters:

${JSON.stringify(parameters, null, 2)}`}
            showLineNumbers={false}
          />
        </div>
      </ConfigPane>
    </ExampleGroup>
  );
});

export default function Basic() {
  return (
    <IntlProvider locale="en">
      <BasicWithIntl />
    </IntlProvider>
  );
}
