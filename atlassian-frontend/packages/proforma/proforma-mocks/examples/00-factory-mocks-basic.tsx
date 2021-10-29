import React from 'react';

import { CodeBlock } from '@atlaskit/code';

import {
  formDesignFactory,
  formSettingsFactory,
  templateFormFactory,
} from '../src/apis/data/factories/FormFactory';
import { mockFormDesignSimple } from '../src/apis/data/factories/mockObjects/mockFormDesignSimple';

export default function LoadFactoryMocksBasicExample() {
  templateFormFactory.resetSequenceNumber();
  formDesignFactory.resetSequenceNumber();
  formSettingsFactory.resetSequenceNumber();

  const mockTemplateForm = templateFormFactory.build();
  const mockTemplateForms = templateFormFactory.buildList(3);
  const mockTemplateFormOverride = templateFormFactory.build({ id: 1000 });
  const mockTemplateFormOverrideNested = templateFormFactory.build({
    design: {
      settings: { name: 'New Name' },
    },
  });

  const mockTemplateFormOverrideWithPrebuiltObjects = templateFormFactory.buildList(
    3,
    {
      design: {
        layout: mockFormDesignSimple.layout,
        questions: mockFormDesignSimple.questions,
      },
    },
  );

  return (
    <>
      <h1>Mock TemplateForm from factory</h1>
      <h2>Code: </h2>
      <CodeBlock
        language="typescript"
        text={'const mockTemplateForm = templateFormFactory.build();'}
      />
      <h2>Result: </h2>
      <CodeBlock
        language="json"
        text={JSON.stringify(mockTemplateForm, null, 2)}
      />

      <h1>Creating multiple mocks</h1>
      <h2>Code: </h2>
      <CodeBlock
        language="typescript"
        text={'const mockTemplateForms = templateFormFactory.buildList(3);'}
      />
      <h2>Result: </h2>
      <CodeBlock
        language="json"
        text={JSON.stringify(mockTemplateForms, null, 2)}
      />

      <h1>Overriding values simple</h1>
      <h2>Code: </h2>
      <CodeBlock
        language="typescript"
        text={
          'const mockTemplateFormOverride = templateFormFactory.build({ id: 1000 });'
        }
      />
      <h2>Result: </h2>
      <CodeBlock
        language="json"
        text={JSON.stringify(mockTemplateFormOverride, null, 2)}
      />

      <h1>Overriding values nested factories</h1>
      <h2>Code: </h2>
      <CodeBlock
        language="typescript"
        text={`const mockTemplateFormOverrideNested = templateFormFactory.build({
          design: {
            settings: { name: "New Name"}
          }
        });`}
      />
      <h2>Result: </h2>
      <CodeBlock
        language="json"
        text={JSON.stringify(mockTemplateFormOverrideNested, null, 2)}
      />

      <h1>Overrides with prebuilt objects</h1>
      <h2>Code: </h2>
      <CodeBlock
        language="typescript"
        text={`
          import mockFormDesign from '../src/apis/data/factories/mockObjects/mock-form-design.json';
          const mockTemplateFormOverrideWithPrebuiltObjects = templateFormFactory.buildList(3, {
            design: {
              layout: (mockFormDesign as FormDesign).layout,
              questions: (mockFormDesign as FormDesign).questions,
            }
          });
        `}
      />
      <h2>Result: </h2>
      <CodeBlock
        language="json"
        text={JSON.stringify(
          mockTemplateFormOverrideWithPrebuiltObjects,
          null,
          2,
        )}
      />
    </>
  );
}
