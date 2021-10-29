/** @jsx ForgeUI.createElement */
import ForgeUI, {
  Button,
  Checkbox,
  RadioGroup,
  TextArea,
  render,
  IssuePanelAction,
} from '@forge/ui';
import { ForgeElement } from '@atlassian/forge-ui-types';
import {
  Button as ButtonPv,
  Checkbox as CheckboxPv,
  TextArea as TextAreaPv,
  RadioGroup as RadioGroupPv,
  IssuePanelAction as IssuePanelActionPv,
} from '../rules/propValidators';
import { hasValidProps } from '../rules/helpers';

const getAux = async (element: ForgeElement) => {
  const fn = render(element);
  const response = await fn(
    {
      context: {},
      state: {},
      effects: [{ type: 'initialize' }],
    },
    {},
  );
  return response[0].aux.children[0];
};

it('should fail if Button is missing a required prop', async () => {
  const App = () => (
    // @ts-ignore
    <Button onClick={() => {}} />
  );
  const aux = await getAux(<App />);

  const result = hasValidProps(ButtonPv)(aux, []);
  expect(result.warnings).toEqual(['Missing required prop: text.']);
});

it('should fail if required props on Checkbox are wrongly typed', async () => {
  const App = () => (
    // @ts-ignore
    <Checkbox label={3} value={false} />
  );
  const aux = await getAux(<App />);

  const result = hasValidProps(CheckboxPv)(aux, []);
  expect(result.warnings).toEqual([
    'Expected label to be of type string but instead got: 3.',
    'Expected value to be of type string but instead got: false.',
  ]);
});

it('should fail if optional props on TextArea are wrongly typed', async () => {
  const App = () => (
    <TextArea
      name="name"
      label="label"
      // @ts-ignore
      defaultValue={{ test: 123 }}
      // @ts-ignore
      isMonospaced="not a boolean"
    />
  );
  const aux = await getAux(<App />);

  const result = hasValidProps(TextAreaPv)(aux, []);
  expect(result.warnings).toEqual([
    'Expected defaultValue to be of type string but instead got: {"test":123}.',
    'Expected isMonospaced to be of type boolean but instead got: "not a boolean".',
  ]);
});

it('should fail if RadioGroup has no props ', async () => {
  const App = () => (
    // @ts-ignore
    <RadioGroup />
  );
  const aux = await getAux(<App />);
  const result = hasValidProps(RadioGroupPv)(aux, []);
  expect(result.warnings).toEqual([
    'Missing required prop: label.',
    'Missing required prop: name.',
  ]);
});

it('should fail if IssuePanelAction does not have required props', async () => {
  const App = () => (
    // @ts-ignore
    <IssuePanelAction />
  );
  const aux = await getAux(<App />);
  const result = hasValidProps(IssuePanelActionPv)(aux, []);
  expect(result.warnings).toEqual([
    'Missing required prop: text.',
    'Missing required prop: onClick.',
  ]);
});
