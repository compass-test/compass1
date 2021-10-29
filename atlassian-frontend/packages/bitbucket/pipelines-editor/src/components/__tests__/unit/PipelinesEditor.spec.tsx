import React from 'react';

import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies

import { config1 } from '../../../common/yml-mock';
import ConfigureStepsPanel from '../../ConfigureStepsPanel';
import PipelinesEditor from '../../PipelinesEditor';
import PipelinesEditorSidebar from '../../PipelinesEditorSidebar';

jest.mock('../../StyledCodemirror', () => () => null);
jest.mock('../../ConfigurePipesPanel', () => () => null);
jest.mock('../../ConfigureStepsPanel', () => () => null);

describe('PipelinesEditor component', () => {
  it('should render PipelinesEditorSidebar', () => {
    const component = mount(
      <PipelinesEditor
        code={config1}
        maxStepDuration={120}
        environments={[['test']]}
        variables={['foo']}
      />,
    );
    expect(component.find(PipelinesEditorSidebar).length).toBe(1);
    expect(component.find(ConfigureStepsPanel));
  });
});
